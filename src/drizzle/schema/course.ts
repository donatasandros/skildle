import { createdAt, id, updatedAt } from "@/drizzle/schema-helpers";
import { courseProductTable } from "@/drizzle/schema/course-product";
import { courseSectionTable } from "@/drizzle/schema/course-section";
import { userCourseAccessTable } from "@/drizzle/schema/user-course-access";
import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const courseTable = pgTable("courses", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  createdAt,
  updatedAt,
});

export const courseRelations = relations(courseTable, ({ many }) => ({
  courseProducts: many(courseProductTable),
  userCourseAccess: many(userCourseAccessTable),
  courseSections: many(courseSectionTable),
}));
