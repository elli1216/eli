module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
  },
};
