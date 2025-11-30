CREATE TABLE "extensions" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"version" text NOT NULL,
	"downloadUrl" text,
	"iconUrl" text,
	"price" integer DEFAULT 0 NOT NULL,
	"trialDays" integer DEFAULT 7 NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"features" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "extensions_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "generatedLeads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"company" text,
	"website" text,
	"linkedinUrl" text,
	"industry" text,
	"location" text,
	"notes" text,
	"source" text NOT NULL,
	"quality" text DEFAULT 'medium' NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"generatedAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"company" text,
	"phone" text,
	"message" text,
	"source" text DEFAULT 'website' NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "licenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"extensionId" integer NOT NULL,
	"licenseKey" text NOT NULL,
	"status" text DEFAULT 'trial' NOT NULL,
	"expiresAt" timestamp,
	"activatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "licenses_licenseKey_unique" UNIQUE("licenseKey")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"extensionId" integer NOT NULL,
	"licenseId" integer,
	"paypalOrderId" text,
	"paypalPayerId" text,
	"amount" integer NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"paymentMethod" text DEFAULT 'paypal' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "transactions_paypalOrderId_unique" UNIQUE("paypalOrderId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" text NOT NULL,
	"name" text,
	"email" text,
	"loginMethod" text,
	"role" text DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId")
);
