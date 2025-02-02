import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { courseTable } from "@/drizzle/schema/course";
import { productTable } from "@/drizzle/schema/product";
import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

export const courseProductTable = pgTable(
  "course_products",
  {
    courseId: uuid()
      .notNull()
      .references(() => courseTable.id, { onDelete: "restrict" }),
    productId: uuid()
      .notNull()
      .references(() => productTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.courseId, table.productId] })]
);

export const courseProductRelations = relations(courseProductTable, ({ one }) => ({
  course: one(courseTable, {
    fields: [courseProductTable.courseId],
    references: [courseTable.id],
  }),
  product: one(productTable, {
    fields: [courseProductTable.productId],
    references: [productTable.id],
  }),
}));
