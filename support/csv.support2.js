const fs = require("fs");
const csv = require("csv-parser");
// const path = require("path");

// const filepath = path.join(path.resolve(), "data", "WNYN_DATA.csv");

//function to read csv file
const readCsvFile = async (filepath) => {
  // Data structures to store CSV data and headers
  const csvData = [];
  const csvHeaders = new Set();
  let count = 0;
  return new Promise((resolve, reect) => {
    // Read CSV file and process data
    fs.createReadStream(filepath)
      .pipe(csv({ separator: "\t" }))
      .on("headers", (headers) => {
        // Merge columns agtv_1 to agtv_5 into one header 'agtv'
        headers.forEach((header) => {
          let data = header.startsWith("agtv_") ? "agtv" : header;
          csvHeaders.add(data);
        });
        // csvHeaders.add(modifiedHeaders);
      })
      .on("data", (row) => {
        // Merge columns agtv_1 to agtv_5 into one key 'agtv'
        const agtv = [];
        for (let i = 1; i <= 20; i++) {
          if (row[`agtv_${i}`]) {
            agtv.push(row[`agtv_${i}`]);
            delete row[`agtv_${i}`]; // Remove individual agtv columns
          }
        }
        row.agtv = agtv.join(""); // Merge into one string

        // Remove whitespaces from row values
        Object.keys(row).forEach((key) => {
          if (typeof row[key] === "string") {
            row[key] = row[key].replace(/\s/g, "");
          }
        });

        // Store row in data structure
        if (count < 2) {
        csvData.push(row);
        }
        count++;
      })
      .on("end", () => {
        // console.log(csvHeaders);
        console.log(csvData);
        // Further processing or use of csvHeaders and csvData
        resolve({ csvHeaders: Object.values(csvHeaders), csvData });
        // return { csvHeaders, csvData }
        // resolve()
      });
  });
  // console.log("csvHeaders:", csvHeaders);
  // return { csvHeaders, csvData };
};

const organisePackBookTicket = (csvData) => {
  let packs = {};
  csvData.forEach((data) => {
    let pack_code = parseInt(data.ticket_no_str.substring(3, 7));
    let book_code = parseInt(data.ticket_no_str.substring(7, 9));
    let ticket_code = parseInt(data.ticket_no_str.substring(9, 13));

    //create a pack if not created
    if (!packs[pack_code]) {
      packs[pack_code] = {
        pack_id: pack_code,
        books: {},
      };
    }
    //initialize the book within the pack if it doesn't exist
    if (!packs[pack_code].books[book_code]) {
      packs[pack_code].books[book_code] = {
        book_id: book_code,
        tickets: [],
      };
    }
    //add the ticket to the books ticket array
    packs[pack_code].books[book_code].tickets.push(ticket_code);
  });
  // console.log(JSON.stringify(packs));
  // return packs;
  // Transform the packs object to match the desired output format
  let result = Object.values(packs).map((pack) => {
    return {
      pack_id: pack.pack_id,
      books: Object.values(pack.books).map((book) => {
        return {
          book_id: book.book_id,
          tickets: book.tickets,
        };
      }),
    };
  });
  // console.log("result :", JSON.stringify(result));
  return result;
};
module.exports = { readCsvFile, organisePackBookTicket };
