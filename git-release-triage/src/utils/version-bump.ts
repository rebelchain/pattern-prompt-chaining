import type { Step1Output } from "../schemas/step1.js";

export type VersionBump = "major" | "minor" | "patch";

export function computeVersionBump(data: Step1Output): VersionBump {
  if (data.breaking_changes.length > 0) return "major";
  if (data.features.length > 0) return "minor";
  return "patch";
}
