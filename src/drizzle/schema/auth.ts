import { userCourseAccessTable } from "@/drizzle/schema";
import { id } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userRoles = ["user", "admin"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_role", userRoles);

export const userTable = pgTable("users", {
  id,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  role: userRoleEnum().notNull().default("user"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const userRelations = relations(userTable, ({ many }) => ({
  userCourseAccess: many(userCourseAccessTable),
}));

export const sessionTable = pgTable("sessions", {
  id,
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: uuid()
    .notNull()
    .references(() => userTable.id),
});

export const accountTable = pgTable("accounts", {
  id,
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: uuid()
    .notNull()
    .references(() => userTable.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verificationTable = pgTable("verifications", {
  id,
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
