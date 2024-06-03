const path = require("path");
const { Given, When, Then } = require("@cucumber/cucumber");

const { readCsvAndExtractColumns } = require("../../support/csv.support");
//define path and columns to extract
const filepath = path.join(path.resolve(), "data", "WNYN_DATA.csv");
const columnsToExtract = ["virn", "ticket_no", "ticket_no_str"];

// read csv file and extract the columns
const { data, uniqueVirn, uniqueTicketNo, uniqueTicketNoStr } =
  readCsvAndExtractColumns(filepath, columnsToExtract);
let totalCount = 0;
Given("I have loaded the CSV file", function () {
  // no action required as file is already loaded
});

When("I calculate the total count of VIRN column", function () {
  this.totalCount = uniqueVirn.size;
});

Then("the total count should be 1000000", function () {
  if (this.totalCount !== 1000000) {
    throw new Error(
      `Total count is not equal to 1000000. Actual count: ${uniqueVirn.size}`
    );
  }
});

When("I check the length of each VIRN", function () {
  this.invalidLengthVirns = [];
  data.forEach((row) => {
    if (row.virn.length !== 15) {
      this.invalidLengthVirns.push(row.virn);
    }
  });
});

Then("all VIRNs should have a length of 15", function () {
  if (this.invalidLengthVirns.length > 0) {
    throw new Error(
      `Invalid length VIRNs found: ${this.invalidLengthVirns.join(", ")}`
    );
  }
});

When("I check the starting digits of each VIRN", function () {
  this.invalidStartVirns = [];
  data.forEach((row) => {
    if (!row.virn.startsWith("183")) {
      this.invalidStartVirns.push(row.virn);
    }
  });
});

Then("all VIRNs should start with {string}", function (startDigits) {
  if (this.invalidStartVirns.length > 0) {
    throw new Error(
      `Invalid start VIRNs found: ${this.invalidStartVirns.join(", ")}`
    );
  }
});
