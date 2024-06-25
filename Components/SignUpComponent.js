import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, Alert} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import AppButton from './AppButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({navigation}) => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('')
    const [secondPassword, setSecondPassword] = React.useState('');
    const [value, setValue] = React.useState(null);

    async function main() {
      let token = await AsyncStorage.getItem("token")
      if (token) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      }
    }
    main()

    const placeholder = {
      label: 'What Type of User Will You Be',
      value: null,
    };
  
    const options = [
      { label: 'Farmer', value: 'Farmer' },
      { label: 'Market Owner', value: 'Market Owner' },
      { label: 'Consumer', value: 'Consumer' },
      { label: 'Transporter', value: 'Transporter' },
    ];

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
      <View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={options}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select your user type"
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
        />
      </View>
      <AppButton
        style = {styles.appButtonContainer}
        title="Create Account"
        onPress={() => {
          console.log(value)
          if (password !== secondPassword) {
            createTwoButtonAlert("Alert", "Passwords must match!");
            return 0;
          }
          axios.post('http://10.50.38.167:3300/auth/signup', {
              userName:email,
              password:password,
              accountType: value,
              firstName: firstName,
              lastName: lastName,
              confirmPassword: secondPassword,
          })
          .then(function (response) {
              if (response.data.success) {
                createTwoButtonAlert("Success", response.data.success);
                navigation.navigate('Login')
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
        style = {[styles.appButtonContainer, styles.signInContainer]}
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
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 250,
      alignSelf: 'center',
      top: 60
    },
    signInContainer: {
      top: 90
    },
    dropdown: {
      margin: 16,
      height: 50,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
});

export default SignUp