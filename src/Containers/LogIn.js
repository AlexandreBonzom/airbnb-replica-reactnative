import React from "react";
import {
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  KeyboardAvoidingView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default class LogIn extends React.Component {
  state = {
    email: "",
    password: ""
  };

  static navigationOptions = {
    header: null,
    headerBackTitle: null
  };

  onPressButtonLogIn = async () => {
    email = this.state.email;
    password = this.state.password;
    try {
      const response = await axios.post(
        "https://airbnb-api.now.sh/api/user/log_in",
        { email: email, password: password }
      );
      if (response.data.token) {
        await AsyncStorage.setItem("userToken", response.data.token);

        this.props.navigation.navigate("App");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  onPressButtonSignUp = () => {
    this.props.navigation.navigate("SignUp");
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled
        keyboardVerticalOffset={-150}
      >
        <StatusBar barStyle="light-content" />
        <Ionicons name="md-home" size={120} color="white" />
        <Text style={styles.welcome}>Welcome</Text>
        <TextInput
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          keyboardType={"email-address"}
          style={styles.textinput}
          autoCapitalize={"none"}
          autoCorrect={false}
          placeholder={"john.doe@mail.com"}
        />
        <TextInput
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          secureTextEntry={true}
          style={styles.textinput}
          placeholder={"password"}
        />

        <TouchableHighlight
          onPress={this.onPressButtonLogIn}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={this.onPressButtonSignUp}
        >
          <Text style={styles.buttonText}>S'Inscrire</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF595F",
    alignItems: "center",
    justifyContent: "center"
    // paddingTop: getStatusBarHeight()
  },
  welcome: {
    color: "white",
    fontSize: 40,
    paddingBottom: 50,
    fontWeight: "400"
  },

  textinput: {
    color: "white",
    borderBottomWidth: 0.5,
    borderColor: "white",
    width: "80%",
    padding: 10,
    fontSize: 20
  },
  buttonText: {
    color: "#FF595F",
    fontSize: 20,
    padding: 10,
    textAlign: "center"
  },

  buttonContainer: {
    backgroundColor: "white",
    marginTop: 30,
    width: "40%",
    height: 50,
    borderRadius: 40
  }
});
