import {relations} from "drizzle-orm";
import {commentsTable, postsTable, usersTable} from "@/db";

export const postsRelations = relations(postsTable, ({ one, many }) => ({
    owner: one(usersTable, {
        fields: [postsTable.ownerId],
        references: [usersTable.id],
    }),
    comments: many(commentsTable),
}));