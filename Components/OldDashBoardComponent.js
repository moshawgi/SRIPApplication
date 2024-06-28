import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from './AppButtonComponent'

TouchableOpacity.defaultProps = { activeOpacity: 0.8 }

const Screen = ({navigation}) => {
    return <>
      <AppButton style = {styles.appButtonContainer} title="Open Map" onPress={() => navigation.navigate('Map')}/>
      <AppButton style = {styles.appButtonContainer} title="Add a Market" onPress={() => navigation.navigate('Market Add')}/>
      <AppButton style = {styles.appButtonContainer} title="Profile Page" onPress={() => navigation.navigate('Profile')}/>
      <AppButton style = {styles.appButtonContainer} title="Messages" onPress={() => navigation.navigate('Messages')}/>
      <AppButton style = {styles.appButtonContainer} title="Profile Search" onPress={() => navigation.navigate('Profile Search')}/>
      <AppButton style = {styles.appButtonContainer} title="Market List" onPress={() => navigation.navigate('Market List')}/>
      <AppButton style = {styles.appButtonContainer} title="Logout" onPress={() => {AsyncStorage.removeItem("token"); navigation.navigate('Register')}}/>
    </>
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 250,
    alignSelf: 'center',
    margin: 7.5,
    top: 150
  }
}); 

export default Screen