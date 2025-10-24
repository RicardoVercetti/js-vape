import fs from "fs";

export const saveFile = (content: string, filename: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, content, (err) => {
            if (err) {
                console.log("error writing to file: " + err);
                return reject(false);
            }
            console.log("file saved successfully!");
            return resolve(true);
        });
    });
}