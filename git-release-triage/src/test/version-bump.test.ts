import { computeVersionBump } from "../utils/version-bump.js";

import type { Step1Output } from "../schemas/step1.js";

const emptyData: Step1Output = {
  features: [],
  fixes: [],
  breaking_changes: [],
};

// TEST 1: with breaking_changes
const withBreaking: Step1Output = {
  ...emptyData,
  breaking_changes: [
    {
      sha: "bbbbb22222",
      description: "Remove /v1/auth endpoint completely",
      affected_apis: ["/v1/auth"],
      migration_guide: "See migration docs",
    },
  ],
};

console.log(
  "Test 1 (breaking => major):",
  computeVersionBump(withBreaking) === "major" ? "Yes" : "No",
);

//TEST 2: feature changes only, no breaking_changes => minor
const withFeature: Step1Output = {
  ...emptyData,
  features: [
    {
      sha: "bbbbb222222",
      description: "add OAuth login support",
      scope: "auth",
    },
  ],
};

console.log(
  "Tes 2 (features only without breaking changes => minor)",
  computeVersionBump(withFeature) === "minor" ? "Yes" : "No",
);

//TEST 3: fix only
const withFix: Step1Output = {
  ...emptyData,
  fixes: [
    {
      sha: "def56788",
      description: "Handle full response from upstream",
    },
  ],
};

console.log(
  "Test 3 (fix only => patch",
  computeVersionBump(withFix) === "patch" ? "Yes" : "No",
);

//TEST 4: empty data
console.log(
  "Test 4 (Empty data)",
  computeVersionBump(emptyData) === "patch" ? "Yes" : "No",
);

//TEST 5: Breaking changes & features => must be "major"
const breakingAndFeature: Step1Output = {
  ...withBreaking,
  features: withFeature.features,
};

console.log(
  "Test 5 (Breaking changes & Features => major)",
  computeVersionBump(breakingAndFeature) === "major" ? "YES" : "NO",
);
