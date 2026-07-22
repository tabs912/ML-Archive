
    rules: {
      "no-undef": "error",

      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "none",
          varsIgnorePattern:
            "^(onEdit|onOpen|onInstall|doGet|doPost)$|^_.+|.*_$"
        }
      ],

      "no-redeclare": "error"
    }
  }
];
