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