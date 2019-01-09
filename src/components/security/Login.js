import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logoText}>Welcome to My app.</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Username"
          placeholderTextColor="#ffffff"
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password"
          placeholderTextColor="#ffffff"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)"
  },
  inputBox: {
    width: 300,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff"
  },
  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.3)"
  }
});
