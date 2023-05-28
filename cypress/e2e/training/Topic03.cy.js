
/*
Using cypress environment variables 
    1. Add environment variables to cypress.config.ts in env block
    2. Parameterize environment variables within the test case using Cypress.env method
    
*/


describe('Topic03_TestSuite', () => {


    it('Topic03_TestCase', () => {
        //   cy.visit(Cypress.env("appUrl"))
        cy.visit(Cypress.env(Cypress.env("envurl")))
        //------ Browser Window level validation using Implicit assertion
        cy.title().should("contain", Cypress.env("titlekeyword"))

    })
})



