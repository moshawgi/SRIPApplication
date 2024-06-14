import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, Alert} from 'react-native';
import DropdownComponent from './DropdownComponent';
import axios from 'axios'

const SignIn = ({navigation}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
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
      <Button
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
      <Button
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
});

export default SignIn