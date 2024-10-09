function bellCurveGapNumbersWithIndexes(indexes: number[], min: number, max: number): number[] {
    const result: number[] = new Array(indexes.length); // Preallocate the result array
    const count = indexes.length;
    const halfCount = Math.floor(count / 2);

    // Step 1: Create an array of positions with bell curve gaps
    const gaps: number[] = [];
    for (let i = 0; i < count; i++) {
        const t = (i - halfCount) / halfCount; // Normalize index to range [-1, 1]
        const gapFactor = Math.exp(-0.5 * t * t); // Gaussian function for bell-shaped gaps
        gaps.push(gapFactor);
    }

    // Step 2: Normalize gaps to sum to 1
    const gapSum = gaps.reduce((sum, gap) => sum + gap, 0);
    const normalizedGaps = gaps.map(gap => gap / gapSum); // Normalize gaps so the sum is 1

    // Step 3: Create the final result with increasing values based on normalized gaps
    let currentValue = max;  // Start with max
    result[indexes[count - 1]] = currentValue; // Largest value (max) goes to the last index in the array

    for (let i = count - 2; i >= 0; i--) {
        currentValue -= (max - min) * normalizedGaps[i];
        result[indexes[i]] = currentValue; // Place each value based on the index array
    }

    return result;
}

// background weights
const backgrounds: number[] = bellCurveGapNumbersWithIndexes([6, 9, 7, 5, 3, 2, 8, 10, 4, 1, 0], 0.3, 0.01);
// foreground weights
const foregrounds: number[] = bellCurveGapNumbersWithIndexes([0, 1, 2], 0.3, 0.01);
// stand weights
const stands: number[] = bellCurveGapNumbersWithIndexes([6, 8, 7, 9, 0, 4, 1, 3, 2, 5], 0.3, 0.01);
// body weights
const bodies: number[] = bellCurveGapNumbersWithIndexes([0, 9, 5, 1, 2, 8, 6, 4, 7, 3], 0.3, 0.01);
// clouth weights
const clouths: number[] = bellCurveGapNumbersWithIndexes([1, 6, 0, 4, 5, 8, 3, 2, 9, 7], 0.3, 0.01);
// eyes color weights
const eyesColors: number[] = bellCurveGapNumbersWithIndexes([3, 0, 4, 2, 1, 5], 0.3, 0.01);
// mouth weights
const mouths: number[] = bellCurveGapNumbersWithIndexes([3, 4, 10, 9, 8, 0, 2, 5, 6, 1, 7], 0.3, 0.01);
// hair weights
const hairs: number[] = bellCurveGapNumbersWithIndexes([8, 3, 2, 5, 6, 1, 10, 7, 4, 0, 9], 0.3, 0.01);

export {
    backgrounds,
    foregrounds,
    stands,
    bodies,
    clouths,
    eyesColors,
    mouths,
    hairs
};
