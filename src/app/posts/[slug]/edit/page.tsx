import React from 'react';
import {getPostDetailQuery} from "@/db";
import {ArrowLeft, FileText} from "lucide-react";
import Link from "next/link";
import {PostForm} from "@/components";
import {Post} from "@/types";

interface EditPostPageProps {
    params: Promise<{slug: string}>
}


async function EditPostPage(props: EditPostPageProps) {
    const {slug} = await props.params;
    const post = await getPostDetailQuery(slug);

    if (!post) return (
        <div className={"flex justify-center items-center w-full h-[85dvh]"}>
            <div className="w-full max-w-3xl flex flex-col items-center gap-4">
                <FileText size={100} className={"text-red-300"}/>
                <p className="text-base text-slate-500 text-center">The post you are looking for does not exists or has been deleted!</p>
                <Link
                    href={"/posts"}
                    className={"flex items-center gap-2.5 text-blue-500 font-semibold"}
                >
                    <ArrowLeft size={20}/> Back to posts list
                </Link>
            </div>
        </div>
    );

    return (
        <div className="w-full">
            <PostForm
                post={post as unknown as Post}
            />
        </div>
    );
}

export default EditPostPage;