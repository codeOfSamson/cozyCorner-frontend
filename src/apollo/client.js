import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql",
  }),
  cache: new InMemoryCache(),
});

export default client;
