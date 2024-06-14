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
let isInitialised = false;
Before({ timeout: 60 * 1000 }, async function () {
  if (!isInitialised) {
    try {
      const { csvHeaders: headers, csvData: data } = await readCsvFile(
        filepath
      );
      csvHeaders = headers;
      csvData = data;
      packs = Object.values(organisePackBookTicket(csvData));
      isInitialised = true;
    } catch (error) {
      console.error("Error reading CSV file:", error);
      throw error;
    }
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
  csvData.forEach((row) => this.uniqueTotalTickets.add(row.ticket_no));
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
      pack_id: pack.pack_id,
      books: bookTicket,
    });
  });
});
Then(
  "I found that total tickets in each books in each pack is {int}",
  (totalCount) => {
    this.packBookTickets.forEach((pack) => {
      let packId = pack.pack_id;
      pack.books.forEach((book) => {
        if (book.totalTickets !== totalCount) {
          throw new Error(
            `Total books in pack - ${packId} is not equal to ${totalCount}. Actual total packs: ${book.totalTickets}`
          );
          return;
        }
      });
    });
  }
);
//validation for length tickets
When("I calculate the length of tickets", function () {
  this.correctListOfTicketLength = 0;
  csvData.forEach((data) => {
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
  csvData.forEach((data) => {
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
  csvData.forEach((data) => {
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

//validation length of agtv code
When("I calculate length of AGTV code", function () {
  // this.lengthOfAgtvCOde = 0;
  this.incorrectAgtvLength = csvData.filter((data) => data.agtv.length !== 3);
});

Then("Found that every ticket's agtv length is {int}", function (totalCount) {
  if (this.incorrectAgtvLength.length > 0) {
    throw new Error(
      `Total AGTV code's length not equal to ${totalCount} is: ${this.incorrectAgtvLength.length}`
    );
  }
});

//validation characters of agtv code
When("I calculate the agtv code characters", function () {
  this.validCharacters = /^[ABCJNSZK]+$/;
  this.incorrectCharacterList = csvData.filter(
    (data) => !this.validCharacters.test(data.agtv)
  );
});

Then(
  "Found that every ticket's agtv consist the character in between range is [A, B, C, J, N, S, Z, k]",
  function () {
    if (this.incorrectCharacterList.length > 0) {
      throw new Error(
        `Total AGTV code's length not equal to [A, B, C, J, N, S, Z] } is: ${
          this.incorrectCharacterList.length
        } : ${JSON.stringify(this.incorrectCharacterList)}`
      );
    }
  }
);

//validate the prize amount of AGTV code - AAA
When("I calculate the agtv code AAA with its prize amount {int}", (amt) => {
  this.incorrectAgtvPrizeAmount = csvData.filter(
    (data) => data.agtv == "AAA" && data.amount !== amt
  );
});

Then("I found that agtv code AAA has correct prize amount {int}", (amt) => {
  if (this.incorrectAgtvPrizeAmount.length > 0) {
    throw new Error(
      `Total ticket having agtv code AAA and  prize amount not equal to ${amt} is: ${this.incorrectAgtvPrizeAmount.length} `
    );
  }
});

//validate the prize amount of AGTV code - BBB
When("I calculate the agtv code BBB with its prize amount {int}", (amt) => {
  this.incorrectAgtvPrizeAmount = csvData.filter(
    (data) => data.agtv == "BBB" && data.amount !== amt
  );
});

Then("I found that agtv code BBB has correct prize amount {int}", (amt) => {
  if (this.incorrectAgtvPrizeAmount.length > 0) {
    throw new Error(
      `Total ticket having agtv code BBB and  prize amount not equal to ${amt}} is: ${this.incorrectAgtvPrizeAmount.length} `
    );
  }
});

//validate the prize amount of AGTV code - AAA
When("I calculate the agtv code CCC with its prize amount {int}", (amt) => {
  this.incorrectAgtvPrizeAmount = csvData.filter(
    (data) => data.agtv == "CCC" && data.amount !== amt
  );
});

Then("I found that agtv code CCC has correct prize amount {int}", (amt) => {
  if (this.incorrectAgtvPrizeAmount.length > 0) {
    throw new Error(
      `Total ticket having agtv code CCC and  prize amount not equal to ${amt} is: ${this.incorrectAgtvPrizeAmount.length} `
    );
  }
});

//validate the prize amount of AGTV code - JJJ
When("I calculate the agtv code JJJ with its prize amount {int}", (amt) => {
  this.incorrectAgtvPrizeAmount = csvData.filter(
    (data) => data.agtv == "JJJ" && data.amount !== amt
  );
});

Then("I found that agtv code JJJ has correct prize amount {int}", (amt) => {
  if (this.incorrectAgtvPrizeAmount.length > 0) {
    throw new Error(
      `Total ticket having agtv code JJJ and  prize amount not equal to ${amt} is: ${this.incorrectAgtvPrizeAmount.length} `
    );
  }
});

//validate the prize amount of AGTV code - NNN
When("I calculate the agtv code NNN with its prize amount {int}", (amt) => {
  this.incorrectAgtvPrizeAmount = csvData.filter(
    (data) => data.agtv == "NNN" && data.amount !== amt
  );
});

Then("I found that agtv code NNN has correct prize amount {int}", (amt) => {
  if (this.incorrectAgtvPrizeAmount.length > 0) {
    throw new Error(
      `Total ticket having agtv code NNN and  prize amount not equal to ${amt} is: ${this.incorrectAgtvPrizeAmount.length} `
    );
  }
});

//validate the prize amount of AGTV code - SSS
When("I calculate the agtv code SSS with its prize amount {int}", (amt) => {
  this.incorrectAgtvPrizeAmount = csvData.filter(
    (data) => data.agtv == "SSS" && data.amount !== amt
  );
});

Then("I found that agtv code SSS has correct prize amount {int}", (amt) => {
  if (this.incorrectAgtvPrizeAmount.length > 0) {
    throw new Error(
      `Total ticket having agtv code SSS and  prize amount not equal to ${amt} is: ${this.incorrectAgtvPrizeAmount.length} `
    );
  }
});

//validate the prize amount of AGTV code - ZZZ
When("I calculate the agtv code ZZZ with its prize amount {int}", (amt) => {
  this.incorrectAgtvPrizeAmount = csvData.filter(
    (data) => data.agtv == "ZZZ" && data.amount !== amt
  );
});

Then("I found that agtv code ZZZ has correct prize amount {int}", (amt) => {
  if (this.incorrectAgtvPrizeAmount.length > 0) {
    throw new Error(
      `Total ticket having agtv code ZZZ and  prize amount not equal to ${amt} is: ${this.incorrectAgtvPrizeAmount.length} `
    );
  }
});

//validate the prize amount of AGTV code with different character
When(
  "I calculate the agtv code having different character with its prize amount {int}",
  (amt) => {
    this.validCharacter = (str) => {
      const validSet = new Set(["A", "B", "C", "J", "N", "S", "Z", "K"]);
      return (
        str.length === 3 &&
        new Set(str).size === 3 &&
        [...str].every((char) => validSet.has(char))
      );
    };

    this.incorrectAgtvPrizeAmount = csvData.filter(
      (data) => this.validCharacter(data.agtv) && parseInt(data.amount) !== 0
    );
    // console.log("list :", JSON.stringify(this.incorrectAgtvPrizeAmount));
  }
);

Then(
  "I found that agtv code having different character has correct prize amount {int}",
  (amt) => {
    if (this.incorrectAgtvPrizeAmount.length > 0) {
      throw new Error(
        `Total ticket having agtv code having different character and  prize amount not equal to ${amt} is: ${this.incorrectAgtvPrizeAmount.length} `
      );
    }
  }
);

// //validate unique win number
When("I gone through all the win number", () => {
  this.sameUniqueNumbers = csvData.filter(
    (data) =>
      data.wnumber_1 == data.wnumber_2 ||
      data.wnumber_1 == data.wnumber_3 ||
      data.wnumber_2 == data.wnumber_3
  );
});

Then("I Found that all the win numbers are unique", () => {
  if (this.sameUniqueNumbers.length !== 0) {
    throw new Error(
      `total tickets with same win numbers are ${this.sameUniqueNumbers.length}`
    );
  }
});


// //validate unique your number
When("I gone through all the your number", () => {
  this.sameUniqueNumbers = csvData.filter((data) => {
    const winNumbers = [
      data.ynumber_1,
      data.ynumber_2,
      data.ynumber_3,
      data.ynumber_4,
      data.ynumber_5,
      data.ynumber_6,
      data.ynumber_7,
      data.ynumber_8,
      data.ynumber_9,
      data.ynumber_10,
      data.ynumber_11,
      data.ynumber_12,
      data.ynumber_13,
      data.ynumber_14,
      data.ynumber_15,
    ];
    const uniqueWinNumbers = new Set(winNumbers);
    return uniqueWinNumbers.size !== winNumbers.length;
  });
});

Then("I found that all the your number is unique", () => {
  if (this.sameUniqueNumbers.length !== 0) {
    throw new Error(
      `total tickets with same win numbers are ${this.sameUniqueNumbers.length}`
    );
  }
});
