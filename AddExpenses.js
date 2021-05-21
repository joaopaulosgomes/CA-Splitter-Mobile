import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList
} from "react-native";

export default function AddExpenses({ route, navigation }) {
  
  const { token, tripName} = route.params;
  
  const [description, setDescription] = useState('Food');
  const [amount, setAmount] = useState(3);
  const [data, setMyData] = useState([]);

  let myData = {
    description: `${description}`,
    amount: `${amount}`
  }

  async function fetchExpense() { 
    fetch(`http://localhost:8080/${tripName}/expense`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myData)
    })
    // Handle success
    .then(response => response.json())  // convert to json
    .then(json => console.log(json))    //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
  }

  async function fetchTRIP() { 
    fetch(`http://localhost:8080/${tripName}`, {
      method: 'GET', redirect: 'follow',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    // Handle success
    .then(response => response.json())  // convert to json
    .then(json => setMyData(json))    //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
  }

  async function closeTrip() {
    fetch(`http://localhost:8080/${tripName}/close`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    // Handle success
    .then(function(response) {
      if(response.ok) {
        response.text()
        .then(function(text) {
          alert(text);
        });
      } else {
        alert("Start adding expense to this trip before closing it!");
      }
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button}
        onPress= {()=>navigation.push('Summary', { token: token, tripName: tripName})}
      >
        <Text style={{color: "#57a594"}}>Get Summary</Text>
      </TouchableOpacity>
      <TextInput
        onChangeText={setDescription}
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#FFF"
        value={description}
      />

      <TextInput
        onChangeText={setAmount}
        style={styles.input}
        placeholder="Amount (€)"
        placeholderTextColor="#FFF"
        value={amount}
      />
      <TouchableOpacity style={styles.buttonAdd}
        onPress = {fetchExpense}
      >
        <Text style={{color: "#57a594"}}>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonAdd}
        onPress = {fetchTRIP}
      >
        <Text style={{color: "#57a594"}}>Get expenses</Text>
      </TouchableOpacity>

      <FlatList style={styles.text}
        data={data}
        keyExtractor={({item},index)=>item}
        renderItem={ ({item})=>[  
          <text><b>Description: </b>{item.description}</text>,
          <text><b>Amount: </b>{item.amount}</text>,
          <text><b>Username: </b>{item.username}</text>,
          <text>:::::::::::::::::::::::::::::::::</text>
        ]}
      />

      <TouchableOpacity style={styles.button}
        onPress = {closeTrip}
      >
        <Text style={{color: "#57a594"}}>Close Trip</Text>
        
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}
      onPress= {()=>navigation.push('SearchExpense', { token: token, tripName: tripName})}
      >
        <Text style={{color: "#57a594"}}>Search</Text>
        
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
  buttonAdd: {
    width: 120,
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  text: {
    color: "#FFF",
    fontSize: 18,
    paddingBottom: 10,
    fontWeight: 'normal',
  },
 
});
