import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';

const sample: any = [
  {id: '1', title: 'First item'},
  {id: '2', title: 'Second item'},
  {id: '3', title: 'Third item'},
  {id: '4', title: 'Fourth item'},
];

export const FlatListComponent: React.FC<{data: any}> = ({data}) => {
  //   const GET_JOBS = gql`
  //     query jobs {
  //       jobs {
  //         id
  //         title
  //       }
  //     }
  //   `;

  //   const {data}: any = useQuery(GET_JOBS);
  const sub = data;

  console.log(data);

  return (
    <FlatList
      nestedScrollEnabled
      data={sub}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.listItem}>
          <Image source={{uri: item.title}} style={styles.coverImage} />
          <View style={styles.metaInfo}>
            <Text style={styles.title}>{`${item?.title}`}</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700',
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 10,
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
