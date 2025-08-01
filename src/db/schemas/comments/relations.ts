import {postsTable, usersTable} from "@/db";
import {relations} from "drizzle-orm";
import {commentsTable} from "@/db";

export const commentsRelations = relations(commentsTable, ({ one }) => ({
    post: one(postsTable, {
        fields: [commentsTable.postId],
        references: [postsTable.id],
    }),
    owner: one(usersTable, {
        fields: [commentsTable.ownerId],
        references: [usersTable.id],
    }),
}));