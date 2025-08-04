import React from 'react';
import {PostForm} from "@/components";
import {isDevelopment} from "@/libs/utils";
import {redirect} from "next/navigation";


function NewPostPage() {

    if (!isDevelopment) {
       redirect("/posts");
    }

    return (
        <div className="w-full">
           <PostForm />
        </div>
    );
}

export default NewPostPage;