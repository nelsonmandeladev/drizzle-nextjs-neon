"use client";

import {Post} from "@/types";
import {ArrowRight, Calendar, Clock, MessageCircle} from "lucide-react";
import Link from "next/link";
import React from "react";
import {formatDate, getReadingTime} from "@/libs/utils";

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    return (
        <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
            {/* Post Image */}
            <div className="relative overflow-hidden">
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80`;
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Post Content */}
            <div className="p-6">
                {/* Title */}
                <Link
                    href={`/posts/${post.slug}`}
                    className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 group-hover:underline transition-colors duration-200 line-clamp-2"
                >
                    {post.title}
                </Link>

                {/* Body Preview */}
                <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                    {truncateText(post.body, 118)}
                </p>

                {/* Author Info */}
                {post.owner && (
                    <Link href={`/users/${post.owner.id}?tab=posts`} className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
                        <div className="relative">
                            <img
                                src={post.owner.avatarUrl}
                                alt={`${post.owner.firstName} ${post.owner.lastName}`}
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-300 transition-all duration-300"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://ui-avatars.com/api/?name=${post.owner.firstName}+${post.owner.lastName}&background=6366f1&color=ffffff&size=128`;
                                }}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate group-hover:underline">
                                {post.owner.firstName} {post.owner.lastName}
                            </p>
                            <p className="text-xs text-gray-500 truncate group-hover:underline">
                                {post.owner.email}
                            </p>
                        </div>
                    </Link>
                )}

                {/* Post Meta */}
                <div className="flex flex-wrap gap-2.5 items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className={"text-nowrap"}>{formatDate(post.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className={"text-nowrap"}>{getReadingTime(post.body)} min read</span>
                    </div>
                    <Link href={`/posts/${post.slug}#comments`} className="flex items-center gap-1 text-blue-600">
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-medium">{post.comments.length}</span>
                        <span>Comments</span>
                        <ArrowRight size={15} className="opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    </Link>
                </div>
            </div>

            {/* Hover Action */}
            <div className="px-6 pb-6 w-full flex">
                <Link href={`/posts/${post.slug}`} className="w-full text-center bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium group-hover:shadow-sm">
                    Read More
                </Link>
            </div>
        </article>
    )
}