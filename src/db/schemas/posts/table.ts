import {pgTable, uniqueIndex, uuid, varchar} from "drizzle-orm/pg-core";
import {generateUniqueString} from "@/libs/utils";
import {baseColumns} from "@/db";
import {usersTable} from "../users/table"

export const postsTable = pgTable(
    "posts",
    {
        slug: varchar().$default(() => generateUniqueString(16)),
        title: varchar({length: 256}).notNull(),
        body: varchar({length: 1000}),
        ownerId: uuid("owner_id").references(() => usersTable.id),
        imageUrl: varchar("image_url",{ length: 255 }),
        ...baseColumns
    },
    (table) => [
        uniqueIndex("slug_index").on(table.slug),
        uniqueIndex("title_index").on(table.title),
    ]
);
