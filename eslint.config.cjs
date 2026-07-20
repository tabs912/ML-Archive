import js from "@eslint/js";
import globals from "globals";
import googleappsscript from "eslint-plugin-googleappsscript";

export default [
  // 1. Load the recommended baseline rules from ESLint
  js.configs.recommended,

  {
    // 2. Define the environment and globals
    languageOptions: {
      ecmaVersion: "latest",
      // Apps Script doesn't use standard ES modules (import/export) natively
      sourceType: "script", 
      
      globals: {
        // Load standard modern JavaScript globals (Map, Set, Promise, etc.)
        ...globals.es2021,
        
        // Extract and spread the globals from the Google Apps Script plugin
        // (e.g., SpreadsheetApp, Logger, Utilities, HtmlService, etc.)
        ...googleappsscript.environments.googleappsscript.globals,
      }
    },

    // 3. Customize rules for your specific Apps Script architecture
    rules: {
      // Keep no-undef as an error to catch typos and missing imports
      "no-undef": "error",

      // Downgrade unused variables to a warning, and ignore specific patterns.
      // This allows your trigger functions (onEdit, doGet) and specific trailing-underscore 
      // utility functions to exist without failing your linting checks.
      "no-unused-vars": ["warn", { 
        "vars": "all", 
        "args": "none", 
        "varsIgnorePattern": "^(onEdit|onOpen|doGet|doPost)$|^_.+|.*_$"
      }]
    }
  }
];
