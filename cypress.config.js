const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    env: {
      baseUrl: "http://localhost:3000", // Replace with your base URL if you want to access it as an env variable
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
