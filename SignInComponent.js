import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View} from 'react-native';
import DropdownComponent from './DropdownComponent';

const SignIn = ({navigation}) => {
    const [userName, onChangeUserName] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    return (
      <>
      <TextInput
        style={styles.input}
        onChangeText = {onChangeUserName}
        placeholder="Username"/>
      <TextInput
        secureTextEntry
        style={styles.input}
        onChangeText = {onChangePassword}
        placeholder="Password"/>
      <DropdownComponent/>
      <Button
        title="Sign In"
        onPress={() =>
          navigation.navigate('Profile', {name: userName})
        }
      />
      <Button
        title="Create Account"
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