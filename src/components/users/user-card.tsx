"use client";

import React from 'react';
import {Calendar, MessageCircle, FileText, Crown, User as UserIcon, Shield, ArrowRight} from 'lucide-react';
import {User} from "@/types";
import Link from "next/link";

interface UserCardProps {
    user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getRoleBadge = (role: string) => {
        const baseClasses = "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors";

        switch (role) {
            case 'admin':
                return (
                    <span className={`${baseClasses} bg-red-100 text-red-800 border border-red-200`}>
            <Crown className="w-3 h-3" />
            Admin
          </span>
                );
            case 'user':
                return (
                    <span className={`${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`}>
            <UserIcon className="w-3 h-3" />
            User
          </span>
                );
            case 'guest':
                return (
                    <span className={`${baseClasses} bg-gray-100 text-gray-600 border border-gray-200`}>
            <Shield className="w-3 h-3" />
            Guest
          </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-200 group">
            {/* Header with Avatar and Role */}
            <Link
                href={`/users/${user.id}`}
                className="flex items-start justify-between mb-4"
            >
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="size-14 rounded-full object-cover overflow-hidden ring-2 ring-gray-100 group-hover:ring-blue-300 group-hover:scale-105 transition-all duration-300 shadow-sm">
                            <img
                                src={user.avatarUrl}
                                alt={`${user.firstName} ${user.lastName}`}
                                className="w-full f-full aspect-auto object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=6366f1&color=ffffff&size=128`;
                                }}
                            />
                        </div>
                        {user.invitee && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                        )}
                    </div>
                    <div className="w-full">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 group-hover:underline transition-colors truncate">
                            {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm text-gray-500 text-nowrap truncate">{user.email}</p>
                    </div>
                </div>
                {/*{getRoleBadge(user.role)}*/}
            </Link>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <Link
                    href={`/users/${user.id}?tab=posts`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-500"
                >
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{user.posts.length}</span>
                    <span>Posts</span>
                    <ArrowRight size={15} className="opacity-0 transition-all duration-300 group-hover:opacity-100" />
                </Link>
                <Link
                    href={`/users/${user.id}?tab=comments`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-500"
                >
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">{user.comments.length}</span>
                    <span>Comments</span>
                    <ArrowRight size={15} className="opacity-0 transition-all duration-300 group-hover:opacity-100" />
                </Link>
            </div>

            {/* Join Date */}
            <div className="flex items-center gap-2 text-xs text-gray-500 pt-3 border-t border-gray-50">
                <Calendar className="w-3 h-3" />
                <span>Joined {formatDate(user.created_at)}</span>
                {user.invitee && (
                    <span className="ml-auto text-green-600 font-medium">Invited</span>
                )}
            </div>
        </div>
    );
};