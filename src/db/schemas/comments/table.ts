import * as t from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import {baseColumns} from "../columns.helpers";
import {postsTable} from "../posts/table";
import {usersTable} from "../users/table";

export const commentsTable = table("comments",
    {
        text: t.varchar({length: 256}),
        postId: t.uuid("post_id").references(() => postsTable.id),
        ownerId: t.uuid("owner_id").references(() => usersTable.id),
        ...baseColumns,
    });