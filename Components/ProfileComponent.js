import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, TouchableOpacity, Image} from 'react-native';
import AppButton from './AppButtonComponent';

const ProfilePage = ({navigation}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [age, setAge] = React.useState('');
    return (
      <>
      <Image style = {styles.pfp} source={require('../assets/pfp.png')}/>
      <TextInput
        style={styles.input}
        onChangeText = {setEmail}
        placeholder="Email"/>
      <TextInput
        secureTextEntry
        style={styles.input}
        onChangeText = {setPassword}
        placeholder="Password"/>
      <TextInput
        style={styles.input}
        onChangeText = {setFirstName}
        placeholder="First Name"/>
      <TextInput
        style={styles.input}
        onChangeText = {setLastName}
        placeholder="Last Name"/>
      <TextInput
        keyboardType = "numeric"
        style={styles.input}
        onChangeText = {setAge}
        placeholder="Age"/>
      <View style={styles.saveChanges}>
      <AppButton style = {styles.appButtonContainer} title="Save Changes"/>
      </View>
      </>
    );
}

const styles = StyleSheet.create({
    input: {
      position: "relative",
      top: 40,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    pfp: {
      position: "relative",
      left: 20,
      top: 20,
      height: 60,
      width: 60,
      color: "#A9A9A9"
    },
    saveChanges: {
      position: "relative",
      top:250,
      width: 200,
      left: 90
    },
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 250,
      alignSelf: 'center'
    }
});

export default ProfilePage