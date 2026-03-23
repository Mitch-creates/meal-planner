import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email"),
  displayName: text("display_name").notNull(),
  isVerified: boolean("is_verified").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const weeklyPlans = pgTable("weekly_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull(),
  isCurrent: boolean("is_current").notNull().default(false),
  confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const planGenerationLedger = pgTable("plan_generation_ledger", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull(),
  generationType: text("generation_type").notNull(),
  consumed: boolean("consumed").notNull().default(false),
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const groceryListItems = pgTable("grocery_list_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  groceryListId: uuid("grocery_list_id").notNull(),
  ingredientId: uuid("ingredient_id"),
  customLabel: text("custom_label"),
  amount: integer("amount"),
  unit: text("unit"),
  isChecked: boolean("is_checked").notNull().default(false)
});
