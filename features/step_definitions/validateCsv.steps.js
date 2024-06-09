const path = require("path");
const { Given, When, Then, Before } = require("@cucumber/cucumber");

// const { readCsvFile } = require("../../support/csv.support2");

const {
  readCsvFile,
  organisePackBookTicket,
} = require("../../support/csv.support2");
// const organisePackBookTicket = require("../../support/csv.support");
//define path and columns to extract
const filepath = path.join(path.resolve(), "data", "WNYN_DATA.csv");
let csvHeaders = [];
let csvData = [];
let packs = [];
Before({ timeout: 60 * 1000 }, async function () {
  try {
    const { csvHeaders: headers, csvData: data } = await readCsvFile(filepath);
    csvHeaders = headers;
    csvData = data;
    packs = Object.values(organisePackBookTicket(csvData));
  } catch (error) {
    console.error("Error reading CSV file:", error);
    throw error;
  }
});

Given("I have loaded the CSV file", function () {
  // no action required as file is already loaded in Before hook
});

//validation for total entries
When("I calculate the total entries", function () {
  this.totalEntry = csvData.length;
});

Then("the total entries is {int}", function (totalCount) {
  if (this.totalEntry !== totalCount) {
    throw new Error(
      `Total entries is not equal to ${totalCount}. Actual total entries: ${this.totalEntry}`
    );
  }
});

//validation for total unique tickets
When("I calculate the unique tickets", function () {
  this.uniqueTotalTickets = new Set();
  csvData.map((row) => this.uniqueTotalTickets.add(row.ticket_no));
});

Then("the total unique tickets is {int}", function (totalCount) {
  if (this.uniqueTotalTickets.size !== totalCount) {
    throw new Error(
      `Total entries is not equal to ${totalCount}. Actual total entries: ${this.uniqueTotalTickets.size}`
    );
  }
});

//validate total packs
When("I calculate the total packs", () => {
  this.totalPacks = packs.length;
});
Then("I found that total packs is {int}", (totalCount) => {
  if (this.totalPacks !== totalCount) {
    throw new Error(
      `Total packs is not equal to ${totalCount}. Actual total packs: ${this.totalPacks}`
    );
  }
});

//validate total books in each packs
When("I calculate the total books in each pack", () => {
  this.packBookCount = [];
  packs.forEach((pack) => {
    this.packBookCount.push({
      pack_id: pack.pack_id,
      totalBooks: Object.values(pack.books).length,
    });
  });
});
Then("I found that total books in each pack is {int}", (totalCount) => {
  this.packBookCount.forEach((pack) => {
    if (pack.totalBooks !== totalCount) {
      let pack_id = pack.pack_id;
      let incorrectTotalBooks = pack.totalBooks;
      throw new Error(
        `Total books in pack - ${pack_id} is not equal to ${totalCount}. Actual total packs: ${this.incorrectTotalBooks}`
      );
      return;
    }
  });
});

//validate total tickets in each book in each pack

When("I calculate the total tickets in each books in each pack", () => {
  this.packBookTickets = [];
  
  packs.forEach((pack) => {
    let bookList = Object.values(pack.books);
    let bookTicket = bookList.map((book) => {
      return {
        book_id: book.book_id,
        totalTickets: book.tickets.length,
      };
    });
    this.packBookTickets.push({
      pack_id:pack.pack_id,
      books: bookTicket
    })
     
  });
});
Then(
  "I found that total tickets in each books in each pack is {int}",
  (totalCount) => {
    this.packBookTickets.forEach((pack) => {
      let packId=pack.pack_id
      pack.books.forEach(book=>{
        if(book.totalTickets!==totalCount){
          throw new Error(
            `Total books in pack - ${packId} is not equal to ${totalCount}. Actual total packs: ${book.totalTickets}`
          );
          return;
        }
      })
        
      })
    })
//validation for length tickets
When("I calculate the length of tickets", function () {
  this.correctListOfTicketLength = 0;
  csvData.map((data) => {
    if (data.ticket_no_str.length !== 12) {
      this.correctListOfTicketLength++;
    }
  });
});

Then("the length of tickets is {int}", function (totalCount) {
  if (this.correctListOfTicketLength > 0) {
    throw new Error(
      `Total tickets with length not equal to ${totalCount}. Actual total entries: ${this.correctListOfTicketLength}`
    );
  }
});

//validation for total unique virn
When("I calculate the total unique VIRN", function () {
  this.totalUniqueVirn = csvData.length;
});

Then("the total unique VIRN is {int}", function (totalCount) {
  if (this.totalUniqueVirn !== totalCount) {
    throw new Error(
      `Total unique VIRN is not equal to ${totalCount}. Actual total entries: ${this.totalUniqueVirn}`
    );
  }
});

//validation for length of virn
When("I calculate the length of VIRN", function () {
  this.listOfIncorrectVirnLength = 0;
  csvData.map((data) => {
    if (data.virn.length !== 15) {
      this.listOfIncorrectVirnLength++;
    }
  });
});

Then("the length of VIRN is {int}", function (totalCount) {
  if (this.listOfIncorrectVirnLength > 0) {
    throw new Error(
      `Total VIRNs with length not equal to ${totalCount} is: ${this.listOfIncorrectVirnLength}`
    );
  }
});

//validation for starting 3digit of virn
When("I calculate the starting 3digit of VIRN", function () {
  this.listOfIncorrectVirnStartingDigit = 0;
  csvData.map((data) => {
    if (data.virn.substring(0, 3) !== "183") {
      this.listOfIncorrectVirnStartingDigit++;
    }
  });
});

Then("starting 3digit of VIRN is {int}", function (totalCount) {
  if (this.listOfIncorrectVirnStartingDigit > 0) {
    throw new Error(
      `Total VIRNs with starting 3digit not equal to ${totalCount} is: ${this.listOfIncorrectVirnStartingDigit}`
    );
  }
});
