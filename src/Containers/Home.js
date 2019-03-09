import React from "react";
import {
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import RoomArticle from "../Components/RoomArticle";

import { FontAwesome } from "@expo/vector-icons";

export default class Home extends React.Component {
  state = {
    rooms: []
  };

  componentDidMount = async () => {
    try {
      const response = await axios
        .get("https://airbnb-api.now.sh/api/room?city=paris")
        .then(response => response.data);

      this.setState({ rooms: response.rooms });
    } catch (error) {
      alert(error.message);
    }
  };

  onPress = roomId => {
    this.props.navigation.navigate("Room", { id: roomId });
  };

  goToMap = () => {
    this.props.navigation.navigate("Map");
  };

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.onPress(item._id)}
      >
        <RoomArticle
          id={item._id}
          photo={item.photos[0]}
          title={item.title}
          ratingValue={item.ratingValue}
          price={item.price}
          userPicture={item.user.account.photos[0]}
          numberReviews={item.reviews}
        />
      </TouchableOpacity>
    );
  };

  render() {
    if (this.state.rooms.length > 0) {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View>
            <FlatList
              data={this.state.rooms}
              keyExtractor={item => item._id}
              renderItem={this._renderItem}
              style={{ padding: 10 }}
            />
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={this.goToMap}>
                <FontAwesome name="map-marker" size={32} color="#08A79A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  iconContainer: {
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 10,
    right: 0,
    backgroundColor: "lightgrey",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  }
});
