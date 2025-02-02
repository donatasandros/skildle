import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { userTable } from "@/drizzle/schema/auth";
import { lessonTable } from "@/drizzle/schema/lesson";
import { relations } from "drizzle-orm";

export const userLessonCompleteTable = pgTable(
  "user_lesson_complete",
  {
    userId: uuid()
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    lessonId: uuid()
      .notNull()
      .references(() => lessonTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (t) => [primaryKey({ columns: [t.userId, t.lessonId] })]
);

export const userLessonCompleteRelations = relations(userLessonCompleteTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userLessonCompleteTable.userId],
    references: [userTable.id],
  }),
  lesson: one(lessonTable, {
    fields: [userLessonCompleteTable.lessonId],
    references: [lessonTable.id],
  }),
}));
