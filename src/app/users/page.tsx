import {listUserQuery} from "@/db";
import {UsersList} from "@/components";
import {User} from "@/types";

export default async function UsersPage() {
    const users = await listUserQuery();
    return (
        <div className="w-full">
            <UsersList users={users as unknown as User[]} />
        </div>
    );
}