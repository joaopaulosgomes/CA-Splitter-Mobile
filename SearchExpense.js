import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  Alert, FlatList, View
} from "react-native";



export default function SearchExpenses({ route, navigation }) {

  const { token, tripName} = route.params;

  const [searchText, setSearchText] = useState('');
  const [data, setMyData] = useState([]);
  
  async function fetchSearch() { 
    fetch(`http://localhost:8080/search?search=${searchText}`, {
      method: 'GET', redirect: 'follow',
      headers: {
        'Authorization': 'Bearer ' + token,
      }})
    // Handle success
    .then(response => response.json())  // convert to json
    .then(json => setMyData(json))    //print data to console
    .catch(err => console.log('Request Failed', err));// Catch errors
  }

  return (
    <SafeAreaView style={styles.container}>
       <TextInput
        onChangeText={setSearchText}
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#FFF"
      />

      <TouchableOpacity style={styles.buttonClose}
        onPress = {fetchSearch}
      >
        <Text style={{color: "#57a594"}}>Search</Text>
      </TouchableOpacity>
    
     
      <FlatList style={styles.text}
        data={data}
        keyExtractor={({item},index)=>item}
        renderItem={ ({item})=>[  
          <text><b>Description: </b>{item.description}</text>,
          <text><b>Amount: </b>{item.amount}</text>,
          <text><b>Username: </b>{item.username}</text>,
          <text>------------------------------</text>
        ]}
      />
    
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
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10
  },
  button: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: "#FFF",
    backgroundColor: "#57a594",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonClose: {
    width: 200,
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
    fontSize: 18,
    paddingBottom: 10,
    fontWeight: 'normal',
  },
 
});
