import {pgTable, varchar, AnyPgColumn, pgEnum, uniqueIndex, uuid} from "drizzle-orm/pg-core";
import {baseColumns} from "./columns.helpers";


export const rolesEnum = pgEnum("roles", ["guest", "user", "admin"]);

export const usersTable = pgTable("users",
    {
        firstName: varchar("first_name", {length: 255 }).notNull(),
        lastName: varchar("last_name", { length: 255 }),
        email: varchar({ length: 255 }).notNull().unique(),
        invitee: uuid("invitee_id").references((): AnyPgColumn => usersTable.id),
        role: rolesEnum().default("guest"),
        ...baseColumns
    },
    (table) => [
        uniqueIndex("email_index").on(table.email),
    ]
);