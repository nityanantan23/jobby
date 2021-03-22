
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import React, {useState} from 'react';
import Search from './src/components/search/search';
import Routes from './src/navigate';

const App = () => {
  const client = new ApolloClient({
    uri: 'https://api.graphql.jobs/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};

export default App;
