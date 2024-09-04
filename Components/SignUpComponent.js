import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, Alert} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import AppButton from './AppButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppInfo from "../AppInfo";
const IP = AppInfo.IP;

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
      <Text style={styles.header}>Create an account</Text>
      <Text style={styles.subheader}>Connect with people near you today!</Text>
      <TextInput
        style={styles.input}
        onChangeText = {setFirstName}
        placeholder="Enter Your First Name"
        value = {firstName}/>
      <TextInput
        style={styles.input}
        onChangeText = {setLastName}
        placeholder="Enter Your Last Name"
        value = {lastName}/>
    <TextInput
        style={styles.input}
        onChangeText = {setEmail}
        placeholder="Enter Your Email"
        value = {email}/>
    <TextInput
        secureTextEntry
        style={styles.input}
        onChangeText = {setPassword}
        placeholder="Enter Your Password"
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
          axios.post('http://' + IP + ':3300/auth/signup', {
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
      <View style={styles.signInButton}>
      <Text style={{textDecorationLine: 'underline', top: 8, fontSize: 17}}>Already have an account?</Text>
      <Button title="Sign In" onPress={() => navigation.navigate('Login')}/>
      </View>
      </>
    );
};

const styles = StyleSheet.create({
    header: {
      marginTop: 70,
      marginBottom: 15,
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

export default SignUp