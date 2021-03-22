import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const {width, height} = Dimensions.get('window');

export interface DetailsProps {}

const Details: React.FC<DetailsProps> = (route: any) => {
  const item = route.route.params.otherParam;
  console.log('🚀 ~ file: details.tsx ~ line 19 ~ item', item);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.brighter,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Text style={{fontSize: 30}}>{item.title}</Text>
          <Text style={{fontSize: 16, color: 'grey'}}>{item.title}</Text>
        </View>
        <View
          style={{
            width: width - 10,
            height: height / 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: width - 110, height: height / 3}}
            source={{
              uri: `https://logo.clearbit.com/${item?.company?.websiteUrl}`,
            }}
          />
        </View>
      </View>
      <View style={{flex: 1}}>
        <View
          style={
            {
              //backgroundColor: "blue"
            }
          }>
          <View
            style={{
              marginHorizontal: 30,
              paddingVertical: 30,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View>
              <Text style={{color: 'grey'}}>Size</Text>
              <Text style={{fontSize: 20}}>Medium</Text>
            </View>
            <DetailBox property={'Weight'} quality={'400 gm'} />
            <DetailBox property={'Price'} quality={'$12'} />
          </View>
        </View>
        <View style={{marginHorizontal: 20}}>
          <View style={{paddingVertical: 10}}>
            {/* <text style={styles.title}>title</text> */}
          </View>
          <View
            style={{
              marginHorizontal: 10,
              paddingVertical: 30,
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 30,
              backgroundColor: '#EAEAEE',
              elevation: 0.5,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{width: 20, height: 20}}
                source={{
                  uri: `${item.company.logoUrl}`,
                }}
              />
              <Text>{item.tags}</Text>
            </View>
            <View>
              <Image
                style={{width: 20, height: 20}}
                source={item.company.logoUrl}
              />
              <Text>{item.tags}</Text>
            </View>
            <View>
              <Image
                style={{width: 20, height: 20}}
                source={{
                  uri: `https://logo.clearbit.com/${item?.company?.websiteUrl}`,
                }}
              />
              <Text>{item.tags}</Text>
            </View>
            <View>
              <Image
                style={{width: 20, height: 20}}
                source={{uri: item.company.logoUrl}}
              />
              <Text>{item.tags}</Text>
            </View>
          </View>

          <View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <AntDesign
              style={{
                borderWidth: 1 - 0.5,
                borderRadius: 50,
                borderColor: "grey",
              }}
              name="pluscircle"
              size={60}
              color={Colors.brighter}
            /> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const DetailBox = ({
  property,
  quality,
}: {
  property: string;
  quality: string;
}) => (
  <View>
    <Text style={{color: 'grey'}}>{property}</Text>
    <Text style={{fontSize: 20}}>{quality}</Text>
  </View>
);

export default Details;
