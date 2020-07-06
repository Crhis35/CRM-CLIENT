import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import fetch from "node-fetch";
import { setContext } from "apollo-link-context";

const HttpLink = createHttpLink({
  uri: "https://whispering-cliffs-66317.herokuapp.com/",
  fetch,
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(HttpLink),
});

export default client;
