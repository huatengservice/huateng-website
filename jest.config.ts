import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const customConfig: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/e2e/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

// next/jest hardcodes transformIgnorePatterns whose lookaheads don't include
// the ESM-only next-intl/use-intl packages; patterns are OR'd, so the ESM
// packages must be added to every pattern's exception list.
export default async function config() {
  const nextConfig = await createJestConfig(customConfig)();
  nextConfig.transformIgnorePatterns = (
    nextConfig.transformIgnorePatterns ?? []
  ).map((pattern) =>
    pattern.replace(
      "(geist|",
      "(geist|next-intl|use-intl|intl-messageformat|@formatjs|",
    ),
  );
  return nextConfig;
}
