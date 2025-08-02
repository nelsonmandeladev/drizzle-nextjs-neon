import {getUserDetail} from "@/db/queries/user.query";
import {notFound} from "next/navigation";
import {GetRoleBadge} from "@/components";
import {Calendar, FileText, Mail, MessageCircle} from "lucide-react";
import {formatDate} from "@/libs/utils";
import Link from "next/link";
import {Fragment, Suspense} from "react";
import {AsyncListPosts} from "@/components/posts/async-list-posts";
import {AsyncCommentsList} from "@/components/comments/async-comments-list";

interface UserDetailPageProps {
    params: Promise<{id: string}>;
    searchParams: Promise<{tab: "posts" | "comments"}>;
}

export default async function UserDetailPage(props: UserDetailPageProps) {
    const {id} = await props.params;
    const {tab} = await props.searchParams;

    const user = await getUserDetail(id);

    if (!user) return notFound();


    return (
        <Fragment>
            <div className="border-b border-gray-200">
                <div className="flex items-start gap-6">
                    <div className="relative">
                        <img
                            src={user.avatarUrl!}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-100 shadow-lg"
                        />
                        {user.invitee && (
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {user.firstName} {user.lastName}
                            </h1>
                            <GetRoleBadge role={user.role!} />
                        </div>

                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                            <Mail className="w-4 h-4" />
                            <span>{user.email}</span>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>Joined {formatDate(user.created_at)}</span>
                            </div>
                            {user.invitee && (
                                <span className="text-green-600 font-medium">Invited User</span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 text-center">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-blue-600">{user.posts.length}</div>
                            <div className="text-sm text-blue-800">Posts</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-green-600">{user.comments.length}</div>
                            <div className="text-sm text-green-800">Comments</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        <Link
                            href={`/users/${user.id}?tab=posts`}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                tab === 'posts'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Posts ({user.posts.length})
                            </div>
                        </Link>
                        <Link
                            href={`/users/${user.id}?tab=comments`}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                tab === 'comments'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                Comments ({user.comments.length})
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="py-8">
                {tab === 'posts' ? (
                    <Suspense fallback={<>Loading posts...</>}>
                        <AsyncListPosts ownerId={user.id} />
                    </Suspense>
                ) : (
                    <div>
                        <Suspense fallback={<>Loading comments...</>}>
                            <AsyncCommentsList ownerId={user.id} />
                        </Suspense>
                    </div>
                )}
            </div>
        </Fragment>
    )
}