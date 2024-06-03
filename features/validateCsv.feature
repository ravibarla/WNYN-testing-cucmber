Feature: CSV Data Validations

  Scenario: Validate total sum
    Given I have loaded the CSV file
    When I calculate the total count of VIRN column
    Then the total count should be 1000000
    
  Scenario: Validate VIRN length
    Given I have loaded the CSV file
    When I check the length of each VIRN
    Then all VIRNs should have a length of 15
