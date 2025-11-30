export const ENV = {
  cookieSecret: process.env.JWT_SECRET ?? "local-dev-secret",
  databaseUrl: process.env.DATABASE_URL ?? "sqlite:local.db",
  isProduction: process.env.NODE_ENV === "production",
};
