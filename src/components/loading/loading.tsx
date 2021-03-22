import React from 'react';
import {ActivityIndicator} from 'react-native';

export interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <ActivityIndicator
      size="large"
      color="#5500dc"
      style={{marginBottom: 300}}
    />
  );
};

export default Loading;
