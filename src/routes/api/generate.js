import lodash from 'lodash/string.js';
import fs from 'fs';
import path from 'path';
import {
	getSchema,
	generateType,
	generateCreate,
	generateUpdate,
	getIDType
} from '$lib/graphql/helpers/schema-helper';
import { write } from '$lib/graphql/helpers/filesystem';
import pluralize from 'pluralize';
import pascalcase from 'pascalcase';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
	const template = lodash.template(readSDLTemplate().toString(), {});
	const modelName = 'user';
	const schema = await getSchema(modelName);
	const type = generateType(schema).join('\n    ');
	const createInput = generateCreate(schema).join('\n    ');
	const updateInput = generateUpdate(schema).join('\n    ');
	const dictionary = getDictionary(modelName);
	const idType = getIDType(schema);
	const generatedTemplate = template({
		type,
		createInput,
		updateInput,
		...dictionary,
		idType
	});

	const serviceTemplate = lodash.template(readServiceTemplate().toString(), {});
	const service = serviceTemplate({
		...dictionary
	});

	const sdlDest = `${process.cwd()}/src/lib/graphql/sdl/${dictionary.singularKebabName}.sdl.js`;
	const serviceDest = `${process.cwd()}/src/lib/graphql/services/${
		dictionary.singularKebabName
	}.service.js`;

	write(sdlDest, generatedTemplate);
	write(serviceDest, service);

	return {
		status: 200,
		body: { success: true }
	};
}

const readSDLTemplate = () => {
	return fs.readFileSync(`${process.cwd()}/src/lib/templates/sdl.js.template`, {
		encoding: 'utf8'
	});
};

const readServiceTemplate = () => {
	return fs.readFileSync(`${process.cwd()}/src/lib/templates/service.js.template`, {
		encoding: 'utf8'
	});
};

/** @param {String} modelName  */
const getDictionary = (modelName) => ({
	singularPascalName: pascalcase(modelName),
	pluralCamelName: lodash.camelCase(pluralize(modelName)),
	singularCamelName: lodash.camelCase(modelName),
	singularKebabName: lodash.kebabCase(modelName)
});
