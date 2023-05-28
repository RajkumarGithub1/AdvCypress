/*
    Mocha JUnit Reporter:

    https://github.com/michaelleeallen/mocha-junit-reporter

    Configuration Steps:
    -------------------------------------------
    1. Install ==>  npm install mocha-junit-reporter --save-dev

    2. Add the following to cypress.config.js|ts

            const { defineConfig } = require('cypress');

            module.exports = defineConfig({
                reporter: 'mocha-junit-reporter',
                reporterOptions: {
                    mochafile: 'cypress/reports/junitreport-[hash].xml',
                    toConsole: true
                },
            },
            });

    3. Run cypress command from CLI with following additional option:
            ==> npx cypress run ....... --reporter mocha-junit-reporter

            

*/

