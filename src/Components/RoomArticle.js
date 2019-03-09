import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Rating from "../Components/Rating";

export default class RoomArticle extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image source={{ uri: this.props.photo }} style={styles.flatPic} />
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{this.props.price} €</Text>
          </View>
        </View>
        <View style={styles.mainInfo}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {this.props.title}
            </Text>
            <View style={styles.reviewsContainer}>
              <Rating ratingValue={this.props.ratingValue} />
              <Text style={styles.reviews}>
                {this.props.numberReviews + " Reviews"}
              </Text>
            </View>
          </View>
          <View style={styles.userPicContainer}>
            <Image
              source={{ uri: this.props.userPicture }}
              style={styles.userPicture}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#D8D8D8",
    marginBottom: 20,

    alignItems: "center"
  },
  flatPic: {
    height: 175,
    width: 310,
    resizeMode: "cover",
    position: "relative"
  },
  priceContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    height: 50,
    width: 75,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  price: {
    color: "white",
    fontWeight: "500",
    fontSize: 18
  },
  titleContainer: {
    flex: 4
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
    paddingBottom: 10,
    paddingRight: 10
  },

  userPicContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  userPicture: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 30
  },

  mainInfo: {
    flexDirection: "row",

    justifyContent: "space-between",
    paddingVertical: 10
  },

  reviewsContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  reviews: {
    color: "#BBBBBB",
    paddingLeft: 6,
    fontSize: 15
  }
});
