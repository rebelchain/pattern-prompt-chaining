import { z } from "zod";

const FeatureSchema = z.object({
  // git short SHA (7) or full SHA-1 (40). Outside this range, probably broken input
  sha: z.string().min(7).max(40),
  // minimum description is 10 character. Pretend "fix" or "a"
  description: z.string().min(10),
  // optional. if exist, must be string
  scope: z.string().optional(),
});

const FixSchema = z.object({
  sha: z.string().min(7).max(40),
  description: z.string().min(10),
  //validation regex on Gate Check
  issue_ref: z.string().optional(),
});

const BreakingSchema = z.object({
  sha: z.string().min(7).max(40),
  // must be longer. need detail explanation. forced to be explicit
  description: z.string().min(20),
  // 1 item minimum. Breaking change without API actually being broken,makes no sense
  affected_apis: z.array(z.string()).min(1),
  // mandatory field. but the value can be null
  migration_guide: z.string().nullable(),
});

export const Step1Schema = z.object({
  features: z.array(FeatureSchema),
  fixes: z.array(FixSchema),
  breaking_changes: z.array(BreakingSchema),
});

export type Step1Output = z.infer<typeof Step1Schema>;
