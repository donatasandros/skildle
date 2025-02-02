import { createdAt, id, updatedAt } from "@/drizzle/schema-helpers";
import { courseProductTable } from "@/drizzle/schema/course-product";
import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

export const productStatus = ["public", "private"] as const;
export type ProductStatus = (typeof productStatus)[number];
export const productStatusEnum = pgEnum("product_status", productStatus);

export const productTable = pgTable("products", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  bannerUrl: text().notNull(),
  priceInDollars: integer().notNull(),
  status: productStatusEnum().notNull().default("private"),
  createdAt,
  updatedAt,
});

export const productRelations = relations(productTable, ({ many }) => ({
  courseProducts: many(courseProductTable),
}));
