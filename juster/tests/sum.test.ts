import { sum } from "./testTheTest";

describe("sum function", () => {
    it("adds two numbers correctly", () => {
        expect(sum(2, 3)).toBe(5);
    });

    it("handles negatives", () => {
        expect(sum(-1, 1)).toBe(0);
    });
});