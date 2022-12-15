import { gql } from  'apollo-server-express';

const typeDefs = gql`
type: User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

type Book {
bookId: ID!
authors: [String!]
description: String!
title: String
image: String
link: String
}

type Query {
me: User
users: [User]!
user(userId: ID!) User
}

type Auth {
token: ID!
user: User
}

type Mutation {
login:
addUser:
saveBook:
removeBook:
}
`;

module.exports = typeDefs;