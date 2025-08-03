import {db} from "@/db/instance";
export async function listCommentsQuery(limit: number, postId?: string, ownerId?: string) {
    return  await db.query.commentsTable.findMany({
        limit,
        where: (comments, {eq}) => {
            if (postId) return eq(comments.postId, postId);
            if (ownerId) return eq(comments.ownerId, ownerId);
        },
        columns: {
            deleted_at: false,
            ownerId: false,
            postId: false,
        },
        with: {
          post: postId === undefined ? {
              columns: {
                  id: true,
                  title: true,
                  slug: true,
                  body: true,
              }
          } : undefined,
            owner: ownerId === undefined ? {
                columns: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    avatarUrl: true,
                    role: true,
                }
            } : undefined,
        },
        orderBy: (comment, {desc}) => (desc(comment.created_at))
    });
}