import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet
} from "react-native";

class Setting extends React.Component {
  onPressButton = async () => {
    await AsyncStorage.removeItem("userToken");

    this.props.navigation.navigate("Auth");
  };
  onPressButton = async () => {
    await AsyncStorage.removeItem("userToken");

    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddinTop: 50
        }}
      >
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.onPressButton}
        >
          <Text style={styles.buttonText}>Se Déconnecter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: "#FF595F",
    fontSize: 20,
    padding: 10,
    textAlign: "center"
  }

  //   buttonContainer: {
  //     backgroundColor: "black",
  //     marginTop: 30,
  //     width: "50%",
  //     height: 50,
  //     borderRadius: 40
  //   }
});
export default Setting;
