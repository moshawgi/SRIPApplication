import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View} from 'react-native';
import AppButton from './AppButtonComponent.js';


const MarketAdd = ({navigation}) => {
    const [meetingTimes, setMeetingTimes] = React.useState('');
    const [address, setAddress] = React.useState('');
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
      <AppButton
        title="Submit Market"
        onPress={() => {setAddress(""); setMeetingTimes("")}}
        />
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
});

export default MarketAdd