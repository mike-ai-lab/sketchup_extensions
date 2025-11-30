import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Extensions metadata table - stores information about each SketchUp extension
 * Allows easy version swapping and metadata management
 */
export const extensions = mysqlTable("extensions", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(), // e.g., "parametrix", "autonestcut"
  name: varchar("name", { length: 255 }).notNull(), // Display name
  description: text("description"),
  version: varchar("version", { length: 50 }).notNull(), // Current version
  downloadUrl: text("downloadUrl"), // URL to .rbz file
  iconUrl: text("iconUrl"), // Extension icon
  price: int("price").notNull().default(0), // Price in cents (e.g., 4900 = $49.00)
  trialDays: int("trialDays").notNull().default(7), // Trial period in days
  isActive: boolean("isActive").notNull().default(true), // Enable/disable extension
  features: text("features"), // JSON array of features
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Extension = typeof extensions.$inferSelect;
export type InsertExtension = typeof extensions.$inferInsert;

/**
 * Licenses table - stores license keys for each user and extension
 */
export const licenses = mysqlTable("licenses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Foreign key to users table
  extensionId: int("extensionId").notNull(), // Foreign key to extensions table
  licenseKey: varchar("licenseKey", { length: 64 }).notNull().unique(),
  status: mysqlEnum("status", ["trial", "active", "expired", "cancelled"]).notNull().default("trial"),
  expiresAt: timestamp("expiresAt"), // Null for lifetime licenses
  activatedAt: timestamp("activatedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type License = typeof licenses.$inferSelect;
export type InsertLicense = typeof licenses.$inferInsert;

/**
 * Transactions table - records PayPal payment transactions
 */
export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  extensionId: int("extensionId").notNull(),
  licenseId: int("licenseId"), // Linked license (null until license is generated)
  paypalOrderId: varchar("paypalOrderId", { length: 255 }).unique(),
  paypalPayerId: varchar("paypalPayerId", { length: 255 }),
  amount: int("amount").notNull(), // Amount in cents
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).notNull().default("pending"),
  paymentMethod: varchar("paymentMethod", { length: 50 }).notNull().default("paypal"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;

/**
 * Leads table - stores leads captured from website forms
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  message: text("message"),
  source: varchar("source", { length: 100 }).notNull().default("website"), // website, newsletter, etc.
  status: mysqlEnum("status", ["new", "contacted", "converted", "archived"]).notNull().default("new"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * Generated leads table - stores leads found through daily automation
 */
export const generatedLeads = mysqlTable("generatedLeads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  company: varchar("company", { length: 255 }),
  website: text("website"),
  linkedinUrl: text("linkedinUrl"),
  industry: varchar("industry", { length: 100 }), // e.g., "interior design", "architecture"
  location: varchar("location", { length: 255 }),
  notes: text("notes"),
  source: varchar("source", { length: 100 }).notNull(), // e.g., "linkedin", "google", "directory"
  quality: mysqlEnum("quality", ["high", "medium", "low"]).notNull().default("medium"),
  status: mysqlEnum("status", ["new", "contacted", "converted", "archived"]).notNull().default("new"),
  generatedAt: timestamp("generatedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GeneratedLead = typeof generatedLeads.$inferSelect;
export type InsertGeneratedLead = typeof generatedLeads.$inferInsert;
