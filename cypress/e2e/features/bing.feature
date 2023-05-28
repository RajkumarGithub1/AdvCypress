# Amazon search functionality feature file

Feature: bing cypress Suite
    This feature file will validate the search functionality of bing homepage

    Background: setupblock
        Given User is on Bing home page


    @smoke
    Scenario: Search Validation
        It will validate the search functionality

        When User types "cypress" in bing search bar
        And User press enter button
        Then Search result for cypress should be displayed
