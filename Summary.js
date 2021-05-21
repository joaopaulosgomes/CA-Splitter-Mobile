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

export default function AddExpenses({ route }) {

  const { token, tripName} = route.params;

  const [havePaid, setHavePaid] = useState('');
  const [needToPay, setNeedToPay] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [nPurchase, setnPurchase] = useState('');
  const [highExpense1, setHighExpense1] = useState('');
  const [highExpense2, setHighExpense2] = useState('');
  const [lowExpense1, setLowExpense1] = useState('');
  const [lowExpense2, setLowExpense2] = useState('');
  const [avgExpense, setAvgExpense] = useState('');

  const [summary, setMySummary] = useState('');


  async function getSummary() {
    fetch(`http://localhost:8080/${tripName}/summary`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
    // Handle success
    .then(function(response) {
      if(response.ok) {
        response.text()
        .then(function(text) {
          setMySummary(text);
        });
      } else {
        console.log('Network response was not ok.');
        alert("You havent added expenses yet!");
      }
    })
    loadData();
  }

  async function loadData(){
    var message = summary.split(":")

    setHavePaid(message[0])
    setNeedToPay(message[1])
    setTotalAmount(message[2])
    setnPurchase(message[3])

    setHighExpense1(message[4])
    setHighExpense2(message[5])

    setLowExpense1(message[6])
    setLowExpense2(message[7])

    setAvgExpense(message[8])
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>----------------------</Text>
      <Text style={styles.text}
        >This user has paid
      </Text>
      <Text style={styles.text}
        >€{havePaid}
      </Text>
      <Text>----------------------</Text>
      <Text style={styles.text}
        >Need to pay
      </Text>
      <Text style={styles.text}
        >€{needToPay}
      </Text>

      <Text>----------------------</Text>
      <Text style={styles.text}
        >The total of expenses are
      </Text>
      <Text style={styles.text}
        >€{totalAmount}
      </Text>
      <Text>----------------------</Text>
      <Text style={styles.text}
        >Number of itens purchased:
      </Text>
      <Text style={styles.text}
        >{nPurchase}
      </Text>
      <Text>----------------------</Text>
      <Text style={styles.text}
        >Your highest expense was: {highExpense1}
      </Text>
      <Text style={styles.text}
        >And that costs €{highExpense2}
      </Text>
      <Text>----------------------</Text>
      <Text style={styles.text}
        >Your lowest expense was: {lowExpense1}
      </Text>
      <Text style={styles.text}
        >And that costs €{lowExpense2}
      </Text>
      <Text>----------------------</Text>
      <Text style={styles.text}
        >Your average is:
      </Text>
      <Text style={styles.text}
        >€{avgExpense}
      </Text>
      <Text>----------------------</Text>
      <TouchableOpacity style={styles.buttonClose}
        onPress={getSummary}
      >
        <Text style={{color: "#57a594"}}>Update</Text>
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
    fontSize: 16,
    paddingBottom: 10,
  },
  logo: {
    width: 120,
    height: 180,
    marginBottom:10
  },
 
});
