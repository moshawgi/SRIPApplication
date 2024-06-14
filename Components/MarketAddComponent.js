import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View} from 'react-native';
import AppButton from './AppButtonComponent.js';
import UploadImage from './ImageUploadComponent.js';


const MarketAdd = ({navigation}) => {
    const [meetingTimes, setMeetingTimes] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [foods, setFoods] = React.useState('');
    return (
      <>
      <TextInput
        style={styles.input}
        onChangeText = {setMeetingTimes}
        placeholder="Meeting Times"
        value={meetingTimes}/>
      <TextInput
        style={styles.input}
        onChangeText = {setAddress}
        placeholder="Address"
        value={address}/>
      <TextInput
        style={styles.description}
        onChangeText = {setFoods}
        placeholder="Foods being sold"
        multiline = {true}
        value={foods}/>
      <TextInput
        style={styles.description}
        onChangeText = {setDescription}
        placeholder="Description"
        multiline = {true}
        value={description}/>
      <UploadImage/>
      <View style={styles.submit}>
      <AppButton
        style={styles.appButtonContainer}
        title="Submit Market"
        onPress={() => {setAddress(""); setMeetingTimes("")}}
      />
      </View>
      </>
    );
};

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    description: {
      paddingTop: 10,
      height: 150,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      textAlignVertical: 'top'
    },
    submit: {
      top: 75
    },
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 250,
      alignSelf: 'center'
    }
});

export default MarketAdd