import * as cheerio from "cheerio";

// get all <tr> from <td>
export const coreParser = (s: string): string[][] => {   // returns the string of jobs
  console.log("entered the core parser...");

  let row: string[][] = [];
  const firstPage = cheerio.load(s);
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
