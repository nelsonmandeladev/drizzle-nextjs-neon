"use client";

import React from 'react';
import {Users, FileText, Home, MessageCircle} from 'lucide-react';
import Link from "next/link";
import {usePathname} from "next/navigation";

export function Navigation(){
    const navItems = [
        {
            id: '/' as const,
            label: 'Home',
            icon: Home,
            description: 'View your home page',
        },
        {
            id: '/users' as const,
            label: 'Users',
            icon: Users,
            description: 'View all users'
        },
        {
            id: '/posts' as const,
            label: 'Posts',
            icon: FileText,
            description: 'Browse blog posts'
        },
        {
            id: '/comments' as const,
            label: 'Comments',
            icon: MessageCircle,
            description: 'Browse all comments'
        }
    ];

    const currentPage = usePathname();

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-[200] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center gap-2.5 md:gap-3">
                        <div className="size-7 md:size-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Home className="size-4 md:size-6 text-white" />
                        </div>
                        <div className={"hidden sm:block"}>
                            <h1 className="text-sm md:text-xl font-bold text-gray-900">DASH-CMS</h1>
                            <p className="text-xs text-gray-500">Content Management System</p>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex items-center space-x-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                           const isActive = currentPage === item.id || currentPage.startsWith(item.id + '/');

                            return (
                                <Link
                                    href={item.id}
                                    key={item.id}
                                    className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive
                                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }
                  `}
                                    title={item.description}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="hidden sm:inline">{item.label}</span>
                                    {isActive && (
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* User Menu Placeholder */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-gray-600" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};