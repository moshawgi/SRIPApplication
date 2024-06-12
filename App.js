import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { requestBackgroundPermissionsAsync } from 'expo-location';

const Stack = createNativeStackNavigator();

const DropdownComponent = () => {
  const [value, setValue] = React.useState(null);

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

  return (
    <View>
      <Dropdown
        style={styles. dropdown}
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
  );
};

const SignUp = ({navigation}) => {
  const [firstName, onChangeFirstName] = React.useState('');
  const [lastName, onChangeLastName] = React.useState('');
  return (
    <>
    <TextInput
      style={styles.input}
      onChangeText = {onChangeFirstName}
      placeholder="First Name"/>
    <TextInput
      style={styles.input}
      onChangeText = {onChangeLastName}
      placeholder="Last Name"/>
    <DropdownComponent/>
    <Button
      title="Create Account"
      onPress={() =>
        navigation.navigate('Profile', {name: firstName})
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
const ProfileScreen = ({navigation, route}) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

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

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={SignUp} options={{title: 'Register'}}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="Login" component={SignIn} options={{title: 'Login'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
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

export default MyStack;