import * as cheerio from "cheerio";

// get all <tr> from <td>
export const coreParser = (pageContentAsString: string): string[][] => {   // returns array of array of jobs
  console.log("entered the core parser...");

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
export const loopFetch = (siteUrl: string): string[][] => {     // use core parser repeatedly for each page
    // first fetch the firstpage out side the loop and then, go into the loop
    return [];      // TODO: implement the loop fetch
}
