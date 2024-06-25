import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, Alert, ScrollView, Image, TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios'
import AppButton from './AppButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileSearchComponent = ({navigation}) => {
    const [profiles, setProfiles] = React.useState([])
    const [bool, setBool] = React.useState(true)
    const [search, setSearch] = React.useState("")
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
    async function queryUsers(querySearch) {
      setSearch(querySearch)
      let token = await AsyncStorage.getItem("token")
      let query = await axios.post('http://10.50.38.167:3300/auth/profilesearch', {sendingQuery: querySearch !== "", query:querySearch, token:token})
      query = query.data
      if (query.success) {
        query = query.result
      }
      let children = []
      for (let i = 0; i < query.length; i++) {
        let userName = query[i].firstName + " " + query[i].lastName + "\n(" + query[i].userName + ")"
        let message = query[i].accountType
        children.push(<TouchableOpacity onPress = {function() {navigation.navigate("Chat", {userName: query[i].userName})}}><View style={styles.section}><Image style = {styles.pfp} source={require('../assets/pfp.png')}/><Text style={styles.userName}>{userName}</Text><Text style={styles.messages}>{message}</Text></View></TouchableOpacity>)
      }
      setProfiles(children)
    }

    async function main() {
      if (!bool) {return 0}
      let token = await AsyncStorage.getItem("token")
      let query = await axios.post('http://10.50.38.167:3300/auth/profilesearch', {sendingQuery: false, token: token})
      query = query.data
      if (query.success) {
        query = query.result
      }
      let children = []
      for (let i = 0; i < query.length; i++) {
        let userName = query[i].firstName + " " + query[i].lastName + "\n(" + query[i].userName + ")"
        let message = query[i].accountType
        children.push(<TouchableOpacity onPress = {function() {navigation.navigate("Chat", {userName: query[i].userName})}}><View style={styles.section}><Image style = {styles.pfp} source={require('../assets/pfp.png')}/><Text style={styles.userName}>{userName}</Text><Text style={styles.messages}>{message}</Text></View></TouchableOpacity>)
      }
      setProfiles(children)
      setBool(false)
    }
    main()
    return (
      <>
      <SearchBar placeholder="Search Here" onChangeText={(text) => queryUsers(text)} value={search} inputContainerStyle={styles.searchBar} style={styles.search}/>
      <ScrollView children={profiles}></ScrollView>
      </>
    );
}

const styles = StyleSheet.create({
    search: {
      zIndex: -10
    },
    section: {
      height: 100,
      borderWidth: 0.5,
      padding: 10,
    },
    pfp: {
      position: "relative",
      left: 10,
      top: 10,
      height: 60,
      width: 60,
    },
    userName: {
      position: 'absolute',
      left: 100,
      fontSize: 15,
      top: 25,
      flex: 1,
      flexWrap: 'wrap'
    },
    messages: {
      position: 'absolute',
      left: 100,
      top: 70,
      color: "gray"
    }
});

export default ProfileSearchComponent;