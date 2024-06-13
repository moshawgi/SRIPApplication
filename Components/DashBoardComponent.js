import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import AppButton from './AppButtonComponent'

TouchableOpacity.defaultProps = { activeOpacity: 0.8 }

const Screen = ({navigation}) => {
    return <>
      <AppButton title="Open Map" onPress={() => navigation.navigate('Map')}/>
      <AppButton title="Add a Market" onPress={() => navigation.navigate('Market Add')}/>
    </>
  
};

export default Screen