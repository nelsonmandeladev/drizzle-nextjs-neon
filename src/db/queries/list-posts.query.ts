import {db} from "@/db/instance";

export async function listPostsQuery() {

    return await db.query.postsTable.findMany({
       with: {
           comments: {
               columns: {
                   id: true
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
       }
    });
}