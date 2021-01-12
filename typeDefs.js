const { gql } = require("apollo-server");
const typeDefs = gql`
  schema {
    query: Query
  }
  type Query {
    authors: [Author!]!
    author(id: Int!): Author
    books: [Book!]!
    book(id: Int!): Book
    users: [User!]!
    user(id: Int!): User
  }
  type Author {
    id: Int!
    name: String!
    photo: Image!
    books: [Book!]!
  }
  type Book {
    id: Int!
    title: String!
    cover: Image!
    author: Author!
  }
  type User {
    id: Int!
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
