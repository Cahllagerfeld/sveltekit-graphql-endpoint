import { createServer } from '@graphql-yoga/common';
import { schema } from '$lib/graphql/sdl/user.sdl';
import * as services from '$lib/graphql/services/user.service';

const yogaApp = createServer({
	schema: {
		typeDefs: schema,
		resolvers: {
			Query: {
				users: services.contacts,
				user: services.contact
			},
			Mutation: {
				createUser: services.createContact,
				updateUser: services.updateContact,
				deleteUser: services.deleteContact
			}
		}
	},
	graphiql: {
		endpoint: '/api/graphql',
		title: 'Webstone Playground'
	}
});

export { yogaApp as get, yogaApp as post };
