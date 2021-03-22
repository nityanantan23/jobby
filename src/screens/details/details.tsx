import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
  Linking,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from '@apollo/client';
import {QUERY_JOBS_DETAILS} from '../../components/query/query';
import {OpenURLButton} from '../../components/button/button';
const {width, height} = Dimensions.get('window');

export interface DetailsProps {}

const Details: React.FC<DetailsProps> = (route: any) => {
  const client = new ApolloClient({
    uri: 'https://api.graphql.jobs/graphql',
    cache: new InMemoryCache(),
  });

  const jobslug = route.route.params.jobSlug;
  const companyslug = route.route.params.companySlug;

  const {loading, data} = useQuery(QUERY_JOBS_DETAILS, {
    variables: {
      input: {companySlug: companyslug, jobSlug: jobslug},
    },
  });

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#5500dc"
        style={{marginTop: 300}}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <ScrollView>
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
              <Text style={{fontSize: 30}}>{data?.job?.title}</Text>
              <Text style={{fontSize: 16, color: 'grey'}}>
                {data?.job?.title}
              </Text>
            </View>
            <View
              style={{
                width: width - 10,
                height: height / 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{width: width - 200, height: height / 4}}
                borderRadius={30}
                source={{
                  uri: `https://logo.clearbit.com/${data?.job?.company?.websiteUrl}`,
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
                <DetailBox
                  property={data?.job?.commitment?.__typename}
                  quality={data?.job?.commitment?.title}
                />
                <DetailBox
                  property={data?.job?.cities[0].__typename}
                  quality={data?.job?.cities[0].name}
                />
                <DetailBox
                  property={data?.job?.company.__typename}
                  quality={data?.job?.company.name}
                />
              </View>
            </View>
            <View style={{marginHorizontal: 20}}>
              <View style={{paddingVertical: 10}}></View>
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
                  <Text>{data?.job?.tags[0].name}</Text>
                </View>
                <View>
                  <Text>{data?.job?.tags[1].name}</Text>
                </View>
                <View>
                  <Text>{data?.job?.tags[2].name}</Text>
                </View>
                <View>
                  <Text>{data?.job?.tags[3].name}</Text>
                </View>
              </View>
              <Text style={{fontSize: 26, color: 'black', marginTop: 40}}>
                Description
              </Text>
              <Text style={{fontSize: 16, color: 'black', marginTop: 10}}>
                {data?.job?.description}
              </Text>
              <View style={{margin: 10,marginBottom:30}}>
                <OpenURLButton url={data?.job?.applyUrl}>
                  Apply Job
                </OpenURLButton>
              </View>
              <View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}></View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ApolloProvider>
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
