import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

// For your project make sure enable these rule and fix build errors to improve your code quality
eslintConfig.push({
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "@next/next/no-img-element": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/display-name": "off",
  },
});

export default eslintConfig;
