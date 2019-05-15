module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue/recommended",
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "never",
        "normal": "always",
        "component": "any"
      },
      "svg": "always",
      "math": "always"
    }],
    "semi": ["error", "always"],
    "no-unexpected-multiline": "error",
    "no-unreachable": "error",
    "semi-style": ["error", "last"],
    "vue/max-attributes-per-line": [
      2,
      {
        "singleline": 4,
      }
    ],
    "no-console": [
      2,
      {
        "allow": [
          "error",
          "info"
        ]
      }
    ]
  },
};
