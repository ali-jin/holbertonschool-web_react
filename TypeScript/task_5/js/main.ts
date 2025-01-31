export interface MajorCredits {
    credits: number;
    _brand: "MajorCredits";
}

export interface MinorCredits {
    credits: number;
    _brand: "MinorCredits";
}

export function sumMajorCredits(subject1: MajorCredits, subject2: MinorCredits) {
    return subject1.credits + subject2.credits;
}

export function sumMinorCredits(subject1: MinorCredits, subject2: MajorCredits) {
    return subject1.credits + subject2.credits;
}
