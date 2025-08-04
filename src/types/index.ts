import {InferInsertModel} from "drizzle-orm";
import {commentsTable, postsTable, usersTable} from "@/db/schemas";


export type RoleType = 'admin' | 'user' | 'guest';
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    invitee: string | null;
    role: RoleType;
    avatarUrl: string;
    updated_at: Date;
    created_at: Date;
    deleted_at: Date | null;
    posts: Array<{ id: string }>;
    comments: Array<{ id: string }>;
}

export interface Post {
    id: string;
    slug: string;
    title: string;
    body: string;
    content: string;
    ownerId: string;
    imageUrl: string;
    updated_at: Date;
    created_at: Date;
    deleted_at: Date | null;
    comments: Array<{ id: string }>;
    owner: User;
}

export type UserType = InferInsertModel<typeof usersTable>;
export type PostType = InferInsertModel<typeof postsTable>;
export type CommentType = InferInsertModel<typeof commentsTable> & {
    owner: UserType;
    post: PostType;
};