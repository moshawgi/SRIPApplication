import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, Alert, ScrollView, Image, TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios'
import AppButton from './AppButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import AppInfo from "../AppInfo";
const IP = AppInfo.IP;

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
      let query = await axios.post('http://' + IP + ':3300/auth/profilesearch', {sendingQuery: querySearch !== "", query:querySearch, token:token})
      query = query.data
      if (query.success) {
        query = query.result
      }
      let children = []
      for (let i = 0; i < query.length; i++) {
        let userName = query[i].firstName + " " + query[i].lastName
        let message = query[i].accountType
        let imageURI = await axios.post('http://' + IP + ':3300/auth/checkphoto', {userName: query[i].userName})
        imageURI = imageURI.data
        if (imageURI.result) {
          imageURI = imageURI.result
        }
        else {
          imageURI = "pfp.png"
        }
        imageURI = 'http://' + IP + ':3300/' + imageURI
        children.push(<TouchableOpacity onPress = {function() {navigation.navigate("Chat", {userName: query[i].userName})}}><View style={styles.section}><Image style = {styles.pfp} source={{uri: imageURI}}/><Text style={styles.userName}>{userName}</Text><Text style={styles.messages}>{message}</Text></View></TouchableOpacity>)
      }
      setProfiles(children)
    }
    useFocusEffect(() => {
      async function main() {
        if (!bool) {return 0}
        let token = await AsyncStorage.getItem("token")
        let query = await axios.post('http://' + IP + ':3300/auth/profilesearch', {sendingQuery: false, token: token})
        query = query.data
        if (query.success) {
          query = query.result
        }
        let children = []
        for (let i = 0; i < query.length; i++) {
          let userName = query[i].firstName + " " + query[i].lastName
          let message = query[i].accountType
          let imageURI = await axios.post('http://' + IP + ':3300/auth/checkphoto', {userName: query[i].userName})
          imageURI = imageURI.data
          if (imageURI.result) {
            imageURI = imageURI.result
          }
          else {
            imageURI = "pfp.png"
          }
          imageURI = 'http://' + IP + ':3300/' + imageURI
          children.push(<TouchableOpacity key={imageURI + userName} onPress = {function() {navigation.navigate("Chat", {userName: query[i].userName})}}><View style={styles.section}><Image style = {styles.pfp} source={{uri: imageURI}}/><Text style={styles.userName}>{userName}</Text><Text style={styles.messages}>{message}</Text></View></TouchableOpacity>)
        }
        setProfiles(children)
        setBool(false)
      }
      main()})
    return (
      <>
      <View style={styles.container}>
      <Text style={styles.placeholder}></Text>
      <SearchBar round={true} containerStyle={styles.containerStyle} platform="default" lightTheme={true} placeholder="Search Here" onChangeText={(text) => queryUsers(text)} value={search} inputStyle={styles.searchBar} inputContainerStyle={styles.inputContainerStyle} style={styles.search}/>
      <ScrollView children={profiles}></ScrollView>
      </View>
      </>
    );
}

const styles = StyleSheet.create({
    inputContainerStyle: {
      backgroundColor: "#ECECEC"
    },
    containerStyle: {
      backgroundColor: "white"
    },
    placeholder:{
      height: 40,
      backgroundColor: "white"
    },
    container: {
      top: 0
    },
    searchBar: {
      backgroundColor: '#ECECEC'
    },
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
      marginHorizontal: 5
    },
    userName: {
      position: 'absolute',
      left: 90,
      fontSize: 15,
      fontWeight: '600',
      top: 30,
      flex: 1,
      flexWrap: 'wrap',
      color: '#333',
    },
    messages: {
      position: 'absolute',
      left: 90,
      color: 'gray',
      flex: 1,
      flexWrap: 'wrap',
      textAlign: 'center',
      marginTop: 55,
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