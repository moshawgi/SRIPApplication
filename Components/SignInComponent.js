import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      <Text style={styles.header}>Sign in below!</Text>
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
                AsyncStorage.setItem("token", response.data.token)
                .then(function() {AsyncStorage.getItem("token").then((response) => {console.log(response)})})
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Dashboard' }],
                });
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
      <View style={styles.signInButton}>
      <Text style={{textDecorationLine: 'underline', top: 8, fontSize: 17}}>Don't have an account yet?</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('Register')}/>
      </View>
      </>
    );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 70,
    marginBottom: 45,
    alignSelf: 'center',
    alignContent: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  subheader: {
    alignSelf: 'center',
    alignContent: 'center',
    marginBottom: 30
  },
  input: {
    height: 55,
    marginVertical: 12,
    marginHorizontal: 25,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#666',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#0E64D2",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: 'center',
    top: 20,
    width: 340,
    height: 55,
    justifyContent: 'center',
    fontSize: 10
  },
  signInButton: {
    position: 'relative',
    top: 60,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  dropdown: {
    marginVertical: 10,
    marginHorizontal: 25,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#666',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 55,
    fontSize: 16,
  },
});

export default SignIn