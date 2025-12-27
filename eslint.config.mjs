import globals from "globals";
import tseslint from "typescript-eslint";

export default [
    {
        files: ["**/*.js", "**/*.mjs", "**/*.ts"],
        languageOptions: { globals: globals.browser },
    },
    ...tseslint.configs.recommended,
    {
        files: ["**/*.js", "**/*.ts"],
        rules: {
            indent: ["error", 4],
            semi: ["error"],
            "operator-assignment": "error",
            "no-inner-declarations": [
                "error",
                "functions",
                { blockScopedFunctions: "disallow" },
            ],
        },
    },
];