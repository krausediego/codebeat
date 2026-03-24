import { betterAuth } from "better-auth";
import { envApp, envAuth } from "../config";
import { openAPI } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database";

export const auth = betterAuth({
  basePath: "/api/v1/auth",
  baseURL: "http://localhost:3333",
  trustedOrigins: [envApp.WEB_BASE_URL],
  plugins: [openAPI()],
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  advanced: {
    database: {
      generateId: false,
    },
    disableOriginCheck: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  socialProviders: {
    github: {
      clientId: envAuth.GITHUB_CLIENT_ID,
      clientSecret: envAuth.GITHUB_CLIENT_SECRET,
      scope: ["read:user", "user:email", "repo", "read:org"],
    },
  },
});
