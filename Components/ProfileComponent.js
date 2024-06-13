import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View} from 'react-native';
import DropdownComponent from './DropdownComponent';

const ProfilePage = ({navigation}) => {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [firstName, onChangeFirstName] = React.useState('');
    const [lastName, onChangeLastName] = React.useState('');
    const [age, onChangeAge] = React.useState('');
    return (
      <>
      <TextInput
        style={styles.input}
        onChangeText = {onChangeEmail}
        placeholder="Email"/>
      <TextInput
        secureTextEntry
        style={styles.input}
        onChangeText = {onChangePassword}
        placeholder="Password"/>
      <TextInput
        style={styles.input}
        onChangeText = {onChangeFirstName}
        placeholder="First Name"/>
      <TextInput
        style={styles.input}
        onChangeText = {onChangeLastName}
        placeholder="Last Name"/>
      <TextInput
        keyboardType = "numeric"
        style={styles.input}
        onChangeText = {onChangeAge}
        placeholder="Age"/>
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

export default ProfilePage