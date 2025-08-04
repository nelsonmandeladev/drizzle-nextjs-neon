export function generateUniqueString(length: number = 12): string {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uniqueString = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueString += characters[randomIndex];
    }
    return uniqueString;
}

export const isDevelopment = process.env.NODE_ENV !== "production";

export const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
};

export const getRelativeTime = (dateString: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - dateString.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    } else if (diffInHours < 24 * 7) {
        return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
        return formatDate(dateString);
    }
};

// Generate realistic avatar URLs using various avatar services
export const generateAvatarUrl = (firstName: string, lastName: string): string => {
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
const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
export const generatePostImageUrl = async (title: string) => {
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