import * as bsv from 'bsv';
import { BoostPowJobModel } from './boost-pow-job-model';
import { BoostPowMetadataModel } from './boost-pow-metadata-model';

export class BoostPowStringModel {
    private _blockheader;
    private _metadata;
    constructor(blockheader: bsv.BlockHeader, metadata?: BoostPowMetadataModel) {
        this._blockheader = blockheader;
        if (!this._blockheader.validProofOfWork()) {
            throw new Error('INVALID_POW');
        }

        if (metadata) {
            if (this._blockheader.merkleRoot !== metadata.hash()) {
                throw new Error('INVALID_METADATA');
            }
            this._metadata = metadata;
        }
    }

    hash(): string {
        // it needs to be reversed because bsv lib has it backwards. 
        return Buffer.from(this._blockheader.hash, "hex").reverse().toString("hex");
    }

    // Use boosthash(), hash() and id() to all be equal to the string
    // remember, the string itself is the data and proof of work identity.
    boosthash(): string {
        return this.hash();
    }

    id(): string {
        return this.hash();
    }

    contentHex(): string {
        return this.toObject().content;
    }

    contentBuffer(): string {
        return this.toObject().content;
    }

    public trimBufferString(str: string, trimLeadingNulls = true): string {
        const content = Buffer.from(str, 'hex').toString('utf8');
        if (trimLeadingNulls) {
            return content.replace(/\0/g, '');
        } else {
            return content;
        }
    }

    contentString(trimLeadingNulls = true): string {
        return this.trimBufferString(this.toObject().content, trimLeadingNulls);
    }

    bits(): number {
        return this.toObject().bits;
    }

    metadataHash(): Buffer {
        return this._blockheader.merkleRoot;
    }

    nonce(): number {
        return this.toObject().nonce;
    }

    time(): number {
        return this.toObject().time;
    }

    category(): number {
        return this.toObject().category;
    }

    static nBitsHexToDifficultyNumber(nbits: string): number {
        return BoostPowJobModel.getTargetDifficulty(parseInt(nbits, 16));
    }

    getTargetAsNumberBuffer(): any {
        const i = BoostPowJobModel.difficulty2bits(this.difficulty);
        return Buffer.from(i.toString(16), 'hex').reverse();
    }

    static difficultyNumberToNBitsHex(diff: number): string {
        const bitsInt32 = BoostPowJobModel.difficulty2bits(diff);
        return bitsInt32.toString(16);
    }

    static validProofOfWorkFromBuffer(buf): boolean {
        const blockheader = bsv.BlockHeader.fromBuffer(buf);

        if (blockheader.validProofOfWork()) {
            return true;
        }
        return false;
    }

    static validProofOfWorkFromString(str): boolean {
        const blockheader = bsv.BlockHeader.fromString(str);

        if (blockheader.validProofOfWork()) {
            return true;
        }
        return false;
    }

    static validProofOfWorkFromObject(obj): boolean {
        const spoofedObj = {
            prevHash: obj.content,
            bits: obj.bits,
            version: obj.category,
            merkleRoot: obj.metadataHash,
            time: obj.time,
            nonce: obj.nonce,
        }
        const blockheader = bsv.BlockHeader.fromObject(spoofedObj);

        if (blockheader.validProofOfWork()) {
            return true;
        }
        return false;
    }
    /**
     * Check whether each element is a valid BoostPowString (POW!)
     *
     * If even a single entry is not valid, then an exception will be thrown and parsing of everything fails.
     *
     * Initially we can be strict because we should expect careful usage and passing of data.
     *
     * @param arrayOfPotentialBoostPowStrings Array of objects that have toString() defined
     */
    static fromStringArray(arrayOfPotentialBoostPowStrings: any[]): Array<BoostPowStringModel> {
        // How cool is that!?
        const boostPowStrings: BoostPowStringModel[] = [];
        for (const candidate of arrayOfPotentialBoostPowStrings) {
            boostPowStrings.push(BoostPowStringModel.fromString(candidate));
        }
        return boostPowStrings;
    }

    static fromBuffer (buf) {
        return new BoostPowStringModel(bsv.BlockHeader.fromBuffer(buf));
    }

    static fromString(str) {
        var buf = Buffer.from(str, 'hex')
        return new BoostPowStringModel(bsv.BlockHeader.fromBuffer(buf));
    }

    static fromHex(str) {
        var buf = Buffer.from(str, 'hex')
        return new BoostPowStringModel(bsv.BlockHeader.fromBuffer(buf));
    }

    static fromObject(obj) {
        const spoofedObj = {
            prevHash: obj.content,
            bits: obj.bits,
            version: obj.category,
            merkleRoot: obj.metadataHash,
            time: obj.time,
            nonce: obj.nonce,
        }
        return new BoostPowStringModel(bsv.BlockHeader.fromObject(spoofedObj));
    }

    static from(str) {
        var buf = Buffer.from(str, 'hex')
        return new BoostPowStringModel(bsv.BlockHeader.fromBuffer(buf));
    }

    toBuffer () {
        return this._blockheader.toBufferWriter().concat()
    }

    toString () {
        return this._blockheader.toBuffer().toString('hex');
    }

    toHex () {
        return this._blockheader.toBuffer().toString('hex');
    }

    toObject () {
        const blockheaderObj = this._blockheader.toObject();
        const boostheaderObj = {
            hash: this.hash(),
            content: blockheaderObj.prevHash,
            bits: blockheaderObj.bits,
            difficulty: this.difficulty(),
            category: blockheaderObj.version,
            metadataHash: this.metadataHash().toString("hex"),
            time: blockheaderObj.time,
            nonce: blockheaderObj.nonce,
        };
        return boostheaderObj;
    }

    difficulty() : number {
        return this._blockheader.getDifficulty();
    }
    targetDifficulty(bits?: number) {
        return this._blockheader.getTargetDifficulty(bits);
    }
}