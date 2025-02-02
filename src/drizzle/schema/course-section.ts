import { createdAt, id, updatedAt } from "@/drizzle/schema-helpers";
import { courseTable } from "@/drizzle/schema/course";
import { lessonTable } from "@/drizzle/schema/lesson";
import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const courseSectionStatus = ["public", "private"] as const;
export type CourseSectionStatus = (typeof courseSectionStatus)[number];
export const courseSectionStatusEnum = pgEnum("course_section_status", courseSectionStatus);

export const courseSectionTable = pgTable("course_sections", {
  id,
  name: text().notNull(),
  status: courseSectionStatusEnum().notNull().default("private"),
  order: integer().notNull(),
  courseId: uuid()
    .notNull()
    .references(() => courseTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const courseSectionRelations = relations(courseSectionTable, ({ one, many }) => ({
  course: one(courseTable, {
    fields: [courseSectionTable.courseId],
    references: [courseTable.id],
  }),
  lessons: many(lessonTable),
}));
