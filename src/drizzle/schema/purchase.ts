import { createdAt, id, updatedAt } from "@/drizzle/schema-helpers";
import { userTable } from "@/drizzle/schema/auth";
import { productTable } from "@/drizzle/schema/product";
import { relations } from "drizzle-orm";
import { integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const purchaseTable = pgTable("purchases", {
  id,
  pricePaidInCents: integer().notNull(),
  productDetails: jsonb()
    .notNull()
    .$type<{ name: string; description: string; imageUrl: string }>(),
  userId: uuid()
    .notNull()
    .references(() => userTable.id, { onDelete: "restrict" }),
  productId: uuid()
    .notNull()
    .references(() => productTable.id, { onDelete: "restrict" }),
  stripeSessionId: text().notNull().unique(),
  refundedAt: timestamp({ withTimezone: true }),
  createdAt,
  updatedAt,
});

export const purchaseRelations = relations(purchaseTable, ({ one }) => ({
  user: one(userTable, {
    fields: [purchaseTable.userId],
    references: [userTable.id],
  }),
  product: one(productTable, {
    fields: [purchaseTable.productId],
    references: [productTable.id],
  }),
}));
