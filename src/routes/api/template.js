import lodash from 'lodash/string.js';
import fs from 'fs';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
	const template = lodash.template(readSDLTemplate().toString(), {});
	console.log(template);
	return {
		status: 200
	};
}

const readSDLTemplate = () => {
	return fs.readFileSync(`${process.cwd()}/src/lib/templates/sdl.js.template`, {
		encoding: 'utf8'
	});
};
