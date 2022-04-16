import gql from 'graphql-tag';

export const schema = gql`
	type Post {
		id: Int!
		email: String!
		message: String
	}
	type Query {
		posts: [Post!]!
		post(id: Int!): Post
	}

	input CreatePostInput {
		email: String!
		message: String
	}

	input UpdatePostInput {
		email: String
		message: String
	}

	type Mutation {
		createPost(input: CreatePostInput!): Post!
		updatePost(id: Int!, input: UpdatePostInput!): Post!
		deletePost(id: Int!): Post!
	}
`;
