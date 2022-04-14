import lodash from 'lodash/string.js';
import fs from 'fs';
import { getSchema, generateQuerySDL } from '$lib/graphql/helpers/schema-helper';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
	const template = lodash.template(readSDLTemplate().toString(), {});
	const schema = await getSchema('user');
	const querySDL = generateQuerySDL(schema).join("\n\t");
	return {
		status: 200,
		body: querySDL
	};
}

const readSDLTemplate = () => {
	return fs.readFileSync(`${process.cwd()}/src/lib/templates/sdl.js.template`, {
		encoding: 'utf8'
	});
};
