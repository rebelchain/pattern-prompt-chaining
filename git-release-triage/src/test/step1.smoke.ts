import { Step1Schema, type Step1Output } from "../schemas/step1.js";

// TEST 1: Valid Data
const validData: Step1Output = {
  features: [
    { sha: "abc1234", description: "add OAuth login support", scope: "auth" },
  ],
  fixes: [
    {
      sha: "def5678",
      description: "Handle null response from upstream",
    },
  ],
  breaking_changes: [],
};

const result = Step1Schema.safeParse(validData);
console.log("Valid case:", result.success);
// Must be print: Valid case: true

// TEST 2: INVALID SHA CASE
const invalidSha = {
  features: [{ sha: "abc", description: "add OAuth login support" }], // SHA < 7 char
  fixes: [],
  breaking_changes: [],
};

const result2 = Step1Schema.safeParse(invalidSha);
console.log("Invalid SHA:", result2.success);
console.log("Error detail:", result2.error?.issues);

// TEST 3: migration_guide: null CASE.
const nullMigration = {
  features: [],
  fixes: [],
  breaking_changes: [
    {
      sha: "bbbb2222",
      description: "Remove /v1/auth endpoint completely",
      affected_apis: ["/v1/auth"],
      migration_guide: null, // test case for this
    },
  ],
};

const result3 = Step1Schema.safeParse(nullMigration);
console.log("Null migration guide:", result3.success);

// TEST 4: Empty affected_apis
const emptyApis = {
  features: [],
  fixes: [],
  breaking_changes: [
    {
      sha: "bbbbb222222",
      description: "Remove /v1/auth endpoint completely",
      affected_apis: [],
      migration_guide: "See docs",
    },
  ],
};

const result4 = Step1Schema.safeParse(emptyApis);
console.log("Empty Apis", result4.success);
