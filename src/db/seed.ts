import 'dotenv/config';
import { usersTable, postsTable, commentsTable } from '@/db';
import {eq} from "drizzle-orm";
import {db} from "./instance";
import {generateUniqueString} from "@/libs/utils";

// Helper function to get random date within the last year
function getRandomDate(): Date {
    const start = new Date();
    start.setFullYear(start.getFullYear() - 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
    console.log('🌱 Starting database seeding...');

    try {
        // Seed Users
        console.log('👥 Seeding users...');
        const users = await db.insert(usersTable).values([
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                role: 'admin',
                invitee: null,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@example.com',
                role: 'user',
                invitee: null,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                firstName: 'Bob',
                lastName: 'Johnson',
                email: 'bob.johnson@example.com',
                role: 'user',
                invitee: null,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                firstName: 'Alice',
                lastName: 'Williams',
                email: 'alice.williams@example.com',
                role: 'user',
                invitee: null,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                firstName: 'Charlie',
                lastName: 'Brown',
                email: 'charlie.brown@example.com',
                role: 'guest',
                invitee: null,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                firstName: 'Diana',
                lastName: 'Davis',
                email: 'diana.davis@example.com',
                role: 'user',
                invitee: null,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                firstName: 'Eve',
                lastName: 'Miller',
                email: 'eve.miller@example.com',
                role: 'user',
                invitee: null,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                firstName: 'Frank',
                lastName: 'Wilson',
                email: 'frank.wilson@example.com',
                role: 'guest',
                invitee: null,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                firstName: 'Grace',
                lastName: 'Moore',
                email: 'grace.moore@example.com',
                role: 'user',
                invitee: null,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                firstName: 'Henry',
                lastName: 'Taylor',
                email: 'henry.taylor@example.com',
                role: 'user',
                invitee: null,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                firstName: 'Isabella',
                lastName: 'Anderson',
                email: 'isabella.anderson@example.com',
                role: 'user',
                invitee: null,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                firstName: 'Jack',
                lastName: 'Thomas',
                email: 'jack.thomas@example.com',
                role: 'guest',
                invitee: null,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            }
        ]).returning();

        console.log(`✅ Successfully created ${users.length} users`);

        // Update some users to have invitees (self-referencing)
        console.log('🔗 Setting up user invitee relationships...');
        if (users.length >= 4) {
            await db.update(usersTable)
                .set({ invitee: users[0].id, updated_at: new Date() })
                .where(eq(usersTable.id, users[2].id));

            await db.update(usersTable)
                .set({ invitee: users[1].id, updated_at: new Date() })
                .where(eq(usersTable.id, users[3].id));

            await db.update(usersTable)
                .set({ invitee: users[0].id, updated_at: new Date() })
                .where(eq(usersTable.id, users[4].id));
        }
        console.log('✅ User invitee relationships established');

        // Seed Posts
        console.log('📝 Seeding posts...');
        const posts = await db.insert(postsTable).values([
            {
                slug: generateUniqueString(16),
                title: 'Getting Started with TypeScript',
                body: 'TypeScript is a powerful superset of JavaScript that adds static typing. In this post, we\'ll explore the basics of TypeScript and how it can improve your development workflow.',
                ownerId: users[0].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                slug: generateUniqueString(16),
                title: 'The Future of Web Development',
                body: 'Web development is constantly evolving. From new frameworks to emerging technologies, let\'s discuss what the future holds for web developers.',
                ownerId: users[1].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                slug: generateUniqueString(16),
                title: 'Database Design Best Practices',
                body: 'Designing efficient and scalable databases is crucial for any application. Here are some best practices to follow when designing your database schema.',
                ownerId: users[2].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                slug: generateUniqueString(16),
                title: 'Introduction to React Hooks',
                body: 'React Hooks have revolutionized how we write React components. Let\'s dive into useState, useEffect, and other essential hooks.',
                ownerId: users[3].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                slug: generateUniqueString(16),
                title: 'API Security Fundamentals',
                body: 'Securing your APIs is more important than ever. Learn about authentication, authorization, rate limiting, and other security measures.',
                ownerId: users[4].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                slug: generateUniqueString(16),
                title: 'Modern CSS Techniques',
                body: 'CSS has come a long way. Explore modern techniques like Grid, Flexbox, custom properties, and container queries.',
                ownerId: users[5].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                slug: generateUniqueString(16),
                title: 'Node.js Performance Optimization',
                body: 'Learn how to optimize your Node.js applications for better performance. We\'ll cover profiling, memory management, and scaling strategies.',
                ownerId: users[6].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                slug: generateUniqueString(16),
                title: 'Understanding Docker Containers',
                body: 'Containerization has changed how we deploy applications. Get started with Docker and learn about images, containers, and orchestration.',
                ownerId: users[7].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                slug: generateUniqueString(16),
                title: 'Git Workflow Strategies',
                body: 'Effective Git workflows are essential for team collaboration. Compare different strategies like Git Flow, GitHub Flow, and GitLab Flow.',
                ownerId: users[8].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                slug: generateUniqueString(16),
                title: 'Testing JavaScript Applications',
                body: 'Testing is crucial for maintaining code quality. Learn about unit testing, integration testing, and end-to-end testing in JavaScript.',
                ownerId: users[9].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                slug: generateUniqueString(16),
                title: 'Cloud Computing Basics',
                body: 'Cloud computing has transformed the tech industry. Understand the basics of IaaS, PaaS, SaaS, and major cloud providers.',
                ownerId: users[10].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                slug: generateUniqueString(16),
                title: 'Microservices Architecture',
                body: 'Microservices offer scalability and flexibility but come with complexity. Learn when and how to implement microservices architecture.',
                ownerId: users[11].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            }
        ]).returning();

        console.log(`✅ Successfully created ${posts.length} posts`);

        // Seed Comments
        console.log('💬 Seeding comments...');
        const comments = await db.insert(commentsTable).values([
            // Comments for first post
            {
                text: 'Great introduction to TypeScript! Really helpful for beginners.',
                postId: posts[0].id,
                ownerId: users[1].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                text: 'I agree, TypeScript has really improved my code quality.',
                postId: posts[0].id,
                ownerId: users[2].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                text: 'Any recommendations for learning resources?',
                postId: posts[0].id,
                ownerId: users[3].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },

            // Comments for second post
            {
                text: 'The web development landscape is changing so fast!',
                postId: posts[1].id,
                ownerId: users[0].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                text: 'I think WebAssembly will be huge in the coming years.',
                postId: posts[1].id,
                ownerId: users[4].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                text: 'What about AI integration in web development?',
                postId: posts[1].id,
                ownerId: users[5].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },

            // Comments for third post
            {
                text: 'Database normalization is so important!',
                postId: posts[2].id,
                ownerId: users[6].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                text: 'Have you tried using database migrations?',
                postId: posts[2].id,
                ownerId: users[7].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },

            // Comments for fourth post
            {
                text: 'useEffect hook was a game changer for me.',
                postId: posts[3].id,
                ownerId: users[8].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                text: 'Custom hooks are incredibly powerful!',
                postId: posts[3].id,
                ownerId: users[9].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                text: 'Great explanation of the dependency array.',
                postId: posts[3].id,
                ownerId: users[10].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },

            // Comments for fifth post
            {
                text: 'Security should always be a priority.',
                postId: posts[4].id,
                ownerId: users[11].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                text: 'JWT tokens vs sessions - which do you prefer?',
                postId: posts[4].id,
                ownerId: users[0].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },

            // Comments for sixth post
            {
                text: 'CSS Grid changed everything for me!',
                postId: posts[5].id,
                ownerId: users[1].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                text: 'Container queries are finally here!',
                postId: posts[5].id,
                ownerId: users[2].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },

            // Comments for remaining posts
            {
                text: 'Performance optimization is crucial for Node.js apps.',
                postId: posts[6].id,
                ownerId: users[3].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                text: 'Docker has simplified deployment so much.',
                postId: posts[7].id,
                ownerId: users[4].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                text: 'Git Flow vs GitHub Flow - interesting comparison!',
                postId: posts[8].id,
                ownerId: users[5].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                text: 'Testing is often overlooked but so important.',
                postId: posts[9].id,
                ownerId: users[6].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                text: 'Cloud computing has revolutionized everything.',
                postId: posts[10].id,
                ownerId: users[7].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            },
            {
                text: 'Microservices can be complex but worth it.',
                postId: posts[11].id,
                ownerId: users[8].id,
                created_at: getRandomDate(),
                updated_at: getRandomDate()
            }
        ]).returning();

        console.log(`✅ Successfully created ${comments.length} comments`);

        console.log('🎉 Database seeding completed successfully!');
        console.log(`📊 Summary:`);
        console.log(`   - Users: ${users.length}`);
        console.log(`   - Posts: ${posts.length}`);
        console.log(`   - Comments: ${comments.length}`);

    } catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
}

main().then(r => console.log('✨ Seeding process finished')).catch(err => {
    console.error('💥 Seeding failed:', err);
    process.exit(1);
});