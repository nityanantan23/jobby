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
} from 'react-native';

import {Colors, ReloadInstructions} from 'react-native/Libraries/NewAppScreen';

import {FlatListComponent} from './src/components/flatlist';

// const Section: React.FC<{
//   title: string;
// }> = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState<any>([]);

  const client = new ApolloClient({
    uri: 'https://api.graphql.jobs/graphql',
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    setIsLoading(true);

    client
      .query({
        query: gql`
          query jobs {
            jobs {
              id
              title
            }
          }
        `,
      })
      .then<any>(response => response)
      .then(response => {
        setData(response?.data.jobs);
        setFullData(response);
        setIsLoading(false);
        // console.log(data);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

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
          <FlatListComponent data={data} />
        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    </ApolloProvider>
  );
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
