import React, {Fragment} from 'react';
import {CommentType} from "@/types";
import {getRelativeTime} from "@/libs/utils";
import Link from "next/link";
import {ArrowRight} from "lucide-react";

interface CommentCardProps {
    comment: CommentType;
}

export function CommentCard({comment}: CommentCardProps) {
    return (

        <div key={comment.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg group">
            {comment.owner && (
                <img
                    src={comment.owner.avatarUrl!}
                    alt={`${comment.owner.firstName} ${comment.owner.lastName}`}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
            )}
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                    {comment.owner && (
                        <Fragment>
                            <Link
                                href={`/users/${comment.owner.id}?tab=comments#${comment.id}`}
                                className="font-medium text-gray-900 group-hover:underline group-hover:text-blue-500 transition-all duration-300"
                            >
                                {comment.owner.firstName} {comment.owner.lastName}
                            </Link>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            {comment.owner.role}
                            </span>
                            <span className="text-gray-500">•</span>
                        </Fragment>
                    )}
                    <span className="text-sm text-gray-500">
                      {getRelativeTime(comment.created_at!)}
                    </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{comment.text}</p>
                {comment.post && (
                    <div className="bg-white p-2.5 px-5 rounded mt-4">
                        <Link
                            href={`/posts/${comment.post.slug}`}
                            className="w-full text-sm text-gray-400 space-y-2.5"
                        >
                            <p  className={"flex items-center justify-between gap-2.5 group-hover:text-blue-500 transition duration-300"}>
                                {comment.post.title}
                                <ArrowRight size={16} className={"opacity-0 group-hover:opacity-100 transition duration-300"} />
                            </p>
                            <p className="text-xs">
                                {comment.post.body}
                            </p>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}