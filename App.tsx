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
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState<any>([]);
  const [search, setSearch] = useState<any>('');
  const [query, setQuery] = useState<any>('');

  const querylocation = function renderHeader() {
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
  };

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
        })
        .catch((err: any) => {
          setIsLoading(false);
          setError(err);
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
                if (data == null || data == []) {
                  setError(data);
                }
              });
          },
        )

        .catch((err: React.SetStateAction<null>) => {
          setIsLoading(false);
          setError(err);
        });
    }
  }, [search]);

  console.log(data);

  // {variables":{"input":{"slug":"berlin"}},

  //   const sample = client.query({
  //     query: gql`
  //       query jobs {
  //         jobs {
  //           locationNames
  //         }
  //       }
  //     `,
  //   });

  //   setData(sample?)
  //   .then(result => setData(result.results
  //         setFullData(response.results);
  //           setIsLoading(false);

  //   );
  // ));

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.lighter : Colors.lighter,
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.white,
        }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:Colors.lighter}}>
        <Text style={{fontSize: 18}}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Text style={styles.text}>Favorite Contacts</Text>

          {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}> */}
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.lighter : Colors.white,
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
                style={{backgroundColor: '#000', paddingHorizontal: 20}}
              />
            </View>
            <FlatListComponent data={data} />
          </View>
          {/* </ScrollView> */}
        </SafeAreaView>
      </ApolloProvider>
    );
  }
};

const styles = StyleSheet.create({
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
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
});

export default App;
