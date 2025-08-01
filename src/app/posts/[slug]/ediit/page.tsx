import React from 'react';

interface EditPostPageProps {
    params: Promise<{slug: string}>
}


async function EditPostPage(props: EditPostPageProps) {

    const {slug} = await props.params;

    console.log({slug});

    return (
        <div></div>
    );
}

export default EditPostPage;