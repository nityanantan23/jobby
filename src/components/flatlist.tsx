import React from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';

const sample: any = [
  {id: '1', title: 'First item'},
  {id: '2', title: 'Second item'},
  {id: '3', title: 'Third item'},
  {id: '4', title: 'Fourth item'},
];

export const FlatListComponent: React.FC<{data: any}> = ({data}) => {
  const sub = data;

  console.log(data);

  return (
    <FlatList
      nestedScrollEnabled
      contentContainerStyle={{paddingBottom: 370}}
      data={sub}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.listItem}>
          <Image
            source={{
              uri: `https://logo.clearbit.com/${item.company?.websiteUrl}`,
            }}
            style={styles.coverImage}
          />
          <View style={styles.metaInfo}>
            <Text style={styles.title}>{`${item?.title}`}</Text>
            <Text
              style={
                styles.title
              }>{`${item?.cities[0]?.name}, ${item?.cities[0]?.country?.name} `}</Text>
            {/* <Flag code="de" asSquare={true}  /> */}

            {/* <Flag code={item?.cities[0]?.country?.isoCode}  /> */}
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
