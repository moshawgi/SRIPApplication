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
      {/* <ScrollView>
        <Text style={[styles.text, styles.header]}>Address:</Text>
        <Text style={styles.text}>{address}</Text>
        <Text style={styles.text}></Text>
        <Text style={[styles.text, styles.header]}>Description:</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}></Text>
        <Text style={[styles.text, styles.header]}>Foods:</Text>
        <Text style={styles.text}>{foods}</Text>
      </ScrollView> */}
    <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.section}>
                <Text style={styles.header}>Address:</Text>
                <Text style={styles.text}>{address}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Description:</Text>
                <Text style={styles.text}>{description}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Foods:</Text>
                <Text style={styles.text}>{foods}</Text>
            </View>
    </ScrollView>
      </>
    );
};

// const styles = StyleSheet.create({
//   header: {
//     fontWeight: "bold",
//     fontSize: 30
//   },
//   text: {
//     fontSize: 16,
//     color: '#333',
//     margin: 12,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//   },
// });

const styles = StyleSheet.create({
  container: {
      flexGrow: 1,
      backgroundColor: '#f5f5f5',
      paddingVertical: 20,
      paddingHorizontal: 16,
  },
  section: {
      marginBottom: 20,
  },
  header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333',
  },
  text: {
      fontSize: 16,
      color: '#666',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 12,
      backgroundColor: '#fff',
  },
});

export default Market