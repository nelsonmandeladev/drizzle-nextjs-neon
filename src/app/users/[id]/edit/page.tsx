import React from 'react';

interface EditUserPageProps {
    params: Promise<{id: string}>;
}

async function EditUserPage(props: EditUserPageProps) {

    const { id } = await props.params;
    console.log({id})

    return (
        <div></div>
    );
}

export default EditUserPage;