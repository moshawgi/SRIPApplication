import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, Alert, ScrollView, Image, TouchableOpacity} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios'
import AppButton from './AppButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessageComponent = ({navigation}) => {
    const [children, setChildren] = React.useState([])
    const [first, setFirst] = React.useState()
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
    useFocusEffect(React.useCallback(() => {
      async function getChildren() {
        let token = await AsyncStorage.getItem("token")
        let messages = await axios.post('http://10.50.38.167:3300/auth/messagefind', {token:token})
        messages = messages.data.result
        let messageChildren = []
        for (let i = 0; i < messages.length; i++) {
          let userName = messages[i].userName
          let message = messages[i].message
          let imageURI = await axios.post('http://10.50.38.167:3300/auth/checkphoto', {userName: userName})
          imageURI = imageURI.data
          if (imageURI.result) {
            imageURI = imageURI.result
          }
          else {
            imageURI = "pfp.png"
          }
          console.log(imageURI)
          imageURI = "http://10.50.38.167:3300/" + imageURI
          messageChildren.push(<TouchableOpacity onPress = {function() {navigation.navigate("Chat", {userName: messages[i].userName})}}><View style={styles.section}><Image style = {styles.pfp} source={{uri: imageURI}}/><Text style={styles.userName}>{userName}</Text><Text style={styles.messages}>{message}</Text></View></TouchableOpacity>)
        }
        setChildren(messageChildren)
      }
      getChildren()
    }, []))
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
      borderRadius: 50
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