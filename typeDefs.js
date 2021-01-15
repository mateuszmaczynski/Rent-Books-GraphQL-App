const { gql } = require("apollo-server");
const typeDefs = gql`
  schema {
    query: Query
  }
  type Query {
    authors(searchQuery: String! =""): [Author!]!
    author(id: ID!): Author
    books(searchQuery: String! = ""): [Book!]!
    book(id: ID!): Book
    users(searchQuery: String! = ""): [User!]!
    user(id: ID!): User
  }
  type Author {
    id: ID!
    name: String!
    photo: Image!
    bio: String!
    books: [Book!]!
  }
  type Book {
    id: ID!
    title: String!
    cover: Image!
    author: Author!
    description: String!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    info: String!
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
