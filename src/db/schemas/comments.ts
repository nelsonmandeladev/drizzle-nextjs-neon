import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import {postsTable} from "@/db/schemas/post";
import {usersTable} from "@/db/schemas/users";
import {baseColumns} from "@/db/schemas/columns.helpers";


export const commentsTable = table("comments",
    {
        text: t.varchar({length: 256}),
        postId: t.uuid("post_id").references(() => postsTable.id),
        ownerId: t.uuid("owner_id").references(() => usersTable.id),
        ...baseColumns,
    });