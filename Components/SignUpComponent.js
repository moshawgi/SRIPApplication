import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, Alert} from 'react-native';
import DropdownComponent from './DropdownComponent';
import axios from 'axios'

const SignUp = ({navigation}) => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [secondPassword, setSecondPassword] = React.useState('');
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
        onChangeText = {setFirstName}
        placeholder="First Name"
        value = {firstName}/>
      <TextInput
        style={styles.input}
        onChangeText = {setLastName}
        placeholder="Last Name"
        value = {lastName}/>
    <TextInput
        style={styles.input}
        onChangeText = {setEmail}
        placeholder="Email"
        value = {email}/>
    <TextInput
        secureTextEntry
        style={styles.input}
        onChangeText = {setPassword}
        placeholder="Password"
        value = {password}/>
     <TextInput
        secureTextEntry
        style={styles.input}
        onChangeText = {setSecondPassword}
        placeholder="Confirm Password"
        value = {secondPassword}/>
      <DropdownComponent/>
      <Button
        title="Create Account"
        onPress={() => {
          if (password !== secondPassword) {
            createTwoButtonAlert("Alert", "Passwords must match!");
            return 0;
          }
          axios.post('http://10.50.38.167:3300/auth/signup', {
              userName:email,
              password:password,
              accountType: "Farmer",
              firstName: firstName,
              lastName: lastName,
              confirmPassword: secondPassword
          })
          .then(function (response) {
              if (response.data.success) {
                createTwoButtonAlert("Success", response.data.success);
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
        title="Sign In"
        onPress={() =>
          navigation.navigate('Login', {name: firstName})
        }
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

export default SignUp