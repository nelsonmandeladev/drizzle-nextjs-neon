import React, {Fragment} from 'react';
import {CommentCard} from "@/components";
import {CommentType} from "@/types";
import {MessageCircle} from "lucide-react";

interface ListCommentsProps {
    comments: CommentType[];
}
export function ListComments({comments}: ListCommentsProps) {
    return (
        <Fragment>
            {comments.length > 0 ? (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment as unknown as CommentType} />
                    ))}
                </div>
            ): (
                <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
                    <p className="text-gray-500">Be the first to share your thoughts!</p>
                </div>
            )}
        </Fragment>
    );
}