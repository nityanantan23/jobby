/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import React, {useState} from 'react';
import Search from '../../components/search/search';

const Home = (navigation:any) => {
  const client = new ApolloClient({
    uri: 'https://api.graphql.jobs/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Search navigation={navigation}/>
    </ApolloProvider>
  );
};

export default Home;
