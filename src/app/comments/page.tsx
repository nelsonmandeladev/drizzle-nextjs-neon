import React from 'react';
import {listCommentsQuery} from "@/db/queries/comments.query";
import {ListComments} from "@/components";
import {CommentType} from "@/types";

async function CommentsPage() {

    const comments = await listCommentsQuery(50);
    return (
        <ListComments comments={comments as unknown as CommentType[]} />
    );
}

export default CommentsPage;