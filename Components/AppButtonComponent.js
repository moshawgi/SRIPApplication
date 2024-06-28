import * as React from 'react';
import {Button, Text, StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
TouchableOpacity.defaultProps = { activeOpacity: 0.8 }

const AppButton = ({ onPress, title, style }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    appButtonText: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      fontFamily: 'Poppins'
    }
});

export default AppButton