import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View} from 'react-native';
import DropdownComponent from './DropdownComponent';

const SignIn = ({navigation}) => {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
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
      <DropdownComponent/>
      <Button
        title="Sign In"
        onPress={() =>
          navigation.navigate('Dashboard')
        }
      />
      <Button
        title="Sign Up"
        onPress={() =>
          navigation.navigate('Register')
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