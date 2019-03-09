import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  KeyboardAvoidingView,
  TouchableHighlight,
  TextInput
} from "react-native";

import axios from "axios";

export default class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    confirmedPassword: "",
    username: ""
  };
  static navigationOptions = {
    headerTitleStyle: { color: "white", fontSize: 20, fontWeight: "400" },
    headerTintColor: "white",

    headerStyle: { backgroundColor: "#FF595F", borderBottomWidth: 0 }
  };
  onPressButtonSignUp = async () => {
    const password = this.state.password;
    const email = this.state.email;
    const confirmedPassword = this.state.confirmedPassword;
    const username = this.state.username;
    if (confirmedPassword === password) {
      try {
        const response = await axios.post(
          "https://airbnb-api.now.sh/api/user/sign_up",
          { email: email, password: password, username: username }
        );
        if (response.data.token) {
          try {
            await AsyncStorage.setItem("userToken", response.data.token);

            this.props.navigation.navigate("AuthLoading");
          } catch (error) {
            alert(error.message);
          }
        }
      } catch (error) {
        alert(error.message);
      }
    }

    this.props.navigation.navigate("App");
  };
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled
        keyboardVerticalOffset={110}
      >
        <Text style={styles.welcome}>Inscrivez-vous</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          keyboardType={"email-address"}
          style={styles.textinput}
          autoCapitalize={"none"}
          autoCorrect={false}
        />
        <Text style={styles.label}>Pseudonyme</Text>
        <TextInput
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
          style={styles.textinput}
          autoCapitalize={"none"}
          autoCorrect={false}
        />
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          secureTextEntry={true}
          style={styles.textinput}
        />
        <Text style={styles.label}>Confirmer votre mot de passe</Text>
        <TextInput
          onChangeText={confirmedPassword =>
            this.setState({ confirmedPassword })
          }
          value={this.state.confirmedPassword}
          secureTextEntry={true}
          style={styles.textinput}
        />

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
    paddingBottom: 15,
    fontWeight: "400"
  },
  label: {
    width: "80%",
    textAlign: "left",
    paddingTop: 20,
    fontWeight: "500",
    fontSize: 15,
    paddingLeft: 10,
    color: "#BA4F53"
  },
  textinput: {
    color: "white",
    borderBottomWidth: 0.5,
    borderColor: "white",
    width: "80%",
    paddingHorizontal: 10,
    paddingBottom: 10,
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
