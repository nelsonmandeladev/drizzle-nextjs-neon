"use server";

import {RoleType} from "@/types";
import {db} from "@/db/instance";
import {usersTable} from "@/db/schemas/users/table";
import {generateAvatarUrl} from "@/libs/utils";
import {revalidatePath} from "next/cache";
import {eq} from "drizzle-orm";
import {redirect} from "next/navigation";

export async function createUserMutation({
    firstName,
    lastName,
    email,
    role
}: {
    firstName: string,
    lastName: string,
    email: string,
    role: RoleType,
}) {
    const user = await db.insert(usersTable).values({
        firstName,
        lastName,
        email,
        avatarUrl: generateAvatarUrl(firstName, lastName),
        role
    }).returning();

    if (user) {
        revalidatePath("/users")
    }
    return user;
}

export async function updateUserMutation({
     firstName,
     lastName,
     email,
     role,
    userId,
 }: {
    firstName: string,
    lastName: string,
    email: string,
    role: RoleType,
    userId: string,
}) {
    const user = await db.update(usersTable)
        .set({
            firstName,
            lastName,
            email,
            role
        })
        .where(eq(usersTable.id, userId))
        .returning();
    if (user) {
        revalidatePath(`/users/${userId}`);
    }
    return user;
}

export async function deleteUserMutation(userId: string) {
    const user = await db.update(usersTable)
        .set({
            deleted_at: new Date(),
        })
        .where(eq(usersTable.id, userId))
        .returning();
    if (user) {
        revalidatePath(`/users/${userId}`);
        redirect("/users");
    }
    return user;
}