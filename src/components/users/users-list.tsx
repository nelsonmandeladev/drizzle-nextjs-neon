"use client";

import React, { useState, useMemo } from 'react';
import { User } from '@/types';
import {Search, Filter, Users, Plus} from 'lucide-react';
import {UserCard} from "@/components";
import Link from "next/link";

interface UsersListProps {
    users: User[];
}

export const UsersList: React.FC<UsersListProps> = ({ users }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState<'all' | 'admin' | 'user' | 'guest'>('all');

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch =
                user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesRole = selectedRole === 'all' || user.role === selectedRole;

            return matchesSearch && matchesRole;
        });
    }, [users, searchTerm, selectedRole]);

    return (
        <div className="min-h-screen">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Role Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value as 'all' | 'admin' | 'user' | 'guest')}
                            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white min-w-[140px]"
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="guest">Guest</option>
                        </select>
                    </div>
                </div>

                {/* Results count */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center gap-2.5">
                    <p className="text-sm text-gray-600">
                        Showing <span className="font-medium">{filteredUsers.length}</span> of{' '}
                        <span className="font-medium">{users.length}</span> users
                    </p>
                    <Link href={"/users/new"} className={"flex items-center gap-2.5 text-sm bg-blue-500 hover:bg-blue-700 transition-all duration-150 text-white rounded px-4 py-2"}>
                        <span className={"hidden md:block"}>Add new user</span> <Plus size={20} />
                    </Link>
                </div>
            </div>

            {/* Users Grid */}
            {filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => (
                        <UserCard key={user.id} user={user} />
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
    );
};