import { saveFile } from "../core/store";

describe("save text file", () => {
    it("save file", () => {
        return saveFile("example content", "sample.txt")
            .then((isSuccessful) => {
                expect(isSuccessful).toBe(true);
            });
    });
})