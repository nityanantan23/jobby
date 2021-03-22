import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {QUERY_JOBS, QUERY_JOBS_FIRST, QUERY_LOCATION} from '../query/query';
import search from '../search/search';
import {backgroundStyle} from '../search/styles';
import {styles} from './styles';

export const FlatListComponent: React.FC<{
  getSearch: string;
  navigation: any;
}> = ({getSearch, navigation}) => {
  // console.log('🚀 ~ file: flatlist.tsx ~ line 32 ~ navigation', navigation);

  const client = new ApolloClient({
    uri: 'https://api.graphql.jobs/graphql',
    cache: new InMemoryCache(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>(
    useQuery(QUERY_JOBS_FIRST).data?.jobs,
  );
  const [search, setSearch] = useState<any>(getSearch);

  const {data: location} = useQuery(QUERY_LOCATION, {
    variables: {
      input: {
        value: search,
      },
    },
  });
  console.log('🚀 ~ file: flatlist.tsx ~ line 19 ~ data', data);

  const {loading, error, data: jobs} =
    search === '' || search === null
      ? useQuery(QUERY_JOBS_FIRST)
      : useQuery(QUERY_JOBS, {
          variables: {
            input: {
              type: location?.locations[0].type,
              slug: location?.locations[0].slug,
            },
          },
        });

  useEffect(() => {
    setIsLoading(true);

    setSearch(getSearch);

    if (jobs?.jobs) {
      setIsLoading(false);

      setData(jobs?.jobs);
    }
  }, [getSearch, jobs]);

  if (isLoading)
    return (
      <ApolloProvider client={client}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={'light-content'} />
          <View
            style={{
              backgroundColor: Colors.lighter,
            }}>
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

  if (jobs == [])
    return <Text style={{fontSize: 18}}>No searched data found!</Text>;
  if (error) return <Text style={{fontSize: 18}}>{error}</Text>;

  return (
    <FlatList
      nestedScrollEnabled
      contentContainerStyle={{paddingBottom: 370}}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableWithoutFeedback
          onPress={() =>
            navigation?.navigation.navigation.navigate('Details', {
              otherParam: item,
            })
          }>
          <View style={styles.listItem}>
            <Image
              source={{
                uri: `https://logo.clearbit.com/${item?.company?.websiteUrl}`,
              }}
              style={styles.coverImage}
            />
            <View style={styles.metaInfo}>
              <Text style={styles.title}>{`${item?.title}`}</Text>
              <Text
                style={
                  styles.title
                }>{`${item?.cities[0]?.name}, ${item?.cities[0]?.country?.name} `}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    />
  );
};
