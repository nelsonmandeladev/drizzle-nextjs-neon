interface UserDetailPageProps {
    params: Promise<{id: string}>
}

export default async function UserDetailPage(props: UserDetailPageProps) {
    const {id} = await props.params;

    console.log({id});

    return (
        <div>
            User detail page
        </div>
    )
}