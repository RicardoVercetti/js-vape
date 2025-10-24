import { saveFile } from "../core/store.js";

const filename = "sample.txt";
const content = "here is a sample content";

const savePromise = saveFile(content, filename);
const val = await savePromise;

if(val) {
    console.log("file saved successfully");
} else {
    console.log("failed to save the file!");
}
