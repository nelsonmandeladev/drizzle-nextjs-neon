import {listPostsQuery, listUserQuery} from "@/db";
import {PostCard, UserCard} from "@/components";
import {Post, User} from "@/types";
import {ArrowRight, FileText, Users} from "lucide-react";
import React from "react";
import Link from "next/link";

export default async function HomePage() {

  const users = await listUserQuery(6);
  const posts = await listPostsQuery(6);

  return (
      <div className="space-y-10">
          <div className="w-full space-y-5">
              <div className="flex justify-between items-center gap-2.5">
                  <h4 className="text-xl text-gray-500 font-semibold">Recent users list</h4>
                  <Link
                      href={'/users'}
                      className="flex justify-center items-center gap-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                      View all users <ArrowRight size={20} />
                  </Link>
              </div>
              {/* Users Grid */}
              {users.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {users.map((user) => (
                          <UserCard key={user.id} user={user as unknown as User} />
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                      <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
              )}
          </div>
          <div className="w-full space-y-5">
              <div className="flex justify-between items-center gap-2.5">
                  <h4 className="text-xl text-gray-500 font-semibold">Recent posts list</h4>
                  <Link
                      href={'/posts'}
                      className="flex justify-center items-center gap-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                      View all posts <ArrowRight size={20} />
                  </Link>
              </div>
              {/* Users Grid */}
              {posts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {posts.map((post) => (
                          <PostCard key={post.id} post={post as unknown as Post} />
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                      <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                  </div>
              )}
          </div>
      </div>
  );
}
