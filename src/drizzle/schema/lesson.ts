import { createdAt, id, updatedAt } from "@/drizzle/schema-helpers";
import { courseSectionTable } from "@/drizzle/schema/course-section";
import { userLessonCompleteTable } from "@/drizzle/schema/user-lesson-complete";
import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const lessonStatus = ["public", "private", "preview"] as const;
export type LessonStatus = (typeof lessonStatus)[number];
export const lessonStatusEnum = pgEnum("lesson_status", lessonStatus);

export const lessonTable = pgTable("lessons", {
  id,
  name: text().notNull(),
  description: text(),
  youtubeVideoId: text().notNull(),
  order: integer().notNull(),
  status: lessonStatusEnum().notNull().default("private"),
  sectionId: uuid()
    .notNull()
    .references(() => courseSectionTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const lessonRelations = relations(lessonTable, ({ one, many }) => ({
  section: one(courseSectionTable, {
    fields: [lessonTable.sectionId],
    references: [courseSectionTable.id],
  }),
  userLessonsComplete: many(userLessonCompleteTable),
}));
