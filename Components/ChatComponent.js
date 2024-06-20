import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, Alert, TouchableOpacity, Image, Keyboard, ScrollView} from 'react-native';

let messages = [{"who": "me", "message": "hi"}, {"who": "me", "message": "how are u"}, {"who": "them", "message": "hi"}, {"who": "them", "message": "i'm doing well thanks"}]

const Chat = ({navigation}) => {
    const [message, setMessage] = React.useState('');
    const [isPressed, setIsPressed] = React.useState(false)

    let views = [<View style={styles.placeHolder}></View>]
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].who === "me") {
        views.push(<View style={styles.myMessage}><Text style={styles.message}>{messages[i].message}</Text></View>)
      }
      else if (messages[i].who === "them") {
        views.push(<View style={styles.theirMessage}><Text style={styles.message}>{messages[i].message}</Text></View>)
      }
    }

    const [messageViews, setMessageViews] = React.useState(views)

    let inputProps = {style: isPressed ? styles.inputHigh : styles.input, onTouchStart:() => {setIsPressed(true)},  placeholder: "Send a message", value: message, onChangeText: setMessage}
    let buttonProps = {style: isPressed ? styles.appButtonContainerHigh : styles.appButtonContainer, onPress:() => {
        setIsPressed(false); 
        Keyboard.dismiss(); 
        messages.push({"who": "me", "message": `${message}`}); 
        views.push(<View style={styles.myMessage}><Text style={styles.message}>{message}</Text></View>)
        setMessageViews(views);
        setMessage("");
      }
    }
    return (
      <>
      <ScrollView style={styles.scrollView} children={messageViews}></ScrollView>
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
    placeHolder: {
      height: 10
    },
    message: {
      textAlign: "center",
      fontSize: 16,
      maxWidth: 250,
      flex: 1,
      flexWrap: "wrap"
    },
    myMessage: {
      position: "relative",
      borderRadius: 10,
      backgroundColor: "#E5E5E5",
      alignContent: "center",
      top: 0,
      alignSelf: "flex-end",
      marginRight: 10,
      marginTop: 5,
      flex: 1,
      flexWrap: "wrap",
      padding: 10
    },
    theirMessage: {
      position: "relative",
      borderRadius: 10,
      backgroundColor: "#E5E5E5",
      verticalAlign: "center",
      marginLeft: 10,
      marginTop: 5,
      alignSelf: "flex-start",
      flex: 1,
      flexWrap: "wrap",
      padding: 10
    },
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