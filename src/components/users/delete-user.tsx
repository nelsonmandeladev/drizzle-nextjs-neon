"use client";

import React, {useTransition} from 'react';
import {User} from "@/types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {deleteUserMutation} from "@/db/mutations";
import {isDevelopment} from "@/libs/utils";

interface DeleteUserProps {
    user: User
}

export function DeleteUser({user}: DeleteUserProps) {
    const [open, setOpen] = React.useState(false);
    const [isPending, startTransition] = useTransition();

    function handleDeleteUser() {
        startTransition(async () => {
           const response = await deleteUserMutation(user.id);
           if (response) {
               setOpen(false);
           }
        });
    }

    return (
        <AlertDialog open={open} onOpenChange={(open) => setOpen(open)}>
            <AlertDialogTrigger  asChild>
                <Button disabled={!isDevelopment} variant="outline" size={"lg"} className={"w-full border-destructive text-destructive"}>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to delete <span className={"text-destructive"}>{user.firstName} {user.lastName}, </span>this action cannot be undone. This will permanently delete the user
                        account and remove the data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isPending}
                        className={"bg-blue-500"}
                        onClick={(event) => {
                            event.preventDefault();
                            handleDeleteUser()
                        }}
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}