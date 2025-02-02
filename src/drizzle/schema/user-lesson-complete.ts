import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { user } from "@/drizzle/schema/auth";
import { lessonTable } from "@/drizzle/schema/lesson";
import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

export const userLessonCompleteTable = pgTable(
  "user_lesson_complete",
  {
    userId: uuid()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    lessonId: uuid()
      .notNull()
      .references(() => lessonTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.userId, table.lessonId] })]
);

export const userLessonCompleteRelations = relations(userLessonCompleteTable, ({ one }) => ({
  user: one(user, {
    fields: [userLessonCompleteTable.userId],
    references: [user.id],
  }),
  lesson: one(lessonTable, {
    fields: [userLessonCompleteTable.lessonId],
    references: [lessonTable.id],
  }),
}));
