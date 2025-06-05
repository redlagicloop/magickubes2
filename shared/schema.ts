import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const analysisRequests = pgTable("analysis_requests", {
  id: serial("id").primaryKey(),
  prompt: text("prompt").notNull(),
  insights: jsonb("insights"),
  sqlQuery: text("sql_query"),
  chartData: jsonb("chart_data"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAnalysisRequestSchema = createInsertSchema(analysisRequests).pick({
  prompt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type AnalysisRequest = typeof analysisRequests.$inferSelect;
export type InsertAnalysisRequest = z.infer<typeof insertAnalysisRequestSchema>;
