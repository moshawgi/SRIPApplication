import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View} from 'react-native';

const ProfileScreen = ({navigation, route}) => {
    return <>
      <Text>This is {route.params.name}'s profile</Text>
      <Button
        title="Open Map"
        onPress={() =>
          navigation.navigate('Map')
        }
      />
      </>
  
};

export default ProfileScreen