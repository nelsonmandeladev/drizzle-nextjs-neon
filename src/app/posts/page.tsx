import {listPostsQuery} from "@/db";
import {ListPosts} from "@/components";
import {Post} from "@/types";

export default async function PostsPage() {
    const posts = await listPostsQuery();
    console.log({posts});

    return(
        <div className="w-full">
            <ListPosts posts={posts as unknown as Post[]} />
        </div>
    )
}