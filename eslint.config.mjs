export default [
    {
        files: ["scripts/**/*.js"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "script",
            globals: {
                // API navigateur
                window: "readonly",
                document: "readonly",
                console: "readonly",
                fetch: "readonly",
                URLSearchParams: "readonly",
            },
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "no-console": "off",
            "eqeqeq": "error",
            "no-var": "error",
            "prefer-const": "warn",
            "semi": ["error", "always"],
            "no-redeclare": "error",
            "no-duplicate-case": "error",
            "radix": "error",
        },
    },
];
