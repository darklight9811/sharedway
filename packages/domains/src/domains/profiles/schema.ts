import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

import type v from "@repo/ds/lib/v/index";

import { profiles } from "./sql/table.server";

export const insertProfileSchema = createInsertSchema(profiles);
export type InsertProfileSchema = v.infer<typeof insertProfileSchema>;

export const updateProfileSchema = createUpdateSchema(profiles);
export type UpdateProfileSchema = v.infer<typeof updateProfileSchema>;
