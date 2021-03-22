import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const backgroundStyle = {
  backgroundColor: Colors.lighter,
};

export const styles = StyleSheet.create({
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
