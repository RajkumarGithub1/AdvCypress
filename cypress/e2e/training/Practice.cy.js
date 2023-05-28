require('../../fixtures/file.csv')
describe('CSV Data Reading and Retry - Login Feature', () => {
    // Define the path to the CSV file
    const csvFilePath = 'D:\Cy\AdvCypress\cypress\fixtures\file.csv';
  
    // Retry function for the 'it' block
    const retryIt = (testFn, retriesLeft) => {
      if (retriesLeft === 0) {
        return testFn();
      }
  
      return testFn().catch(() => retryIt(testFn, retriesLeft - 1));
    };
  
    // Define your test using 'it' with { retries: 3 }
    it('should log in with different credentials from CSV data', { retries: 3 }, () => {
      // Read data from the CSV file
      return cy.readFile(csvFilePath, 'utf-8').then((csvContent) => {
        // Split CSV content into rows
        const rows = csvContent.split('\n');
  
        // Iterate through each row and perform login actions
        cy.wrap(rows).each((row) => {
          const data = row.split(',');
  
          // Extract username, password, and expected result from the row
          const username = data[0];
          const password = data[1];
        //   const expectedResult = data[2];
  
          // Perform login actions using the CSV data
          cy.visit('https://api-admin-qa.coyni.com/');
          cy.get("input[name='email']").type(username);
          cy.get("input[name='password']").type(password);
          cy.get("button[type='submit']").click();
  
          // Add assertions to verify successful login or error message
        //   if (expectedResult === 'success') {
        //     cy.get('#welcomeMessage').should('contain', 'Welcome');
        //   } else {
        //     cy.get('.error-message').should('contain', 'Invalid credentials');
        //   }
        });
      });
    });
  });
  