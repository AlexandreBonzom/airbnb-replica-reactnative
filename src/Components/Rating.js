import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

class Rating extends React.Component {
  render() {
    let rating = [];

    for (let i = 0; i < 5; i++) {
      if (i < this.props.ratingValue) {
        rating.push(
          <Ionicons name="md-star" size={32} color={"#FFB301"} key={i} />
        );
      } else {
        rating.push(
          <Ionicons name="md-star" size={32} color={"#BBBBBB"} key={i} />
        );
      }
    }

    return <Text>{rating}</Text>;
  }
}

export default Rating;
