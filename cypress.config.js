const { defineConfig } = require("cypress");
const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");
const { sqlQueryPlugin } = require('cypress-multiple-db-sql-server');
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

/// <reference types='Cypress' />
module.exports = defineConfig({

  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  taskTimeout: 80000,
  pageLoadTimeout: 150000,
  reporter: 'cypress-mochawesome-reporter',
  reportDir: 'test-report',
  overwrite: false,
  saveJson: false,
  saveHtml: true,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  reportFilename: 'cypressreport',
  timestamp: 'yyyy_mm_dd_hh_MM',

  // reporterEnabled: "mochawesome, mocha-junit-reporter",
  // reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
  // reporterOptions: {
  //   mochawesomeReporterOptions: {
  //     charts: true,
  //     reportPageTitle: 'custom-title',
  //     reportDir: 'cypress/reports',
  //     overwrite: false,
  //     saveJson: true,
  //     saveHtml: true,
  //     embeddedScreenshots: true,
  //     inlineAssets: true,
  //     saveAllAttempts: false,
  //   },

  //   mochaJunitReporterReporterOptions: {
  //     mochafile: 'cypress/reports/junitreport-[hash].xml',
  //     toConsole: true
  //   },
  // },

  // reporter: 'cypress-multi-reporters',
  // reporterEnabled: "cypress-mochawesome-reporter, mocha-junit-reporter",
  // reporterOptions: {
  //   mochawesomeReporterOptions: {
  //     reportDir: "cypress/reports",
  //     overwrite: false,
  //     saveJson: true,
  //     saveHtml: true,

  //     reportFilename: "cypressreport",
  //     timestamp: "yyyy_mm_dd_hh_MM",
  //     charts: true,
  //     reportPageTitle: "custom-title",
  //     embeddedScreenshots: true,
  //     inlineAssets: true,
  //     saveAllAttempts: false,
  //   },

  //   mochaJunitReporterOptions: {
  //     mochafile: "cypress/reports/junitreport-[hash].xml",
  //     toConsole: true,
  //   },
  // },

  // reporter: 'mocha-junit-reporter',
  // reporterOptions: {
  //   mochafile: 'cypress/reports/junitreport-[hash].xml',
  //   toConsole: true
  // },

  env: {
    envurl: 'env1',
    appUrl: 'https://www.amazon.in',
    env1: 'https://www.flipkart.com',
    titlekeyword: "Online",
    db: {
      authentication: {
        type: 'default',
        options: {
          userName: 'sa',
          password: 'sqladmin@123'
        }
      },
      server: '172.16.0.56',
      options: {
        database: '',
        encrypt: true,
        rowCollectionOnRequestCompletion: true,
        trustServerCertificate: true,
        port: 1433, // Default Port
      }
    }
  },

  e2e: {
    specPattern: ["cypress/e2e/features/*.feature", "cypress/e2e/training/*.cy.js"],
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    env: {
      allureReuseAfterSpec: true,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', { downloadFile }) //on task
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse(),
      });
      on('task', { ...sqlQueryPlugin }); //on task : Here we have two tasks, that should run accaordingly
      preprocessor.addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );


      allureWriter(on, config);

      return config;
    },
  },
});
