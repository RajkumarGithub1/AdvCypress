import { Given,When,Then, Before, After } from "@badeball/cypress-cucumber-preprocessor"


Before(()=>{
    cy.log("Before Hook....")
})

After(()=>{
    cy.log("After Hook....")
})

Given("User is on Amazon home page",()=>{
    cy.visit("https://www.bing.com")
})
// textarea[name="q"]