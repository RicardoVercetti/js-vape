import fs, { promises as fsPromises } from "fs";

function getTimestampedFilename(prefix = 'file', ext = 'txt'): string {
  const now = new Date();

  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const time = `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;

  return `${prefix}_${date}_${time}.${ext}`;
}

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

export const saveAsCsv = async (filename: string, content: string) => {
    await fsPromises.writeFile(getTimestampedFilename(filename, "csv"), content);
}

export const formatForCsv = (array: string[][]): string => {
    let fullString = "";

    // first line
    fullString = fullString.concat("Date of posting, Job title, Company name, Last date to apply, details \n");
    for(const line of array) {
        fullString = fullString.concat(line.join(", ") + "\n");
    }

    return fullString;
}