import lodash from 'lodash/string.js';
import fs from 'fs';
import { getSchema, generateQuerySDL, generateInputSDL } from '$lib/graphql/helpers/schema-helper';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
	const template = lodash.template(readSDLTemplate().toString(), {});
	const schema = await getSchema('user');
	const query = generateQuerySDL(schema).join('\n\t');
	const createInput = generateInputSDL(schema).join('\n\t');
	return {
		status: 200
	};
}

const readSDLTemplate = () => {
	return fs.readFileSync(`${process.cwd()}/src/lib/templates/sdl.js.template`, {
		encoding: 'utf8'
	});
};
