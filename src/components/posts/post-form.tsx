"use client";

import React, {useState, useEffect, useTransition} from 'react';
import { X, Save, FileText } from 'lucide-react';
import {Post} from "@/types";
import {PlateEditor} from "@/components/editor/plate-editor";
import {createPostMutation, updatePostMutation} from "@/db/mutations/post.mutation";
import {useRouter} from "next/navigation";
import {ValueOf} from "platejs";
import {PlateEditor as PPlate} from "@platejs/core/react";
interface PostFormProps {
    post?: Post | null;
}

export const PostForm: React.FC<PostFormProps> = ({post,}) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        imageUrl: '',
        content: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title,
                body: post.body,
                imageUrl: post.imageUrl,
                content: post.content,
            });
        }
        setErrors({});
    }, [post]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length < 5) {
            newErrors.title = 'Title must be at least 5 characters long';
        }

        if (!formData.body.trim()) {
            newErrors.body = 'Content is required';
        } else if (formData.body.length < 20) {
            newErrors.body = 'Content must be at least 20 characters long';
        }

        if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
            newErrors.imageUrl = 'Please enter a valid URL';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (string: string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        startTransition(async() => {
            const response = post ?
                await updatePostMutation({
                    postId: post.id,
                    title: formData.title,
                    body: formData.body,
                    content: formData.content,
                }) :
                await createPostMutation({
                title: formData.title,
                body: formData.body,
                content: formData.content,
            })
        })
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-6 border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {post ? 'Edit Post' : 'Create New Post'}
                    </h2>
                </div>
            </div>

            {/* Preview */}
            {formData.imageUrl && isValidUrl(formData.imageUrl) && (
                <div className={"mt-4"}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Preview
                    </label>
                    <div className="relative h-90 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="py-6 space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Post Title *
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                            errors.title ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter an engaging title for your post"
                        disabled={isPending}
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Post short description *
                    </label>
                    <textarea
                        value={formData.body}
                        onChange={(e) => handleInputChange('body', e.target.value)}
                        rows={8}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical ${
                            errors.body ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Write your post description here..."
                        disabled={isPending}
                    />
                    {errors.body && (
                        <p className="mt-1 text-sm text-red-600">{errors.body}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                        {formData.body.length} characters (minimum 20 required)
                    </p>
                </div>
                {/* Content */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Post content *
                    </label>

                    <PlateEditor
                        readonly={false}
                        onChange={(editorValue) => {
                            handleInputChange('content', JSON.stringify(editorValue));
                        }}
                        value={post ? JSON.parse(post?.content) as ValueOf<PPlate>: undefined}
                    />
                </div>
                {/* Actions */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        disabled={isPending}
                        onClick={() => router.back()}
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
                        {isPending ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
                    </button>
                </div>
            </form>
        </div>
    );
};