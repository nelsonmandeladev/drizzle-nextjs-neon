import {listPostsQuery} from "@/db/queries/posts.query";
import {ListPosts} from "@/components";
import {Post} from "@/types";

export default async function PostsPage() {
    const posts = await listPostsQuery();
    return(
        <div className="w-full">
            <ListPosts posts={posts as unknown as Post[]} />
        </div>
    )
}