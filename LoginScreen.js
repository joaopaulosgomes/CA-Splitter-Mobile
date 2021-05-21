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

export default function LoginScreen ({ navigation }) {
  
  const [token, setToken] = useState('id_token');
  const [username, setUsername] = useState('David');
  const [password, setPassword] = useState('myS3cret');

  useEffect(
    () => {
      if(token!='id_token' && token!='Username or/and Password are incorrect. Please Try again!'){
        navigation.push('TripName', {token:token})
        console.log(token)
      }
    },[token]);

  async function fetchLogin() { 
    fetch('http://localhost:8080/login?username='+username+'&password='+password)
    .then((res) => res.text())
    .then((text) => setToken(text))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("./assets/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.loginText}
        >Wellcome to WeSplitIt
      </Text>

      <Text style={styles.loginText}
        >Press the button to log in
      </Text>
      <TextInput
        onChangeText={setUsername}
        style={styles.input}
        placeholder="User"
        placeholderTextColor="#FFF"
        value={username}
      />
      <TextInput
        onChangeText={setPassword}
        style={styles.input}
        placeholder="Password"
        //secureTextEntry={true}
        placeholderTextColor="#FFF"
        value={password}
      />
      <TouchableOpacity style={styles.button}

        onPress= {fetchLogin}
      >
        <Text style={{color: "#57a594"}}>Log in</Text>
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
  loginText: {
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
