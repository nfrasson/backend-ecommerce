import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  verbose: true,
  clearMocks: true,
  testEnvironment: "node",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/*.interface.ts",
  ],
  coverageDirectory: "coverage",
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
  moduleNameMapper: {
    "@domain/(.*)": "<rootDir>/src/domain/$1",
    "@infrastructure/(.*)": "<rootDir>/src/infrastructure/$1",
    "@usecases/(.*)": "<rootDir>/src/usecases/$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
};

export default config;
