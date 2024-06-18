import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, Alert, TouchableOpacity, Image, Keyboard, ScrollView} from 'react-native';
import DropdownComponent from './DropdownComponent';
import axios from 'axios'
import AppButton from './AppButtonComponent';

const Chat = ({navigation}) => {
    const [message, setMessage] = React.useState('');
    const [isPressed, setIsPressed] = React.useState(false)
    const [messages, setMessages] = React.useState([<Text>Hi</Text>, <Text>Bruh</Text>])
    let inputProps = {style: isPressed ? styles.inputHigh : styles.input, onTouchStart:() => {setIsPressed(true)},  placeholder: "Send a message", value: message, onChangeText: setMessage}
    let buttonProps = {style: isPressed ? styles.appButtonContainerHigh : styles.appButtonContainer, onPress:() => {setIsPressed(false); Keyboard.dismiss(); setMessages(messages.push(<Text>{message}</Text>)); setMessage("");}}
    return (
      <>
      <ScrollView style={styles.scrollView} children={messages}></ScrollView>
      <View style={styles.view}>
        <TouchableOpacity>
          <TextInput {...inputProps}/>
        </TouchableOpacity>
        <TouchableOpacity {...buttonProps}>
          <Image style = {styles.send} source={require('../assets/send.png')}/>
        </TouchableOpacity>
      </View>
      </>
    );
}

const styles = StyleSheet.create({
    scrollView: {
      borderWidth: 0,
      backgroundColor:'white',
      height: 10,
      flex: 1,
    },
    view: {
      borderWidth: 0,
      flex: 0.2,
      backgroundColor: 'white',
    },
    input: {
      position: "absolute",
      top: 40,
      height: 40,
      borderWidth: 1,
      padding: 10,
      width: 320,
      left: 8,
      borderRadius: 100,
    },
    inputHigh: {
      top: -270,
      height: 40,
      borderWidth: 1,
      padding: 10,
      width: 320,
      left: 8,
      borderRadius: 100,
    },
    appButtonContainer: {
      position: 'absolute',
      left: 335,
      elevation: 8,
      backgroundColor: "gray",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 40,
      height: 40,
      alignSelf: 'center',
      top: 40
    },
    appButtonContainerHigh: {
      position: 'absolute',
      left: 335,
      elevation: 8,
      backgroundColor: "gray",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 40,
      height: 40,
      alignSelf: 'center',
      top: -270
    },
    signUpContainer: {
      top: 50
    },
    send: {
      position: "relative",
      alignSelf: 'center',
      height: 20,
      width: 20,
      color: "#A9A9A9"
    },
});

export default Chat