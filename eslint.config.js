<<<<<<< HEAD
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
=======
cat > eslint.config.js <<'EOF'
module.exports = [
  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        // Google Apps Script services
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
        ContactsApp: "readonly",
        LanguageApp: "readonly",
        Charts: "readonly",
        Jdbc: "readonly",
        Maps: "readonly",
        GroupsApp: "readonly",
        SitesApp: "readonly",
        XmlService: "readonly",

        // Common Apps Script runtime globals
        console: "readonly",
        Browser: "readonly",
      },
    },

    rules: {
      "no-undef": "error",
      "no-redeclare": "error",
      "no-unreachable": "error",
      "no-constant-condition": "warn",
      "no-unused-vars": [
        "warn",
        {
          args: "none",
          varsIgnorePattern: "^_",
          caughtErrors: "none",
        },
      ],
    },
  },
];
EOF
>>>>>>> 1659434044bc46942c38ea2e38de7dfe14e768d7
