import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: 'http://localhost3000/api/tasks',
    cache: new InMemoryCache(),
})

export default apolloClient;