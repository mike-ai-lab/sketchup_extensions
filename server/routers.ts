import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import crypto from "crypto";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Lead capture and management
  leads: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().optional(),
        email: z.string().email(),
        company: z.string().optional(),
        phone: z.string().optional(),
        message: z.string().optional(),
        source: z.string().optional().default("website"),
      }))
      .mutation(async ({ input }) => {
        await db.createLead({
          name: input.name || null,
          email: input.email,
          company: input.company || null,
          phone: input.phone || null,
          message: input.message || null,
          source: input.source,
          status: "new",
        });
        return { success: true };
      }),

    list: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return await db.getAllLeads();
      }),
  }),

  // Extension management
  extensions: router({
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getExtensionBySlug(input.slug);
      }),

    list: publicProcedure
      .query(async () => {
        return await db.getAllExtensions();
      }),
  }),

  // License management
  licenses: router({
    // Validate a license key (called by SketchUp extension)
    validate: publicProcedure
      .input(z.object({
        licenseKey: z.string(),
        extensionSlug: z.string(),
      }))
      .query(async ({ input }) => {
        const license = await db.getLicenseByKey(input.licenseKey);
        
        if (!license) {
          return { valid: false, reason: "License not found" };
        }

        // Check if license is active or trial
        if (license.status !== "active" && license.status !== "trial") {
          return { valid: false, reason: "License is not active" };
        }

        // Check expiration
        if (license.expiresAt && new Date(license.expiresAt) < new Date()) {
          return { valid: false, reason: "License has expired" };
        }

        return {
          valid: true,
          status: license.status,
          expiresAt: license.expiresAt,
        };
      }),

    // Generate a trial license
    generateTrial: publicProcedure
      .input(z.object({
        email: z.string().email(),
        extensionSlug: z.string(),
      }))
      .mutation(async ({ input }) => {
        // Get or create user
        const extension = await db.getExtensionBySlug(input.extensionSlug);
        if (!extension) {
          throw new Error("Extension not found");
        }

        // Generate license key
        const licenseKey = `TRIAL-${crypto.randomBytes(16).toString("hex").toUpperCase()}`;

        // Calculate expiration (7 days from now)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + (extension.trialDays || 7));

        // Create trial license
        await db.createLicense({
          userId: 0, // Temporary - will be linked when user signs up
          extensionId: extension.id,
          licenseKey,
          status: "trial",
          expiresAt,
          activatedAt: new Date(),
        });

        return {
          licenseKey,
          expiresAt,
          downloadUrl: extension.downloadUrl,
        };
      }),

    // Get user's licenses
    myLicenses: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getUserLicenses(ctx.user.id);
      }),
  }),

  // PayPal integration
  paypal: router({
    createOrder: publicProcedure
      .input(z.object({
        extensionSlug: z.string(),
      }))
      .mutation(async ({ input }) => {
        const extension = await db.getExtensionBySlug(input.extensionSlug);
        if (!extension) {
          throw new Error("Extension not found");
        }

        const { createPayPalOrder } = await import("./paypal");
        const order = await createPayPalOrder(
          extension.price,
          "USD",
          `${extension.name} License`
        );

        // Store transaction in database
        await db.createTransaction({
          userId: 0, // Will be linked when user completes payment
          extensionId: extension.id,
          licenseId: null,
          paypalOrderId: order.id,
          paypalPayerId: null,
          amount: extension.price,
          currency: "USD",
          status: "pending",
          paymentMethod: "paypal",
        });

        // Find approval URL from links
        const approvalLink = order.links.find((link: any) => link.rel === "approve");

        return {
          orderId: order.id,
          approvalUrl: approvalLink?.href || "/purchase/" + input.extensionSlug,
        };
      }),

    captureOrder: publicProcedure
      .input(z.object({
        orderId: z.string(),
        extensionSlug: z.string(),
      }))
      .mutation(async ({ input }) => {
        const { capturePayPalOrder } = await import("./paypal");
        const capture = await capturePayPalOrder(input.orderId);

        // Get extension
        const extension = await db.getExtensionBySlug(input.extensionSlug);
        if (!extension) {
          throw new Error("Extension not found");
        }

        // Generate license key
        const licenseKey = `PAID-${crypto.randomBytes(16).toString("hex").toUpperCase()}`;

        // Create license
        await db.createLicense({
          userId: 0, // Will be linked when user signs up
          extensionId: extension.id,
          licenseKey,
          status: "active",
          expiresAt: null, // Lifetime license
          activatedAt: new Date(),
        });

        // Update transaction
        const transaction = await db.getTransactionByPayPalOrderId(input.orderId);
        if (transaction) {
          // Transaction update logic would go here
        }

        return {
          success: true,
          licenseKey,
          downloadUrl: extension.downloadUrl,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
