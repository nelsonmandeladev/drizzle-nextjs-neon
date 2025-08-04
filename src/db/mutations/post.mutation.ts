"use server";

import {db} from "@/db/instance";
import {postsTable} from "@/db";
import {generatePostImageUrl, generateUniqueString} from "@/libs/utils";
import {redirect} from "next/navigation";
import {eq} from "drizzle-orm";

export async function createPostMutation({
    title,
    content,
    body,
}:{
    title:string,
    body:string,
    content?:string,
}) {
    const post = await db.insert(postsTable).values({
        title,
        content,
        body,
        imageUrl: await generatePostImageUrl(title),
        slug: generateUniqueString(24),
        // This owner id is just for testing purpose, in a real world app, you will have to update this with the connected userId
        ownerId: "bd0e0c06-4190-4ae7-a64f-e343ef930b58"
    }).returning();

    if (post) {
        redirect(`/posts/${post[0].slug}`)
    }
    return post[0];
}


export async function updatePostMutation({
    postId,
    title,
    content,
    body,
}:{
    postId:string;
    title:string,
    body:string,
    content?:string,
}) {
    const post = await db.update(postsTable).set({
        title,
        content,
        body
    }).where(eq(postsTable.id, postId)).returning();
    if (post) {
        redirect(`/posts/${post[0].slug}`)
    }
    return post[0];
}


export async function deletePostMutation(postId: string) {
    const post = await db.update(postsTable)
        .set({
            deleted_at: new Date(),
        })
        .where(eq(postsTable.id, postId))
        .returning();
    if (post) {
        redirect("/posts");
    }
    return post[0];
}