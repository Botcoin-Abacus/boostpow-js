import { BoostSignalModel } from './boost-signal-model';

export class BoostSignalSummary{
    private totalDifficulty_ = 0;
    private lastSignalTime_;
    private recentSignalTime_;

    constructor(private boostSignals: BoostSignalModel[]) {
        if (!boostSignals.length) {
            throw new Error('invalid arg');
        }
        for (const signal of boostSignals) {
            this.totalDifficulty_ += signal.difficulty();
        }
        for (const sig of this.boostSignals) {
            if (!this.lastSignalTime_ || this.lastSignalTime_ >= sig.time()) {
                this.lastSignalTime_ = sig.time();
            }
            if (!this.recentSignalTime_ || this.recentSignalTime_ <= sig.time()) {
                this.recentSignalTime_ = sig.time();
            }
        }
    };
    get lastSignalTime(): number {
        return this.lastSignalTime_;
    }
    get recentSignalTime(): number {
        return this.recentSignalTime_;
    }

    get totalDifficulty() {
        return this.totalDifficulty_;
    }
    get totalEnergy() {
        return this.totalDifficulty_;
    }
    get entity(): BoostSignalModel {
        return this.boostSignals[0];
    }
    get signals(): BoostSignalModel[] {
        return this.boostSignals;
    }
    toString() {
        return this.toObject();
    }
    toObject() {
        const i: any = [];
        for (const item of this.boostSignals) {
            i.push(item.toObject());
        }
        return {
            totalDifficulty: this.totalDifficulty,
            totalEnergy: this.totalEnergy,
            entity: this.boostSignals[0].toObject(),
            signals: i
        }
    }
}