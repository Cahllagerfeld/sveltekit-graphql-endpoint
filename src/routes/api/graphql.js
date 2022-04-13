import { createServer } from '@graphql-yoga/common';

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
