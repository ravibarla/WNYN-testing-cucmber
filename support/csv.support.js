const fs = require("fs");
const path = require("path");

//define function to extract row data
const readCsvAndExtractColumns = (filePath, columns) => {
  const fileContent = fs.readFileSync(filePath, "utf-8").trim();
  const result = [];
  const uniqueVirn = new Set();
  const uniqueTicketNo = new Set();
  const uniqueTicketNoStr = new Set();
  const lines = fileContent.split("\n");
  const headers = lines[0].split("\t");
  let count = 0;
  for (let i = 1; i < lines.length; i++) {
    count++;
    // if (count > 2) {
    //   break;
    // }
    const values = lines[i].split("\t");
    const rowData = {};
    columns.forEach((column) => {
      const index = headers.indexOf(column);
      if (index !== -1) {
        rowData[column] = values[index];
        if (column === "virn") {
          uniqueVirn.add(values[index]);
        } else if (column === "ticket_no") {
          uniqueTicketNo.add(values[index]);
        } else if (column === "ticket_no_str") {
          uniqueTicketNoStr.add(values[index]);
        }
      }
    });
    if (Object.keys(rowData).length === columns.length) {
      result.push(rowData);
    }
  }
  return { data: result, uniqueVirn, uniqueTicketNo, uniqueTicketNoStr };
};

module.exports = { readCsvAndExtractColumns };
//define path and columns to extract
// const filepath = path.join(path.resolve(), "data", "WNYN_DATA.csv");
// const columnsToExtract = ["virn", "ticket_no", "ticket_no_str"];

// // read csv file and extract the columns
// const { data, uniqueVirn, uniqueTicketNo, uniqueTicketNoStr } =
//   readCsvAndExtractColumns(filepath, columnsToExtract);
// console.log(uniqueVirn.length);
