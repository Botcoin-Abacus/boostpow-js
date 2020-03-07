 export class BoostUtils {

    static difficulty2bits(difficulty) {
        if (difficulty < 0) throw 'difficulty cannot be negative';
        if (!isFinite(difficulty)) {
            throw 'difficulty cannot be infinite';
        }
        for (var shiftBytes = 1; true; shiftBytes++) {
            var word = (0x00ffff * Math.pow(0x100, shiftBytes)) / difficulty;
            if (word >= 0xffff) break;
        }
        word &= 0xffffff; // convert to int < 0xffffff
        var size = 0x1d - shiftBytes;
        // the 0x00800000 bit denotes the sign, so if it is already set, divide the
        // mantissa by 0x100 and increase the size by a byte
        if (word & 0x800000) {
            word >>= 8;
            size++;
        }
        if ((word & ~0x007fffff) != 0) throw 'the \'bits\' \'word\' is out of bounds';
        if (size > 0xff) throw 'the \'bits\' \'size\' is out of bounds';
        var bits = (size << 24) | word;
        return bits;
    }

    static getTargetAsNumberBuffer(diff: any): any {
        const i = BoostUtils.difficulty2bits(diff);
        return Buffer.from(i.toString(16), 'hex').reverse();
    }

    static createBufferAndPad(buf: any, length: number): any {
        if (!buf) {
            const emptyBuffer = new Buffer(length);
            emptyBuffer.fill(0);
            return emptyBuffer;
        }
        let paddedBuf;
        if ((typeof buf).toString() === 'buffer') {
            paddedBuf = buf;
        } else {
            var re = /^[0-9A-Fa-f]+$/g;
            if (!re.test(buf)) {
                paddedBuf = Buffer.from(buf)
            } else {
                paddedBuf = Buffer.from(buf, 'hex');
            }
        }
        if (paddedBuf.byteLength < length) {
            const emptyBuffer = new Buffer(length - paddedBuf.byteLength);
            emptyBuffer.fill(0);
            return Buffer.concat([emptyBuffer, paddedBuf]).reverse();
        } else {
            return paddedBuf.reverse();
        }
    }
}