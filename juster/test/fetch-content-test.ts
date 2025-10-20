import { getContent } from "../core/fetch-content.ts";
import * as cheerio from "cheerio";
import type { AxiosResponse } from "axios";

const resp = getContent("https://infopark.in/companies/job-search");
resp.then((data: AxiosResponse) => {
    console.log(Object.keys(data));
    console.log(data.status);
    // console.log(data.data);

    const $ = cheerio.load(data.data);
    $("div.job-info-sec > table > tbody > tr").each((_, element) => {
        console.log(element);
        // JSON.stringify(element, null, 2);
        console.log(Object.keys(element));

    })
});
