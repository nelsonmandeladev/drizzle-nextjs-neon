import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { postsTable, usersTable } from '@/db/schemas';
import {db} from "./instance";

const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

// Generate realistic avatar URLs using various avatar services
const generateAvatarUrl = (firstName: string, lastName: string): string => {
    const services = [
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
        `https://api.dicebear.com/7.x/personas/svg?seed=${firstName}${lastName}`,
        `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
        `https://robohash.org/${firstName}${lastName}?set=set4`,
        `https://avatar.vercel.sh/${firstName}${lastName}`,
    ];
    return services[Math.floor(Math.random() * services.length)];
};

// Generate realistic post-image URLs using Unsplash with tech-related topics
const generatePostImageUrl = async (title: string) => {
    const topics = [
        'coding',
        'programming',
        'technology',
        'computer',
        'software',
        'developer',
        'web-development',
        'javascript',
        'typescript',
        'react',
        'nodejs',
        'database',
        'api',
        'css',
        'docker',
        'git',
        'testing',
        'cloud',
        'microservices'
    ];

    // Pick a topic based on the title or randomly
    let selectedTopic = 'technology';
    const lowerTitle = title.toLowerCase();

    for (const topic of topics) {
        if (lowerTitle.includes(topic.replace('-', ' ')) || lowerTitle.includes(topic)) {
            selectedTopic = topic;
            break;
        }
    }

    if (accessKey) {
        const res = await fetch(
            `https://api.unsplash.com/photos/random?client_id=${accessKey}&query=${encodeURIComponent(selectedTopic)}&orientation=landscape`
        );
        if (res.ok) {
            const data = await res.json();
            return data.urls.regular;
        }
    }
};

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