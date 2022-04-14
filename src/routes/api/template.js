import lodash from 'lodash/string.js';
import fs from 'fs';
import {
	getSchema,
	generateType,
	generateCreate,
	generateUpdate
} from '$lib/graphql/helpers/schema-helper';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
	const template = lodash.template(readSDLTemplate().toString(), {});
	const schema = await getSchema('user');
	const type = generateType(schema).join('\n    ');
	const createInput = generateCreate(schema).join('\n    ');
	const updateInput = generateUpdate(schema).join('\n    ');
	const generatedTemplate = template({
		type,
		createInput,
		updateInput,
		singularPascalName: '',
		pluralCamelName: '',
		singularCamelName: '',
		idType: ''
	});

	return {
		status: 200,
		body: generatedTemplate
	};
}

const readSDLTemplate = () => {
	return fs.readFileSync(`${process.cwd()}/src/lib/templates/sdl.js.template`, {
		encoding: 'utf8'
	});
};
