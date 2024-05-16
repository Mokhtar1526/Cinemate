import React from 'react';
import { View, Button, Linking } from 'react-native';

const OpenYouTubeButton = ({ videoKey }) => {
  const openYouTubeApp = () => {
    Linking.openURL(`https://www.youtube.com/watch?v=`+videoKey);

  };

  return (
    <View>
      <Button title="Show Trailer" onPress={openYouTubeApp} />
    </View>
  );
};

export default OpenYouTubeButton;
