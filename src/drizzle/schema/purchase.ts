import { createdAt, id, updatedAt } from "@/drizzle/schema-helpers";
import { user } from "@/drizzle/schema/auth";
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
    .references(() => user.id, { onDelete: "restrict" }),
  productId: uuid()
    .notNull()
    .references(() => productTable.id, { onDelete: "restrict" }),
  stripeSessionId: text().notNull().unique(),
  refundedAt: timestamp({ withTimezone: true }),
  createdAt,
  updatedAt,
});

export const purchaseRelations = relations(purchaseTable, ({ one }) => ({
  user: one(user, {
    fields: [purchaseTable.userId],
    references: [user.id],
  }),
  product: one(productTable, {
    fields: [purchaseTable.productId],
    references: [productTable.id],
  }),
}));
