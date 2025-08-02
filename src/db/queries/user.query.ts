import { db } from "@/db/instance";
export async function listUserQuery(limit?: number) {
    return await db.query.usersTable.findMany({
        limit,
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

export async function getUserDetail(id: string) {
    return await db.query.usersTable.findFirst({
        where: (users, {eq}) =>(eq(users.id, id)),
        columns: {
            deleted_at: false,
        },
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