export const schema = `
  type User {
    id: Int!
    email: String!
    name: String
    message: String
  }
  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  input CreateUserInput {
    email: String!
    name: String
    message: String
  }

  input UpdateUserInput {
    email: String
    name: String
    message: String
  }
  
  type Mutation {
    createUser(input: CreateUserInput!): User! 
    updateUser(id: Int!, input: UpdateUserInput!): User! 
    deleteUser(id: Int!): User!
  }
`
