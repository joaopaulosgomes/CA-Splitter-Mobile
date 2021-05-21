import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  Alert
} from "react-native";

export default function TripName ({ route, navigation }) {

  const {token} = route.params;

  const [tripName, setTripName] = useState('Australia2025');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}
        >Add the name of your trip
      </Text>
      <TextInput
        onChangeText={setTripName}
        style={styles.input}
        placeholder="Trip"
        placeholderTextColor="#FFF"
        value={tripName}
      />
      <TouchableOpacity style={styles.button}
        onPress= {()=>navigation.push('AddExpenses', { token: token, tripName: tripName})}
      >
        <Text style={{color: "#57a594"}}>Add Trip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#57a594",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: 250,
    height: 45,
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    color: "#FFF"
  },
  button: {
    width: 250,
    height: 45,
    borderWidth: 2,
    borderColor: "#57a594",
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    paddingBottom: 10,
  }
 
});
