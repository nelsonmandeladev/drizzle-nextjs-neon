import { db } from "@/db/instance";
export async function listUserQuery(limit?: number) {
    return await db.query.usersTable.findMany({
        limit,
       where: (users, {isNull}) => isNull(users.deleted_at),
        with: {
            posts: {
                where: (posts, { isNull }) => isNull(posts.deleted_at),
                columns: { id: true }
            },
            comments: {
                where: (comments, { isNull }) => isNull(comments.deleted_at),
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
                where: (posts, { isNull }) => isNull(posts.deleted_at),
                columns: { id: true }
            },
            comments: {
                where: (comments, { isNull }) => isNull(comments.deleted_at),
                columns: { id: true },
            },
        },
    });
}