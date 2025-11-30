import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, leads, InsertLead, licenses, InsertLicense, extensions, InsertExtension, transactions, InsertTransaction } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Lead management functions
export async function createLead(lead: InsertLead) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(leads).values(lead);
  return result;
}

export async function getAllLeads() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select().from(leads).orderBy(leads.createdAt);
}

// License management functions
export async function createLicense(license: InsertLicense) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(licenses).values(license);
  return result;
}

export async function getLicenseByKey(licenseKey: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.select().from(licenses).where(eq(licenses.licenseKey, licenseKey)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserLicenses(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select().from(licenses).where(eq(licenses.userId, userId));
}

// Extension management functions
export async function getExtensionBySlug(slug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.select().from(extensions).where(eq(extensions.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllExtensions() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.select().from(extensions);
}

export async function upsertExtension(extension: InsertExtension) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(extensions).values(extension).onDuplicateKeyUpdate({
    set: {
      name: extension.name,
      description: extension.description,
      version: extension.version,
      downloadUrl: extension.downloadUrl,
      iconUrl: extension.iconUrl,
      price: extension.price,
      trialDays: extension.trialDays,
      isActive: extension.isActive,
      features: extension.features,
    }
  });
}

// Transaction management functions
export async function createTransaction(transaction: InsertTransaction) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(transactions).values(transaction);
  return result;
}

export async function getTransactionByPayPalOrderId(orderId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.select().from(transactions).where(eq(transactions.paypalOrderId, orderId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}
