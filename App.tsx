/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
  useQuery,
} from '@apollo/client';

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import {Colors, ReloadInstructions} from 'react-native/Libraries/NewAppScreen';

import {FlatListComponent} from './src/components/flatlist';

import {
  QUERY_LOCATION,
  QUERY_CITY,
  QUERY_JOBS,
} from './src/components/query/query';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [notfound, setnotfound] = useState(false);
  const [fullData, setFullData] = useState<any>([]);
  const [search, setSearch] = useState<any>('');
  const [query, setQuery] = useState<any>('');

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={search}
          onChangeText={queryText => setSearch(queryText)}
          placeholder="Search"
          style={{backgroundColor: '#000', paddingHorizontal: 20}}
        />
      </View>
    );
  }

  const client = new ApolloClient({
    uri: 'https://api.graphql.jobs/graphql',
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    setIsLoading(true);

    if (search === '' || search === null) {
      client
        .query({
          query: gql`
            query jobs {
              jobs {
                id
                title
                slug
                company {
                  websiteUrl
                }
                cities {
                  name
                  country {
                    name
                  }
                }
                countries {
                  name
                }
              }
            }
          `,
        })
        .then<any>((response: any) => response)
        .then((response: {data: {jobs: any}}) => {
          setData(response?.data.jobs);
          setFullData(response?.data.jobs);
          setIsLoading(false);
          setnotfound(false)

        })
        .catch((err: any) => {
          setIsLoading(false);
          setnotfound(true)
        });
    } else {
      client
        .query({
          query: QUERY_LOCATION,
          variables: {
            input: {
              value: search,
            },
          },
        })
        .then<any>(
          (response: {data: {locations: {slug: any; type: any}[]}}) => {
            client
              .query({
                query: QUERY_JOBS,
                variables: {
                  input: {
                    type: response?.data.locations[0].type,
                    slug: response?.data.locations[0].slug,
                  },
                },
              })
              .then((response: {data: {jobs: any}}) => {
                setData(response?.data.jobs);
                setIsLoading(false);
                setnotfound(false)

              });
          },
        )

        .catch((err: React.SetStateAction<null>) => {
          setIsLoading(false);
          setnotfound(true)
        });
    }
  }, [search]);

  console.log(data);

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  if (isLoading) {
    return (
      <ApolloProvider client={client}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={'light-content'} />
          <Text style={styles.text}>Search Jobs</Text>
          <View
            style={{
              backgroundColor: Colors.lighter,
            }}>
            <View
              style={{
                backgroundColor: Colors.white,
                padding: 10,
                marginVertical: 10,
                borderRadius: 20,
              }}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                value={search}
                // onChangeText={queryText => setQuery(queryText)}
                placeholderTextColor="#000"
                onChangeText={queryText => setSearch(queryText)}
                placeholder="Search"
                style={styles.textInputStyle}
              />
            </View>
            <View
              style={{
                height: 700,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.lighter,
              }}>
              <ActivityIndicator
                size="large"
                color="#5500dc"
                style={{marginBottom: 300}}
              />
            </View>
          </View>
        </SafeAreaView>
      </ApolloProvider>
    );
  } else if (notfound) {
    return (
      <ApolloProvider client={client}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={'light-content'} />
          <Text style={styles.text}>Search Jobs</Text>
          <View
            style={{
              backgroundColor: Colors.lighter,
            }}>
            <View
              style={{
                backgroundColor: Colors.white,
                padding: 10,
                marginVertical: 10,
                borderRadius: 20,
              }}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                value={search}
                // onChangeText={queryText => setQuery(queryText)}
                placeholderTextColor="#000"
                onChangeText={queryText => setSearch(queryText)}
                placeholder="Search"
                style={styles.textInputStyle}
              />
            </View>
            <View
              style={{
                height: 700,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.lighter,
              }}>
              <Text style={{fontSize: 18}}>No searched data found!</Text>
            </View>
          </View>
        </SafeAreaView>
      </ApolloProvider>
    );
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={'light-content'} />
          <Text style={styles.text}>Search Jobs</Text>

          <View
            style={{
              backgroundColor: Colors.lighter,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                marginVertical: 10,
                borderRadius: 20,
              }}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                value={search}
                // onChangeText={queryText => setQuery(queryText)}

                onChangeText={queryText => setSearch(queryText)}
                placeholder="Search"
                placeholderTextColor="#000"
                style={styles.textInputStyle}
              />
            </View>
            <FlatListComponent data={data} />
          </View>
        </SafeAreaView>
      </ApolloProvider>
    );
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: '700',
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  metaInfo: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10,
  },
  textInputStyle: {
    color: 'green',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});

export default App;
