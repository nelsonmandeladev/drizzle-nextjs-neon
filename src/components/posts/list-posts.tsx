"use client";

import React, {useMemo, useState} from 'react';
import {FileText, Filter, Plus, Search} from 'lucide-react';
import {PostCard} from "@/components";
import {Post} from "@/types";
import Link from "next/link";

interface PostsListProps {
    posts: Post[];
}

export function ListPosts({posts}: PostsListProps) {

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'most-comments'>('newest');

    const filteredAndSortedPosts = useMemo(() => {
        const filtered = posts.filter(post => {
            return post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
                `${post.owner.firstName} ${post.owner.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
        });

        // Sort posts
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                case 'oldest':
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                case 'most-comments':
                    return b.comments.length - a.comments.length;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [posts, searchTerm, sortBy]);


    return (
        <div className="min-h-screen">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search posts by title, content, or author..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Sort Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'most-comments')}
                            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white min-w-[160px]"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="most-comments">Most Comments</option>
                        </select>
                    </div>
                </div>

                {/* Results count */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center gap-2.5">
                    <p className="text-sm text-gray-600">
                        Showing <span className="font-medium">{filteredAndSortedPosts.length}</span> of{' '}
                        <span className="font-medium">{posts.length}</span> posts
                    </p>
                    <Link href={"/posts/new"} className={"flex items-center gap-2.5 text-sm bg-blue-500 hover:bg-blue-700 transition-all duration-150 text-white rounded px-4 py-2"}>
                        <span className={"hidden md:block"}>Add new post</span> <Plus size={20} />
                    </Link>
                </div>
            </div>

            {/* Posts Grid */}
            {filteredAndSortedPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
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
    )
}