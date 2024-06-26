import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, ScrollView, Alert} from 'react-native';
import axios from 'axios';
import { registerCustomIconType } from 'react-native-elements';


const Market = ({route, navigation}) => {
    const [address, setAddress] = React.useState('');
    const [foods, setFoods] = React.useState('');
    const [description, setDescription] = React.useState('');
    
    React.useEffect(() => {
        async function getInfo() {
          let market = await axios.post('http://10.50.38.167:3300/auth/getmarket', {"address": route.params.address})
          market = market.data[0]
          console.log(market)
          setFoods(market.foods)
          setDescription(market.description)
          setAddress(market.address)
        }
        getInfo()
    }, [])

    return (
      <>
      <ScrollView>
        <Text style={styles.text}>{address}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>{foods}</Text>
        <Text style={styles.text}></Text>
      </ScrollView>
      </>
    );
};

const styles = StyleSheet.create({
    text: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    description: {
      paddingTop: 10,
      height: 150,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      textAlignVertical: 'top'
    },
    submit: {
      top: 75
    },
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 250,
      alignSelf: 'center'
    },
    dropdown: {
      margin: 12,
      height: 40,
      padding: 10,
      borderWidth: 1,
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

export default Market