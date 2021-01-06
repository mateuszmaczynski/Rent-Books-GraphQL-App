const { ApolloServer } = require("apollo-server");
const rootValue = require("./rootValue");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const PORT = process.env.PORT || 4000;
const BASE_ASSETS_URL = process.env.BASE_ASSETS_URL || "http://examples.devmastery.pl/assets";

const server = new ApolloServer({
  context: {
    baseAssetsUrl: BASE_ASSETS_URL
  },
  resolvers,
  rootValue,
  typeDefs,
  introspection: true,
  playground: true
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
