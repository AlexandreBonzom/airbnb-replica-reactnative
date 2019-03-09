import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { withNavigation } from "react-navigation";

class Marker extends React.Component {
  render() {
    const id = this.props.id;
    return (
      <View style={styles.container}>
        <MaterialIcons
          name="chat-bubble"
          size={43}
          color="#FF595F"
          style={styles.priceContainer}
        />
        <Text style={styles.price}>{this.props.price + " €"}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  priceContainer: {
    position: "relative",

    justifyContent: "center",
    alignItems: "center"
  },
  price: {
    color: "white",
    fontWeight: "500",
    position: "absolute",
    top: "20%",
    left: "15%",
    textAlign: "center",
    fontSize: 11
  }
});

export default withNavigation(Marker);
