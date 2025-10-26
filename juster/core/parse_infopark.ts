import * as cheerio from "cheerio";
import { getContent } from "./fetch-content.js";

// get all <tr> from <td>
export const coreParser = (pageContentAsString: string): string[][] => {   // returns array of array of jobs

  let row: string[][] = [];
  const firstPage = cheerio.load(pageContentAsString);
  firstPage("tbody").find("tr").each((_, tr) => {
      let rowData: string[] = [];
      firstPage(tr).find("td").each((i, td) => {
          if(i === 4) {
              rowData.push(firstPage(td).find("a").attr("href")?? "N/A");
          } else {
              rowData.push(firstPage(td).text().trim());
          }
          
      })
      row.push(rowData);
  });

  return row;
};

// loop fetch from infopark site
export const loopFetch = async (siteUrl: string): Promise<string[][]> => {
    // first fetch the firstpage out side the loop and then, go into the loop
    let returnList: string[][] = [];
    const mainData = await getContent(siteUrl);
    returnList = coreParser(mainData.data);
    const lastPage = findLastPage(mainData.data);

    console.log("no of pages: ", lastPage);

    let urls = [];
    for(let i=2; i<=lastPage; i++) {
        urls.push(`${siteUrl}?page=${i}`);
    }

    await Promise.all(urls.map((u) => {
        return getContent(u).then((innerData) => {
            const parsed = coreParser(innerData.data);
            returnList = returnList.concat(parsed);
        })
        .catch((err) => {
            console.log("error while fetching: ", u, " err: ", err);
        })
        .finally(() => {
            console.log("completed fetching: ", u);
        });
    }))


    return returnList;
}

// find the last page in the lineup
export function findLastPage(pageContentAsString: string): number {
    const loaded = cheerio.load(pageContentAsString);
    const val = loaded("div > nav > ul").find("li");           // perhaps find the max number in this line up, that would be the lineup
    let newLineup: number[] = [];
    val.each((_, el) => {
        if(!isNaN(Number(loaded(el).text()))) {
            newLineup.push(Number(loaded(el).text()));
        }
    });

    return Math.max(...newLineup);
}