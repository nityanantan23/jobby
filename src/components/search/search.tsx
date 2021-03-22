import React, {useState} from 'react';
import {SafeAreaView, StatusBar, Text, View, TextInput} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {FlatListComponent} from '../flatlist/flatlist';
import {styles} from '../search/styles';
import {backgroundStyle} from './styles';

const Search: React.FC<{
  navigation: any;
}> = (navigation: any) => {
  const [search, setSearch] = useState<any>('');

  return (
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
            placeholderTextColor="#000"
            onChangeText={queryText => setSearch(queryText)}
            placeholder="Search"
            style={styles.textInputStyle}
          />
        </View>

        <FlatListComponent getSearch={search} navigation={navigation} />

        <View
          style={{
            height: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.lighter,
          }}></View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
