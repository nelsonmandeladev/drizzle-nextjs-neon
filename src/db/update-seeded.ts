import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { postsTable, usersTable } from '@/db/schemas';
import {db} from "./instance";
import {generateAvatarUrl, generatePostImageUrl} from "@/libs/utils";

async function updateExistingData() {
    console.log('🔄 Starting update of existing seeded data...');

    try {
        // Fetch all existing users
        console.log('👥 Fetching existing users...');
        const existingUsers = await db.select().from(usersTable);
        console.log(`📊 Found ${existingUsers.length} users to update`);

        // Update users with avatar URLs
        console.log('🖼️ Updating user avatar URLs...');
        for (const user of existingUsers) {
            const avatarUrl = generateAvatarUrl(user.firstName, user.lastName || '');

            await db.update(usersTable)
                .set({
                    avatarUrl: avatarUrl,
                    updated_at: new Date()
                })
                .where(eq(usersTable.id, user.id));

            console.log(`   ✅ Updated avatar for ${user.firstName} ${user.lastName}: ${avatarUrl}`);
        }

        // Fetch all existing posts
        console.log('📝 Fetching existing posts...');
        const existingPosts = await db.select().from(postsTable);
        console.log(`📊 Found ${existingPosts.length} posts to update`);

        // Update posts with image URLs
        console.log('🖼️ Updating post image URLs...');
        for (const post of existingPosts) {
            const imageUrl = await generatePostImageUrl(post.title);

            await db.update(postsTable)
                .set({
                    imageUrl: imageUrl,
                    updated_at: new Date()
                })
                .where(eq(postsTable.id, post.id));

            console.log(`   ✅ Updated image for "${post.title}": ${imageUrl}`);
        }

        console.log('🎉 Successfully updated all existing data!');
        console.log(`📊 Summary:`);
        console.log(`   - Users updated with avatars: ${existingUsers.length}`);
        console.log(`   - Posts updated with images: ${existingPosts.length}`);

    } catch (error) {
        console.error('❌ Error during update:', error);
        throw error;
    }
}

async function main() {
    await updateExistingData();
}

main()
    .then(() => console.log('✨ Update process completed successfully!'))
    .catch(err => {
        console.error('💥 Update failed:', err);
        process.exit(1);
    });