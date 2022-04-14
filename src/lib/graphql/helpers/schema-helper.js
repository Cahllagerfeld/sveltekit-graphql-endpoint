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
export const generateQuerySDL = (model) => {
	return model.fields.map((field) => mapModelFieldToSDL(field));
};

export const generateInputSDL = (model) => {
	return model.fields
		.filter((field) => blacklist.indexOf(field.name) === -1 && field.kind !== 'object')
		.map((field) => mapFieldToInput(field));
};

/**
 *
 * @param {*} field
 * @returns {String}
 */
const mapModelFieldToSDL = (field) => {
	return `${field.name}: ${field.type}${field.isRequired ? '!' : ''}`;
};

const mapFieldToInput = (field) => {
	return `${field.name}: ${field.isList ? '[' : ''}${field.type}${field.isList ? ']' : ''}${
		field.isRequired | field.isList ? '!' : ''
	}`;
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
