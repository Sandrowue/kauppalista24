export async function load({fetch}) {
    return {
        props: {
            fetchFunction: fetch,
        },
    };
}