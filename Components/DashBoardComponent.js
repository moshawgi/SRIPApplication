import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, TouchableOpacity, ScrollView} from 'react-native';
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 }

const DashBoard = ({navigation}) => {
    const [displayMarkets, setDisplayMarkets] = React.useState([])
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [initialRegion, setInitialRegion] = React.useState(null);
    const [markers, setMarkers] = React.useState([<Marker coordinate={{latitude: 0, longitude: 0}} title="Your Location"/>])
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
    useFocusEffect(
    React.useCallback(() => {
      const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          createTwoButtonAlert("Permissions Denied", "Please grant this app location permissions")
          return;
        }
        let location = await Location.getLastKnownPositionAsync({});
        setMarkers([<Marker coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude,}} title="Your Location"/>])
        setCurrentLocation(location.coords);
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        getMarkets(location)
      };
  
      const getMarkets = async (location) => {
        let markets = await axios.post('http://10.50.38.167:3300/auth/marketfind', {
          coordinates: [location.coords.latitude, location.coords.longitude],
          radius: 100000000000000,
          miles: true
        })
        markets = markets.data
        if (!markets.success) {
          return 0;
        }
        markets = markets.result
        let children = []
        for (let i = 0; i < markets.length; i++) {
          children.push(<TouchableOpacity onPress = {function() {navigation.navigate("Market", {address: markets[i].address})}}><View style={styles.section}><Text style={styles.userName}>{markets[i].address}</Text><View style={styles.messages}><Text style={styles.message}>{markets[i].description}</Text></View></View></TouchableOpacity>)
        }
        let newMarkers = [<Marker coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude,}} title="Your Location"/>]
        for (let i = 0; i < markets.length; i++) {
            newMarkers.push(<Marker coordinate={{latitude: markets[i].latitude, longitude: markets[i].longitude,}} title={markets[i].address}/>)
        }
        setMarkers(newMarkers)
        setDisplayMarkets(children)
      }
  
      getLocation();
    }, []))
    return <>
      <View style={styles.container}>
        {initialRegion && (
            <MapView style={styles.map} initialRegion={initialRegion} children={markers}>
            </MapView>
        )}
      </View>
      <ScrollView children={displayMarkets}></ScrollView>
    </>
};

// const styles = StyleSheet.create({
//     section: {
//         height: 100,
//         borderWidth: 0.5,
//         padding: 10,
//         flex: 1,
//         flexWrap: "wrap",
//         textAlign: 'center'
//       },
//       userName: {
//         position: 'absolute',
//         alignSelf: 'center',
//         fontSize: 15,
//         top: 25,
//         flex: 1,
//         flexWrap: 'wrap'
//       },
//       messages: {
//         position: 'absolute',
//         alignSelf: 'center',
//         color: "gray",
//         flex: 1,
//         flexWrap: "wrap",
//         width: 300,
//         textAlign: 'center',
//         bottom: 25
//       },
//       container: {
//         flex: 6,
//         alignItems: "center",
//         justifyContent: "center",
//       },
//       map: {
//         width: "100%",
//         height: "100%",
//       },
// }); 
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
    top: 45,
    justifyContent: 'center',
    height: 50,
    fontSize: 13,
    alignItems: 'center',
    alignContent: 'center'
  },
  message: {
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  container: {
    height: 450,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  map: {
    width: '100%',
    height: '100%',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default DashBoard