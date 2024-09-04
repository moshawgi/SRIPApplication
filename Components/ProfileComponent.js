import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, TouchableOpacity, Image, Platform} from 'react-native';
import AppButton from './AppButtonComponent';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppInfo from "../AppInfo";
const IP = AppInfo.IP;

const createFormData = (photo, name, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: name,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

let rand = function() {
  return Math.random().toString(36).substr(2); // remove `0.`
};

let generateToken = function() {
  return rand() + rand() + rand() + "-" + rand() + rand() + rand(); // to make it longer
};

const ProfilePage = ({navigation}) => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [image, setImage] = React.useState(null);

    const addImage = async () => {
      let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });
      console.log(JSON.stringify(_image));
      if (!_image.cancelled) {
        console.log('Image next')
        console.log(_image.assets[0])
        setImage(_image.assets[0]);
      }
    };
    const handleUploadPhoto = async () => {
      let token = await AsyncStorage.getItem("token")
      let photoName = generateToken()
      fetch(`http://' + IP + ':3300/auth/addphoto`, {
        method: 'POST',
        body: createFormData(image, photoName, { firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, token:token, photoName:photoName }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('response', response);
          if (response.message) {
            alert("Success!")
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
    };
  
    return (
      <>
      <View style={imageUploaderStyles.container}>
        {
            image  && <Image source={{ uri: image.uri }} style={{ width: 150, height: 150 }} />
        }
        <View style={imageUploaderStyles.uploadBtnContainer}>
            <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                <Text>{image ? 'Edit' : 'Upload'}</Text>
                <AntDesign name="camera" size={20} color="black" />
            </TouchableOpacity>
        </View>
      </View>
      <TextInput
        style={styles.input}
        onChangeText = {setFirstName}
        placeholder="First Name"/>
      <TextInput
        style={styles.input}
        onChangeText = {setLastName}
        placeholder="Last Name"/>
      <TextInput
        keyboardType = "numeric"
        style={styles.input}
        onChangeText = {setPhoneNumber}
        placeholder="Phone Number"/>
      <View style={styles.saveChanges}>
      <AppButton style={styles.appButtonContainer} title="Save Changes" onPress={handleUploadPhoto}/>
      <AppButton style = {[styles.appButtonContainer, styles.logoutButton]} title="Logout" onPress={() => {AsyncStorage.removeItem("token"); navigation.navigate('Register')}}/>
      </View>
      </>
    );
}

const styles = StyleSheet.create({
  input: {
    height: 55,
    marginVertical: 12,
    marginHorizontal: 25,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#666',
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  saveChanges: {
    marginTop: 60,
    alignItems: 'center',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#0E64D2",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 340,
    height: 55,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: "#0E64D2",
  },
  pfp: {
    position: "relative",
    alignSelf: 'center',
    top: 30,
    height: 150,
    width: 150,
    borderRadius: 75,
    borderColor: '#666',
    borderWidth: 1,
  },
});

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 8,
    height: 150,
    width: 150,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 75,
    overflow: 'hidden',
    marginTop: 60,
    marginBottom: 60,
    alignSelf: 'center',
    borderColor: '#666',
    borderWidth: 1,
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
  }
});

// const styles = StyleSheet.create({
//   input: {
//     height: 50,
//     margin: 12,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//     fontSize: 16,
//     elevation: 2,
//     top: 45
//   },
//   saveChanges: {
//     marginTop: 90,
//     alignItems: 'center',
//   },
//   appButtonContainer: {
//     elevation: 8,
//     backgroundColor: "#6200ea",
//     borderRadius: 25,
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     marginVertical: 10,
//     width: '80%',
//     alignSelf: 'center',
//   },
//   logoutButton: {
//     backgroundColor: "#6200ea",
//   },
//   pfp: {
//     position: "relative",
//     alignSelf: 'center',
//     top: 30,
//     height: 60,
//     width:  60,
//   },
// });

// const imageUploaderStyles = StyleSheet.create({
//   container: {
//     elevation: 4,
//     height: 150,
//     width: 150,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 75,
//     overflow: 'hidden',
//     alignSelf: 'center',
//     marginTop: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   uploadBtnContainer: {
//     position: 'absolute',
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgb(200,200,200)',
//     width: '100%',
//     height: '30%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   uploadBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default ProfilePage