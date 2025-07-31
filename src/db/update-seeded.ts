import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { usersTable } from '@/db/schemas/users';
import { postsTable } from '@/db/schemas/post';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

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

// Generate realistic post image URLs using Unsplash with tech-related topics
const generatePostImageUrl = (title: string): string => {
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

    const imageId = Math.floor(Math.random() * 1000) + 1;
    return `https://images.unsplash.com/photo-1${imageId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80&${selectedTopic}`;
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
            const imageUrl = generatePostImageUrl(post.title);

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