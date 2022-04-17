import { createServer } from '@graphql-yoga/common';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import merge from 'lodash/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

const sdls = Object.entries(import.meta.globEager('/src/lib/**/*.sdl.js')).map(([_, sdl]) => {
	return sdl.schema;
});
const services = Object.entries(import.meta.globEager('/src/lib/**/*.service.js')).map(
	([_, service]) => {
		return { ...service };
	}
);

const schema = createSchema(sdls, services);

const yogaApp = createServer({
	schema,
	graphiql: {
		endpoint: '/api/graphql',
		title: 'Webstone Playground'
	}
});

export { yogaApp as get, yogaApp as post };

function createSchema(sdls, services) {
	const merged = mergeTypeDefs(sdls);
	const schema = makeExecutableSchema({ typeDefs: merged });
	createResolversFromServices(schema, services, mergeResolvers(sdls));
	return schema;
}

/**
 *
 * @param {import("graphql").GraphQLSchema} schema
 * @param {*} services
 * @param {*} resolvers
 */
function createResolversFromServices(schema, services, resolvers) {
	const merged = merge({}, ...Object.keys(services).map((serviceName) => services[serviceName]));
}
