const { gql } = require("apollo-server");
const typeDefs = gql`
  schema {
    query: Query
  }
  type Query {
    authors: [Author!]!
    author(ID: Int!): Author
    books: [Book!]!
    book(ID: Int!): Book
    users: [User!]!
    user(ID: Int!): User
  }
  type Author {
    id: ID!
    name: String!
    photo: Image!
    books: [Book!]!
  }
  type Book {
    id: ID!
    title: String!
    cover: Image!
    author: Author!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    avatar: Avatar!
    reader: Reader
  }
  type Image {
    url: String!
  }
  type Avatar {
    image: Image!
    color: String!
  }
  type Reader {
    name: String!
  }
`;

module.exports = typeDefs;
