const express = require('express');
const { ApolloServer } = require("apollo-server-express"); //Bring in my Apollo Server package
const path = require('path');
const { authMiddleware } = require("./utils/auth"); //bring in my auth file functions to apply to my Apollo Server
const db = require('./config/connection');
const { typeDefs, resolvers } = require("./schemas"); //bringing in  my typeDef and Resolvers from my Schemas folder that utilize GraphQLconst { typeDefs, resolvers } = require("./schemas"); //bringing in  my typeDef and Resolvers from my Schemas folder that utilize GraphQL

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
}); //applying my graphql resolvers and typeDefs to make a ApolloServer instance , as well as my auth function

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

}


const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer();

