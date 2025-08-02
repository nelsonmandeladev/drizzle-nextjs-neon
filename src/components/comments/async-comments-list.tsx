import React from 'react';
import {listCommentsQuery} from "@/db";
import {ListComments} from "./list-comments";
import {CommentType} from "@/types";

interface Props {
    ownerId?: string;
    postId?: string;
}
export async function AsyncCommentsList({ownerId, postId}: Props) {
    const ownerComments = await listCommentsQuery(20, postId, ownerId);

    return <ListComments comments={ownerComments as unknown as CommentType[]} />
}