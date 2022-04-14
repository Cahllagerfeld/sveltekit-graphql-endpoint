import { getDMMF } from '@prisma/sdk';

const blacklist = ['id', 'createdAt', 'updatedAt'];

/**
 *
 * @param {String} name
 * @returns
 */
export const getSchema = async (name) => {
	const models = await getDMMF({ datamodelPath: `${process.cwd()}/prisma/schema.prisma` });
	return models.datamodel.models.find((model) => model.name.toLowerCase() === name.toLowerCase());
};

/**
 *
 * @param {*} model
 */
export const generateType = (model) => {
	return model.fields.map((field) => mapModelFieldToSDL(field));
};

/**
 *
 * @param {*} model
 * @returns
 */
export const generateCreate = (model) => {
	return model.fields
		.filter((field) => blacklist.indexOf(field.name) === -1 && field.kind !== 'object')
		.map((field) => mapFieldToInput(field, true));
};

export const generateUpdate = (model) => {
	return model.fields
		.filter((field) => blacklist.indexOf(field.name) === -1 && field.kind !== 'object')
		.map((field) => mapFieldToInput(field, false));
};

/**
 *
 * @param {*} field
 * @returns {String}
 */
const mapModelFieldToSDL = (field) => {
	return `${field.name}: ${field.type}${field.isRequired ? '!' : ''}`;
};

/**
 *
 * @param {*} field
 * @param {Boolean} required
 * @returns
 */
const mapFieldToInput = (field, required) => {
	return `${field.name}: ${field.type}${required && field.isRequired ? '!' : ''}`;
};

/**
 * Generates a InputSDL for GraphQL
 * @param {*} field
 */

/**
 * Generates a UpdateInput for GraphQL
 * @param {*} model
 */
const generateUpdateInputSDL = (model) => {};
