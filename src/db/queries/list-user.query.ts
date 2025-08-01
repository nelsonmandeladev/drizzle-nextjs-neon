import { db } from "@/db/instance";
export async function listUserQuery() {
    return await db.query.usersTable.findMany({
        with: {
            posts: {
                columns: {id: true}
            },
            comments: {
                columns: { id: true },
            },
        },
    });
}