const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/.testinglibrary.config.js"],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = async () => ({
  // Spread the asynchronous NextJS Jest Configuration.
  ...(await createJestConfig(customJestConfig)()),
  // Transpires all modules in node_modules, this is probably bad, but made Jest work flawlessly.
  transformIgnorePatterns: [
    "node_modules/$",
    "^.+\\.module\\.(css|less|sass|scss)$",
  ],
});
