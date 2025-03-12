import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Set up the GraphQL endpoint
const httpLink = createHttpLink({
  uri: "mongodb+srv://dbRoulette:NextLevel+69!@cluster0.hvj7m.mongodb.net/", // Make sure this matches your backend URL
  credentials: "include", // Allow cookies and authentication headers
});

// Attach authentication token to each request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
