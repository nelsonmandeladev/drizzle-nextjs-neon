import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {usersTable} from "@/db/schemas/users";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

async function main() {
    const user: typeof usersTable.$inferInsert = {
        firstName: 'Sonfack',
        lastName: 'Mandela Mandela',
        email: "sn_mandela@gmail.com",
        role: "admin",
        invitee: 30,
    }

    await db.insert(usersTable).values(user);
    console.log('New user created!')
}
main().then(r => console.log(r));
