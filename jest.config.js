// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  //setupFiles: ['./tests/config/global-setup.ts'],
  testEnvironment: "node",
  testRegex: "tests\/(.*).(test|spec).ts?",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },

  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: []
      }
    }
  }
};

