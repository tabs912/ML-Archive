module.exports = [
  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        SpreadsheetApp: "readonly",
        DriveApp: "readonly",
        DocumentApp: "readonly",
        FormApp: "readonly",
        GmailApp: "readonly",
        CalendarApp: "readonly",
        Utilities: "readonly",
        Logger: "readonly",
        Session: "readonly",
        PropertiesService: "readonly",
        CacheService: "readonly",
        LockService: "readonly",
        ScriptApp: "readonly",
        UrlFetchApp: "readonly",
        HtmlService: "readonly",
        ContentService: "readonly",
        MailApp: "readonly",
        Browser: "readonly",
        console: "readonly"
      }
    },

    rules: {
      "no-undef": "error",
      "no-redeclare": "error",
      "no-unreachable": "error",
      "no-unused-vars": [
        "warn",
        {
          args: "none",
          varsIgnorePattern: "^_",
          caughtErrors: "none"
        }
      ]
    }
  }
];
