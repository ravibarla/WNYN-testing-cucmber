Feature: WNYN CSV FILE Validations


  Scenario: Validate total Entry
    Given I have loaded the CSV file
    When I calculate the total entries
    Then the total entries is 1000000

  Scenario: Validate total unique tickets
    Given I have loaded the CSV file
    When I calculate the unique tickets
    Then the total unique tickets is 1000000

  Scenario: Validate length of tickets
    Given I have loaded the CSV file
    When I calculate the length of tickets
    Then the length of tickets is 12

  Scenario: Validate the number of packs
    Given I have loaded the CSV file
    When I calculate the total packs
    Then I found that total packs is 400


  Scenario: Validate the number of books
    Given I have loaded the CSV file
    When I calculate the total books in each pack
    Then I found that total books in each pack is 25


  Scenario: Validate the total tickets in each books
    Given I have loaded the CSV file
    When I calculate the total tickets in each books in each pack
    Then I found that total tickets in each books in each pack is 100

  Scenario: Validate total unique VIRN
    Given I have loaded the CSV file
    When I calculate the total unique VIRN
    Then the total unique VIRN is 1000000 
    
  Scenario: Validate length of VIRN
    Given I have loaded the CSV file
    When I calculate the length of VIRN
    Then the length of VIRN is 15

  Scenario: Validate starting 3digit of VIRN
    Given I have loaded the CSV file
    When I calculate the starting 3digit of VIRN
    Then starting 3digit of VIRN is 183
    

