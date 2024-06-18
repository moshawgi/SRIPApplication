import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, Alert} from 'react-native';
import DropdownComponent from './DropdownComponent';
import axios from 'axios'
import AppButton from './AppButtonComponent';

const SignIn = ({navigation}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const createTwoButtonAlert = (title, message) => {
      output = "cancel"
      Alert.alert(title, message, [
        {text: 'OK', onPress: () => {}},
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ])
    };
    return (
      <>
      <TextInput
        style={styles.input}
        onChangeText = {setEmail}
        placeholder="Email"/>
      <TextInput
        secureTextEntry
        style={styles.input}
        onChangeText = {setPassword}
        placeholder="Password"/>
      <AppButton
        style = {styles.appButtonContainer}
        title="Sign In"
        onPress={() => {
            axios.post('http://10.50.38.167:3300/auth/login', {
                userName:email,
                password:password
            })
            .then(function (response) {
              if (response.data.success) {
                createTwoButtonAlert("Success", response.data.success)
                navigation.navigate('Dashboard')
              }
              else if (response.data.error) {
                createTwoButtonAlert("Error", response.data.error)
              }
            })
            .catch(function (error) {
                console.log(error);
            });
          }
        }
      />
      <AppButton
        style = {[styles.appButtonContainer, styles.signUpContainer]}
        title="Sign Up"
        onPress={() => {
            navigation.navigate('Register')
          }
        }
      />
      </>
    );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 250,
      alignSelf: 'center',
      top: 20
    },
    signUpContainer: {
      top: 50
    }
});

export default SignIn