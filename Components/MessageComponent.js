import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, Alert, ScrollView, Image, TouchableOpacity} from 'react-native';
import axios from 'axios'
import AppButton from './AppButtonComponent';

const MessageComponent = ({navigation}) => {
    const createTwoButtonAlert = (title, message) => {
      output = "cancel"
      Alert.alert(title, message, [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {}},
      ])
    };
    let children = []
    for (let i = 0; i < 20; i++) {
      let userName = "Username"
      let message = "Hi, how are you? I'm reaching out to buy..."
      children.push(<TouchableOpacity onPress = {function() {navigation.navigate("Chat")}}><View style={styles.section}><Image style = {styles.pfp} source={require('../assets/pfp.png')}/><Text style={styles.userName}>{userName}</Text><Text style={styles.messages}>{message}</Text></View></TouchableOpacity>)
    }
    return (
      <>
      <ScrollView children={children}>
      </ScrollView>
      </>
    );
}

const styles = StyleSheet.create({
    section: {
      height: 100,
      borderWidth: 0.5,
      padding: 10,
    },
    pfp: {
      position: "relative",
      left: 10,
      top: 10,
      height: 60,
      width: 60,
    },
    userName: {
      position: 'absolute',
      left: 100,
      fontSize: 15,
      top: 25
    },
    messages: {
      position: 'absolute',
      left: 100,
      top: 60,
      color: "gray"
    }
});

export default MessageComponent