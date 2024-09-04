import React, { useEffect, useState } from "react";
import {StyleSheet, View, TouchableOpacity, Text, Dimensions, Image} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import axios from 'axios';
import AppInfo from "../AppInfo";
const IP = AppInfo.IP;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Waiting_Driver_Screen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [markers, setMarkers] = useState([<Marker coordinate={{latitude: 0, longitude: 0}} title="Your Location"/>])


  const createTwoButtonAlert = (title, message) => {
    output = "cancel"
    Alert.alert(title, message, [
      {text: 'OK', onPress: () => {}},
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
    ])
  };

  useEffect(() => {
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
      let markets = await axios.post('http://' + IP + ':3300/auth/marketfind', {
        coordinates: [location.coords.latitude, location.coords.longitude],
        radius: 10,
        miles: true
      })
      markets = markets.data
      if (!markets.success) {
        return 0;
      }
      markets = markets.result
      let newMarkers = [<Marker coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude,}} title="Your Location"/>]
      for (let i = 0; i < markets.length; i++) {
        newMarkers.push(<Marker coordinate={{latitude: markets[i].latitude, longitude: markets[i].longitude,}} title={markets[i].address}/>)
      }
      setMarkers(newMarkers)
    }

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion} children={markers}>
        </MapView>
      )}
    </View>
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
});

export default Waiting_Driver_Screen;