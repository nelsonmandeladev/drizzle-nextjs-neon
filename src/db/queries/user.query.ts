import { db } from "@/db/instance";
export async function listUserQuery(limit?: number) {
    return await db.query.usersTable.findMany({
        limit,
       where: (users, {isNull}) => isNull(users.deleted_at),
        with: {
            posts: {
                columns: {id: true}
            },
            comments: {
                columns: { id: true },
            },
        },
        orderBy: (users, {desc}) => (desc(users.created_at))
    });
}

export async function getUserDetail(id: string) {
    return await db.query.usersTable.findFirst({
       where: (users, {eq, isNull, and}) => and(eq(users.id, id), isNull(users.deleted_at)),
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