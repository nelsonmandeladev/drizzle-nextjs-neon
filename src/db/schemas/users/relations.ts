// Add relations.ts
import {relations} from "drizzle-orm";
import {commentsTable, postsTable} from "@/db";
import {usersTable} from "@/db";

export const usersRelations = relations(usersTable, ({ many, one }) => ({
    posts: many(postsTable),
    comments: many(commentsTable),
    invitedBy: one(usersTable, {
        fields: [usersTable.invitee],
        references: [usersTable.id],
    }),
}));