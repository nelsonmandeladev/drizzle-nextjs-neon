import React from 'react';
import {listPostsQuery} from "@/db";
import {PostCard} from "@/components";
import {FileText} from "lucide-react";
import {Post} from "@/types";

interface Props {
    ownerId: string
}

export async function AsyncListPosts({ownerId}: Props) {
    const ownerPosts = await listPostsQuery(12, ownerId);

    return (
        <div className="w-full">
            {ownerPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ownerPosts.map((post) => (
                        <PostCard key={post.id} post={post as unknown as Post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria</p>
                </div>
            )}
        </div>
    );
}