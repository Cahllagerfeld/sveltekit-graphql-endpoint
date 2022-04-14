import { getDMMF } from '@prisma/sdk';

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
	return model.fields.map((field) => mapModelFieldToSDL(field))
}

/**
 * 
 * @param {*} field 
 * @returns {String}
 */
const mapModelFieldToSDL = (field) => {
	return `${field.name}: ${field.type}${field.isRequired ? "!" : ""}`;
  }