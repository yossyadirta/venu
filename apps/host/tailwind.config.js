module.exports = {
  ...require('config-tailwind/tailwind.config.js'),
  content: [
    "../../packages/loka/src/**/*.{js,ts,jsx,tsx}",
    "../../apps/*/src/**/*.{js,ts,jsx,tsx}",
  ]
};
