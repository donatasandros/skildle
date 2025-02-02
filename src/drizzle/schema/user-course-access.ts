import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { user } from "@/drizzle/schema/auth";
import { courseTable } from "@/drizzle/schema/course";
import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

export const userCourseAccessTable = pgTable(
  "user_course_access",
  {
    userId: uuid()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    courseId: uuid()
      .notNull()
      .references(() => courseTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.userId, table.courseId] })]
);

export const userCourseAccessRelations = relations(userCourseAccessTable, ({ one }) => ({
  user: one(user, {
    fields: [userCourseAccessTable.userId],
    references: [user.id],
  }),
  course: one(courseTable, {
    fields: [userCourseAccessTable.courseId],
    references: [courseTable.id],
  }),
}));
