import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { SignJWT } from "jose";
import { ENV } from "./env";

export function registerOAuthRoutes(app: Express) {
  // Simple login endpoint for local development
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    const { email, name } = req.body;

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    try {
      // Create or update user
      const userId = `local_${email.replace('@', '_').replace('.', '_')}`;
      await db.upsertUser({
        openId: userId,
        name: name || null,
        email: email,
        loginMethod: "local",
        lastSignedIn: new Date(),
      });

      // Create session token
      const secretKey = new TextEncoder().encode(ENV.cookieSecret);
      const sessionToken = await new SignJWT({ openId: userId, name: name || "" })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(Math.floor((Date.now() + ONE_YEAR_MS) / 1000))
        .sign(secretKey);

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({ success: true });
    } catch (error) {
      console.error("[Auth] Login failed", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    res.clearCookie(COOKIE_NAME);
    res.json({ success: true });
  });
}
