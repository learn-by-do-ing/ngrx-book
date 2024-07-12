// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const ngrx = require("@ngrx/eslint-plugin/v9");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,

      // 👇 Use all rules at once
      ...ngrx.configs.all,
      // 👇 Or only import the rules for a specific package
      // ...ngrx.configs.store,
      // ...ngrx.configs.effects,
      // ...ngrx.configs.componentStore,
      // ...ngrx.configs.operators,
      // ...ngrx.configs.signals,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      // 👇 Configure specific rules
      // "@ngrx/with-state-no-arrays-at-root-level": "warn",
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
