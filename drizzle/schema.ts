import { integer, text, pgTable, serial, timestamp, boolean } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: text("openId").notNull().unique(),
  name: text("name"),
  email: text("email"),
  loginMethod: text("loginMethod"),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Extensions metadata table - stores information about each SketchUp extension
 * Allows easy version swapping and metadata management
 */
export const extensions = pgTable("extensions", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  version: text("version").notNull(),
  downloadUrl: text("downloadUrl"),
  iconUrl: text("iconUrl"),
  price: integer("price").notNull().default(0),
  trialDays: integer("trialDays").notNull().default(7),
  isActive: boolean("isActive").notNull().default(true),
  features: text("features"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Extension = typeof extensions.$inferSelect;
export type InsertExtension = typeof extensions.$inferInsert;

/**
 * Licenses table - stores license keys for each user and extension
 */
export const licenses = pgTable("licenses", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  extensionId: integer("extensionId").notNull(),
  licenseKey: text("licenseKey").notNull().unique(),
  status: text("status").notNull().default("trial"),
  expiresAt: timestamp("expiresAt"),
  activatedAt: timestamp("activatedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type License = typeof licenses.$inferSelect;
export type InsertLicense = typeof licenses.$inferInsert;

/**
 * Transactions table - records PayPal payment transactions
 */
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  extensionId: integer("extensionId").notNull(),
  licenseId: integer("licenseId"),
  paypalOrderId: text("paypalOrderId").unique(),
  paypalPayerId: text("paypalPayerId"),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("USD"),
  status: text("status").notNull().default("pending"),
  paymentMethod: text("paymentMethod").notNull().default("paypal"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;

/**
 * Leads table - stores leads captured from website forms
 */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  message: text("message"),
  source: text("source").notNull().default("website"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * Generated leads table - stores leads found through daily automation
 */
export const generatedLeads = pgTable("generatedLeads", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  company: text("company"),
  website: text("website"),
  linkedinUrl: text("linkedinUrl"),
  industry: text("industry"),
  location: text("location"),
  notes: text("notes"),
  source: text("source").notNull(),
  quality: text("quality").notNull().default("medium"),
  status: text("status").notNull().default("new"),
  generatedAt: timestamp("generatedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type GeneratedLead = typeof generatedLeads.$inferSelect;
export type InsertGeneratedLead = typeof generatedLeads.$inferInsert;