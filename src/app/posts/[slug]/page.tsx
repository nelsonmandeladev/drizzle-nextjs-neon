import React from 'react';

interface PostDetailPageProps {
    params: Promise<{slug: string}>
}
async function PostDetailPage(props: PostDetailPageProps) {
    const {slug} = await props.params;
    console.log({slug});
    return (
        <div>Post detail</div>
    );
}

export default PostDetailPage;