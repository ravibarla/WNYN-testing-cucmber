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
    
  Scenario: Validate length of agtv
    Given I have loaded the CSV file
    When I calculate length of AGTV code
    Then Found that every ticket's agtv length is 3

  Scenario: Validate the agtv code characters
    Given I have loaded the CSV file
    When I calculate the agtv code characters
    Then Found that every ticket's agtv consist the character in between range is [A, B, C, J, N, S, Z, k]    

  Scenario: Validate the agtv code AAA with correct prize amount
    Given I have loaded the CSV file
    When I calculate the agtv code AAA with its prize amount 10
    Then I found that agtv code AAA has correct prize amount 10

  Scenario: Validate the agtv code BBB with correct prize amount
    Given I have loaded the CSV file
    When I calculate the agtv code BBB with its prize amount 20
    Then I found that agtv code BBB has correct prize amount 20    


  Scenario: Validate the agtv code CCC with correct prize amount
    Given I have loaded the CSV file
    When I calculate the agtv code CCC with its prize amount 50
    Then I found that agtv code CCC has correct prize amount 50

  Scenario: Validate the agtv code JJJ with correct prize amount
    Given I have loaded the CSV file
    When I calculate the agtv code JJJ with its prize amount 100
    Then I found that agtv code JJJ has correct prize amount 100    
 

  Scenario: Validate the agtv code NNN with correct prize amount
    Given I have loaded the CSV file
    When I calculate the agtv code NNN with its prize amount 500
    Then I found that agtv code NNN has correct prize amount 500

  Scenario: Validate the agtv code SSS with correct prize amount
    Given I have loaded the CSV file
    When I calculate the agtv code SSS with its prize amount 1000
    Then I found that agtv code SSS has correct prize amount 1000   


  Scenario: Validate the agtv code ZZZ with correct prize amount
    Given I have loaded the CSV file
    When I calculate the agtv code ZZZ with its prize amount 400000
    Then I found that agtv code ZZZ has correct prize amount 400000

  Scenario: Validate the agtv code having different character ex-ABC with ZERO prize amount
    Given I have loaded the CSV file
    When I calculate the agtv code having different character with its prize amount 0
    Then I found that agtv code having different character has correct prize amount 0

  Scenario: validate win number uniquenesss
    Given I have loaded the CSV file
    When I gone through all the win number
    Then I Found that all the win numbers are unique

  Scenario: validate your number uniquess
    Given I have loaded the CSV file
    When I gone through all the your number
    Then I found that all the your number is unique
