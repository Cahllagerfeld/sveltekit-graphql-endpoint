import { createServer } from '@graphql-yoga/common';
import { mergeTypeDefs } from '@graphql-tools/merge';

const sdls = Object.entries(import.meta.globEager('/src/lib/**/*.sdl.js')).map(([_, sdl]) => {
	return sdl.schema;
});
const services = Object.entries(import.meta.globEager('/src/lib/**/*.service.js')).map(
	([_, service]) => {
		return { ...service };
	}
);

const merged = mergeTypeDefs(sdls);

console.log(merged);

const yogaApp = createServer({
	schema: {
		typeDefs: `
				type Query {
					hello: String
				}
			`,
		resolvers: {
			Query: {
				hello: () => 'SvelteKit - GraphQL Yoga'
			}
		}
	},
	graphiql: {
		endpoint: '/api/graphql',
		title: 'Webstone Playground'
	}
});

export { yogaApp as get, yogaApp as post };
