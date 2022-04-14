export const schema = `
  type User {
    id: Int!
    name: String!
    email: String!
    message: String!
  }

  type Query {
    users: [User!]! 
    user(id: Int!): User 
  }

  input CreateUserInput {
    name: String!
    email: String!
    message: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    message: String
  }

  type Mutation {
    createUser(input: UpdateUserInput!): User! 
    updateUser(id: Int!, input: UpdateUserInput!): User! 
    deleteUser(id: Int!): User! 
  }
`;
