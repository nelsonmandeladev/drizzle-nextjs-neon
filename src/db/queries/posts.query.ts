import {db} from "@/db/instance";

export async function listPostsQuery(limit?: number, ownerId?:string) {

    return await db.query.postsTable.findMany({
        limit,
        where: (posts, {eq}) => {
            if (ownerId) return eq(posts.ownerId, ownerId)
        },
        columns: {
            content: false,
            deleted_at: false,
            ownerId: false,
        },
       with: {
           comments: {
               columns: {
                   id: true
               }
           },
           owner: ownerId === undefined ? {
               columns: {
                   id: true,
                   firstName: true,
                   lastName: true,
                   email: true,
                   avatarUrl: true,
               }
           }: undefined
       },
        orderBy: (posts, {desc}) => (desc(posts.created_at))
    });
}


export async function getPostDetailQuery(slug: string) {
    return db.query.postsTable.findFirst({
        where: (posts, {eq}) =>(eq(posts.slug, slug)),
        with: {
            comments: {
               columns: {
                   id: true,
               }
            },
            owner: {
                columns: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    avatarUrl: true,
                }
            }
        },
    })
}