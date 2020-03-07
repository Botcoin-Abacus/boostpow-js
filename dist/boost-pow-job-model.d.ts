/// <reference types="node" />
import { BoostPowStringModel } from './boost-pow-string-model';
import { BoostPowJobProofModel } from './boost-pow-job-proof-model';
import { BoostPowMetadataModel } from './boost-pow-metadata-model';
export declare class BoostPowJobModel {
    private content;
    private diff;
    private category;
    private tag;
    private metadata;
    private unique;
    static operations: any[];
    private constructor();
    getContent(): Buffer;
    getDiff(): number;
    getCategory(): Buffer;
    getTag(): Buffer;
    getMetadata(): Buffer;
    getUnique(): Buffer;
    static fromObject(params: {
        content: string;
        diff: number;
        category: string;
        tag: string;
        metadata: string;
        unique: string;
    }): BoostPowJobModel;
    static createBufferAndPad(buf: any, length: number): any;
    toObject(): {
        content: string;
        diff: number;
        category: string;
        tag: string;
        metadata: string;
        unique: string;
    };
    static difficulty2bits(difficulty: any): number;
    getTargetAsNumberBuffer(): any;
    toHex(): string;
    /**
     * Returns the target difficulty for this block
     * @param {Number} bits
     * @returns {BN} An instance of BN with the decoded difficulty bits
     */
    static getTargetDifficulty(bits: any): any;
    /**
     * @link https://en.bitcoin.it/wiki/Difficulty
     * @return {Number}
     */
    static getDifficulty(bits: any): number;
    static remainingOperationsMatchExactly(remainingChunks: any): boolean;
    static fromHex(asm: string): BoostPowJobModel;
    toASM(): string;
    static fromASM(str: string): BoostPowJobModel;
    toString(): string;
    static fromString(str: string): BoostPowJobModel;
    static createPowAbstract(boostPowJob: BoostPowJobModel, boostPowJobProof: BoostPowJobProofModel): BoostPowMetadataModel;
    static tryValidateJobProof(boostPowJob: BoostPowJobModel, boostPowJobProof: BoostPowJobProofModel, debug?: true): BoostPowStringModel | null;
}
