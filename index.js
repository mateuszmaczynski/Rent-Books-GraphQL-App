const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const db = require("./db");

const PORT = process.env.PORT || 4000;
const BASE_ASSETS_URL = process.env.BASE_ASSETS_URL || "http://examples.devmastery.pl/assets";

const server = new ApolloServer({
  context: {
    db,
    baseAssetsUrl: BASE_ASSETS_URL
  },
  resolvers,
  typeDefs,
  introspection: true,
  playground: true
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
