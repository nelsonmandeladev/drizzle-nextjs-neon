"use server"

import {db} from "@/db/instance";
import {commentsTable} from "@/db/schemas/comments/table";
import {revalidatePath} from "next/cache";

export async function createCommentMutation({text, postId, ownerId}: {text: string, postId: string, ownerId: string}) {
    const comment = await db.insert(commentsTable).values({text, postId, ownerId}).returning();
    if (comment) {
        revalidatePath(`/posts/${postId}`)
    }
    return comment;
}