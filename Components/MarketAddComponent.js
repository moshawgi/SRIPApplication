import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, ScrollView, Alert} from 'react-native';
import AppButton from './AppButtonComponent.js';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';


const MarketAdd = ({navigation}) => {
    const [address, setAddress] = React.useState('');
    const [zipCode, setZipCode] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [foods, setFoods] = React.useState('');
    const [value, setValue] = React.useState(null);
  
    const countries = ["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","The Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Republic of the Congo","Cook Islands","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Cyprus","Czechia","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands (Islas Malvinas)","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","Gabon","The Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Holy See (Vatican City)","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","North Korea","South Korea","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","North Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Isle of Man","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Federated States of Micronesia","Moldova","Monaco","Mongolia","Montserrat","Morocco","Mozambique","Myanmar (Burma)","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn Islands","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","Spain","Sri Lanka","Sudan","Suriname","Svalbard","Eswatini","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands","Wallis and Futuna","Western Sahara","Western Samoa","Yemen","Democratic Republic of the Congo","Zambia","Zimbabwe","Hong Kong","Macau","Antarctica","Bouvet Island","British Indian Ocean Territory","French Southern and Antarctic Lands","Heard Island and McDonald Islands","Saint Helena","South Georgia and the South Sandwich Islands","Guernsey","Serbia","Saint Barthélemy","Montenegro","Jersey","Curaçao","Saint Martin","Sint Maarten","Timor-Leste","South Sudan","Åland Islands","Bonaire","Republic of Kosovo"]

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

    const options = [];
    
    for (let i = 0; i < countries.length; i++) {
      options.push({label: countries[i], value: countries[i]})
    }

    return (
      <>
      <ScrollView>
      <TextInput
        style={styles.input}
        onChangeText = {setAddress}
        placeholder="Street Address"
        value={address}/>
      <TextInput
        style={styles.input}
        onChangeText = {setZipCode}
        placeholder="Zip Code"
        value={zipCode}/>
      <View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={options}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Country"
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
        />
      </View>
      <TextInput
        style={styles.description}
        onChangeText = {setFoods}
        placeholder="Foods being sold"
        multiline = {true}
        value={foods}/>
      <TextInput
        style={styles.description}
        onChangeText = {setDescription}
        placeholder="Description (include meeting times here)"
        multiline = {true}
        value={description}/>
      <View style={styles.submit}>
      <AppButton
        style={styles.appButtonContainer}
        title="Submit Market"
        onPress={() => {
          axios.post('http://10.50.38.167:3300/auth/marketadd', {
              address:address,
              foods:foods,
              description: description,
              zipCode: zipCode,
              country: value,
          })
          .then(function (response) {
              if (response.data.success) {
                createTwoButtonAlert("Success", response.data.success);
                setAddress("");
                setFoods("");
                setValue(null);
                setDescription("");
                setZipCode("");
              }
              else if (response.data.error) {
                createTwoButtonAlert("Error", response.data.error)
              }
          })
          .catch(function (error) {
              console.log(error);
          });}}
      />
      </View>
      </ScrollView>
      </>
    );
};

// const styles = StyleSheet.create({
//     input: {
//       height: 40,
//       margin: 12,
//       borderWidth: 1,
//       padding: 10,
//     },
//     description: {
//       paddingTop: 10,
//       height: 150,
//       margin: 12,
//       borderWidth: 1,
//       padding: 10,
//       textAlignVertical: 'top'
//     },
//     submit: {
//       top: 75
//     },
//     appButtonContainer: {
//       elevation: 8,
//       backgroundColor: "#009688",
//       borderRadius: 10,
//       paddingVertical: 10,
//       paddingHorizontal: 12,
//       width: 250,
//       alignSelf: 'center'
//     },
//     dropdown: {
//       margin: 12,
//       height: 40,
//       padding: 10,
//       borderWidth: 1,
//     },
//     placeholderStyle: {
//       fontSize: 16,
//     },
//     selectedTextStyle: {
//       fontSize: 16,
//     },
//     iconStyle: {
//       width: 20,
//       height: 20,
//     },
//     inputSearchStyle: {
//       height: 40,
//       fontSize: 16,
//     },
// });
const styles = StyleSheet.create({
  input: {
    height: 50,
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  description: {
    height: 150,
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  submit: {
    marginVertical: 30,
  },
  appButtonContainer: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  dropdown: {
    marginVertical: 10,
    marginHorizontal: 20,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 50,
    fontSize: 16,
  },
});

export default MarketAdd