import { getContent } from "../core/fetch-content.ts";

getContent("https://infopark.in/companies/job-search").then((data) => {
    console.log(data.status);
}).catch((e) => {
   if (e instanceof AggregateError) {
        for (const err of e.errors) {
            console.error("Inner error:", err);
        }
    } else {
        console.error("Error:", e);
    }
});
