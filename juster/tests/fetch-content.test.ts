import { getContent, postContent } from "../core/fetch-content";

describe("Get function", () => {
    it("fetches content from web", () => {
        return getContent("https://www.google.com/").then((data) => {
            expect(data.status).toBe(200);
        }).catch((err) => {
            console.log(err);
            return;
        });
    });
});

describe("Post function", () => {
    it("sends post request", () => {
        const body = JSON.stringify({
            title: "Hello World",
            body: "This is a test post",
            userId: 123,
        })
        return postContent("https://jsonplaceholder.typicode.com/posts", body).then((data) => {
            expect(data.status).toBe(201);
        }).catch((err) => {
            console.log(err);
            return;
        });
    });
})