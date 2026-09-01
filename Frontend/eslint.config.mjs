import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
    { ignores: ["build/**", "node_modules/**"] },
    js.configs.recommended,
    { files: ["**/*.{js,jsx}"], ...react.configs.flat.recommended },
    { files: ["**/*.{js,jsx}"], ...reactHooks.configs.flat.recommended },
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.vitest,
            },
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "no-console": ["error", { allow: ["error", "warn"] }],
             "react-hooks/exhaustive-deps": "error",
        },
        settings: { react: { version: "detect" } },
    },
];