import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, Alert, ScrollView, Image, TouchableOpacity} from 'react-native';
import * as Location from "expo-location";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const MarketSearchComponent = ({navigation}) => {
    const [displayMarkets, setDisplayMarkets] = React.useState([])
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

    React.useEffect(() => {
      const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          createTwoButtonAlert("Permissions Denied", "Please grant this app location permissions")
          return;
        }
        let location = await Location.getLastKnownPositionAsync({});
        getMarkets(location)
      };
  
      const getMarkets = async (location) => {
        let markets = await axios.post('http://10.50.38.167:3300/auth/marketfind', {
          coordinates: [location.coords.latitude, location.coords.longitude],
          radius: 10,
          miles: true
        })
        markets = markets.data
        if (!markets.success) {
          return 0;
        }
        markets = markets.result
        let children = []
        for (let i = 0; i < markets.length; i++) {
          children.push(<TouchableOpacity onPress = {function() {navigation.navigate("Market", {address: markets[i].address})}}><View style={styles.section}><Text style={styles.userName}>{markets[i].address}</Text><Text style={styles.messages}>{markets[i].description}</Text></View></TouchableOpacity>)
        }
        setDisplayMarkets(children)
      }
  
      getLocation();
    }, []);

    return (
      <>
      <ScrollView children={displayMarkets}></ScrollView>
      </>
    );
}

const styles = StyleSheet.create({
  section: {
    height: 100,
    borderWidth: 0.5,
    padding: 10,
    flex: 1,
    flexWrap: "wrap",
    textAlign: 'center'
  },
  userName: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 15,
    top: 25,
    flex: 1,
    flexWrap: 'wrap'
  },
  messages: {
    position: 'absolute',
    alignSelf: 'center',
    color: "gray",
    flex: 1,
    flexWrap: "wrap",
    width: 300,
    textAlign: 'center',
    bottom: 10
  }
});

export default MarketSearchComponent;