import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, Alert, ScrollView, Image, TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios'
import AppButton from './AppButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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
        let userName = query[i].firstName + " " + query[i].lastName
        let message = query[i].accountType
        let imageURI = await axios.post('http://10.50.38.167:3300/auth/checkphoto', {userName: query[i].userName})
        imageURI = imageURI.data
        if (imageURI.result) {
          imageURI = imageURI.result
        }
        else {
          imageURI = "pfp.png"
        }
        imageURI = "http://10.50.38.167:3300/" + imageURI
        children.push(<TouchableOpacity onPress = {function() {navigation.navigate("Chat", {userName: query[i].userName})}}><View style={styles.section}><Image style = {styles.pfp} source={{uri: imageURI}}/><Text style={styles.userName}>{userName}</Text><Text style={styles.messages}>{message}</Text></View></TouchableOpacity>)
      }
      setProfiles(children)
    }
    useFocusEffect(() => {
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
          let userName = query[i].firstName + " " + query[i].lastName
          let message = query[i].accountType
          let imageURI = await axios.post('http://10.50.38.167:3300/auth/checkphoto', {userName: query[i].userName})
          imageURI = imageURI.data
          if (imageURI.result) {
            imageURI = imageURI.result
          }
          else {
            imageURI = "pfp.png"
          }
          imageURI = "http://10.50.38.167:3300/" + imageURI
          children.push(<TouchableOpacity onPress = {function() {navigation.navigate("Chat", {userName: query[i].userName})}}><View style={styles.section}><Image style = {styles.pfp} source={{uri: imageURI}}/><Text style={styles.userName}>{userName}</Text><Text style={styles.messages}>{message}</Text></View></TouchableOpacity>)
        }
        setProfiles(children)
        setBool(false)
      }
      main()})
    return (
      <>
      <SearchBar placeholder="Search Here" onChangeText={(text) => queryUsers(text)} value={search} inputContainerStyle={styles.searchBar} style={styles.search}/>
      <ScrollView children={profiles}></ScrollView>
      </>
    );
}

const styles = StyleSheet.create({
    section: {
      height: 100,
      borderWidth: 0.5,
      borderColor: '#ddd',
      padding: 10,
      flex: 1,
      flexWrap: 'wrap',
      textAlign: 'center',
      backgroundColor: '#f8f8f8',
      borderRadius: 10,
      marginVertical: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    userName: {
      position: 'absolute',
      alignSelf: 'center',
      fontSize: 15,
      fontWeight: '600',
      top: 25,
      flex: 1,
      flexWrap: 'wrap',
      color: '#333',
    },
    messages: {
      position: 'absolute',
      alignSelf: 'center',
      color: 'gray',
      flex: 1,
      flexWrap: 'wrap',
      width: 300,
      textAlign: 'center',
      marginTop: 60,
      fontSize: 13,
    },
    pfp: {
      position: "relative",
      left: 10,
      top: 10,
      height: 60,
      width: 60,
      borderRadius: 50
    },
});

export default ProfileSearchComponent;