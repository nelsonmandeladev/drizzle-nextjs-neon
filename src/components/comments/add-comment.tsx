"use client";

import React, {useState, useTransition} from 'react';
import {Send, User} from "lucide-react";
import {PostType} from "@/types";
import {createCommentMutation} from "@/db/mutations";
import {isDevelopment} from "@/libs/utils";

interface Props {
    postId: PostType["id"];
    ownerId: PostType["ownerId"];
}
export function AddComment({ postId, ownerId }: Props) {
    const [comment, setComment] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;
        startTransition(async () => {
            const response = await createCommentMutation({
                text: comment,
                postId: postId!,
                ownerId: ownerId!,
            })
        })
    };

    return (

        <form className="mb-8" onSubmit={handleSubmitComment}>
            <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
              <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  rows={3}
                  disabled={isPending || !isDevelopment}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
              />
                    <div className="flex justify-end mt-3">
                        <button
                            type="submit"
                            disabled={!comment.trim() || isPending || !isDevelopment}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isPending ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                            {isPending ? 'Posting...' : 'Post Comment'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}