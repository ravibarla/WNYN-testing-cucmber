Feature: CSV Data Validations

  Scenario: Validate total VIRN count
    Given I have loaded the CSV file
    When I calculate the total count of VIRN column
    Then the total count should be 1000000
    
  Scenario: Validate VIRN length
    Given I have loaded the CSV file
    When I check the length of each VIRN
    Then all VIRNs should have a length of 15

  Scenario: Validate VIRN starting digit
    Given I have loaded the CSV file
    When I check the starting digits of each VIRN
    Then all VIRNs should start with "183"

  Scenario: Validate row count
    Given I have loaded the CSV file
    When I check the total rows
    Then the total rows is 1000000

  Scenario: Validate ticket count
    Given I have loaded the CSV file
    When I check the total tickets
    Then the total tickets is 1000000
