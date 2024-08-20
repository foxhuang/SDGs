import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const cache = new InMemoryCache({ addTypename: false });

const uri = '/api/hysdgs/graphql';

const hysdgsClient = new ApolloClient<any>({
  uri,
  cache,
  defaultOptions : {
    query: {
      fetchPolicy: 'network-only',
    },
  }
});


 
export const uploadClient = new ApolloClient({
  link: createUploadLink({
    uri,
    credentials: 'include',
  }),
  cache,
}); 

export default hysdgsClient;
