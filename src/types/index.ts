export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    invitee: string | null;
    role: 'admin' | 'user' | 'guest';
    avatarUrl: string;
    updated_at: string;
    created_at: string;
    deleted_at: string | null;
    posts: Array<{ id: string }>;
    comments: Array<{ id: string }>;
}

export interface Post {
    id: string;
    slug: string;
    title: string;
    body: string;
    ownerId: string;
    imageUrl: string;
    updated_at: string;
    created_at: string;
    deleted_at: string | null;
    comments: Array<{ id: string }>;
    owner: User;
}