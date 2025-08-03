import React, {Suspense} from 'react';
import {getPostDetailQuery} from "@/db/queries/posts.query";
import {notFound} from "next/navigation";
import {ArrowDown, Calendar, Clock, MessageCircle} from "lucide-react";
import {formatDate, getReadingTime} from "@/libs/utils";
import {AddComment} from "@/components";
import Link from "next/link";
import {AsyncCommentsList} from "@/components/comments/async-comments-list";

interface PostDetailPageProps {
    params: Promise<{slug: string}>
}
async function PostDetailPage(props: PostDetailPageProps) {
    const {slug} = await props.params;
    const post = await getPostDetailQuery(slug);

    if (!post) return notFound();

    return (
        <div className="max-w-4xl mx-auto">
            <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                {/* Post Image */}
                <div className="relative h-64 md:h-80">
                    <img
                        src={post.imageUrl!}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Post Header */}
                <div className="p-4 md:p-6  xl:p-8">
                    <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Author and Meta Info */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-gray-100">
                        {post.owner && (
                            <div className="flex items-center gap-4">
                                <img
                                    src={post?.owner?.avatarUrl || "/user/avatar.png"}
                                    alt={`${post.owner.firstName} ${post.owner.lastName}`}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                                />
                                <Link
                                    href={`/users/${post.owner.id}`}
                                >
                                    <p className="font-medium text-gray-900 group-hover:underline group-hover:text-blue-500">
                                        {post.owner.firstName} {post.owner.lastName}
                                    </p>
                                    <p className="text-sm text-gray-500">{post.owner.email}</p>
                                </Link>
                            </div>
                        )}

                        <div className="flex flex-wrap items-start md:items-center gap-6 text-sm text-gray-500 mt-5 md:mt-0">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(post.created_at)}</span>
                            </div>
                            {post.body && (
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{getReadingTime(post.body)} min read</span>
                                </div>
                            )}
                            <Link
                                href={`/posts/${post.slug}/#comments`}
                                className="flex items-center gap-1 group-hover:text-blue-500 transition-all duration-300"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>{post.comments.length} comments</span>
                                <ArrowDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            </Link>
                        </div>
                    </div>

                    {/* Post Body */}
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed text-base">
                            {post.body}
                        </p>
                    </div>
                </div>
            </article>

            <div className="mt-12" id={"comments"}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6  xl:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <MessageCircle className="w-6 h-6 text-blue-600" />
                        Comments ({post.comments.length})
                    </h2>
                    <AddComment postId={post.id} ownerId={post.ownerId} />
                    <Suspense fallback={<>Loading comments...</>}>
                        <AsyncCommentsList postId={post.id} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default PostDetailPage;