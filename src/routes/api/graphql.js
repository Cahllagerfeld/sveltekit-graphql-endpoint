import { createServer } from '@graphql-yoga/common';

const sdls = Object.entries(import.meta.globEager('/src/lib/**/*.sdl.js')).map(([_, sdl]) => {
	return { ...sdl };
});

const services = Object.entries(import.meta.globEager('/src/lib/**/*.service.js')).map(
	([_, service]) => {
		return { ...service };
	}
);

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
