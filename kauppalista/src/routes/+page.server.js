import {fail} from '@sveltejs/kit';

const asiat = [
    "Leipä",
    "Tomaatti",
    "Kurkku",
    "Juusto"
];

export function load() {
    return {asiat};
}

export const actions = {
    lisääAsia: async ({request}) => {
        const data = await request.formData();
        const asia = data.get('asia')?.trim() ?? "";
        if (!asia) {
            return fail(422, {
                error: "Tuote ei saa olla tyhjä"
            });
        }
        if (asiat.includes(asia)) {
            return fail(422, {
                error: "Asia oli jo listalla"
            })
        }
        asiat.push(asia);        
    }
}