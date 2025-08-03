"use client";

import React, {useState, useEffect, useTransition} from 'react';
import {Save} from 'lucide-react';
import {RoleType, User} from "@/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {createUserMutation, updateUserMutation} from "@/db/mutations";
import {isDevelopment} from "@/libs/utils";

interface UserFormProps {
    user?: User | null;
}

export const UserForm: React.FC<UserFormProps> = ({user}) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: 'user' as RoleType,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isPending, startTransition] = useTransition();
    const [isOpen, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            });
        }
        setErrors({});
    }, [user]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        startTransition(async () => {
            const response =  user ?
                await  updateUserMutation({
                    userId: user.id,
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    role: formData.role,
                }):
                await createUserMutation({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                role: formData.role,
            });

            if (response) {
                setOpen(false);
            }
        })
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger asChild>
                <Button disabled={!isDevelopment} size={"lg"} className={"bg-blue-500 w-full"} >
                    {user ? "Update": "Create new"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>User form</DialogTitle>
                    <DialogDescription>
                        Use this form to create or update a user info
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                        </label>
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                errors.firstName ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Enter first name"
                            disabled={isPending}
                        />
                        {errors.firstName && (
                            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                        </label>
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                errors.lastName ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Enter last name"
                            disabled={isPending}
                        />
                        {errors.lastName && (
                            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                                errors.email ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="Enter email address"
                            disabled={isPending}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                        </label>
                        <select
                            value={formData.role}
                            onChange={(e) => handleInputChange('role', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            disabled={isPending}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="guest">Guest</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setOpen(!isOpen)}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            disabled={isPending}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            {isPending ? 'Saving...' : (user ? 'Update User' : 'Create User')}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};