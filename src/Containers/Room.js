import React from "react";
import { ActivityIndicator, StyleSheet, Text, View, Image } from "react-native";

import axios from "axios";
import { MapView } from "expo";
import Swiper from "react-native-swiper";
import Rating from "../Components/Rating";
export default class Room extends React.Component {
  state = {
    room: {}
  };

  static navigationOptions = {
    title: "Room",
    headerStyle: {
      backgroundColor: "#FF595F"
    },
    headerTitleStyle: { color: "white", fontSize: 20, fontWeight: "400" },
    headerTintColor: "white"
  };

  componentDidMount = async () => {
    const roomId = this.props.navigation.getParam("id");
    const response = await axios
      .get(`https://airbnb-api.now.sh/api/room/${roomId}`)
      .then(response => response.data);

    this.setState({ room: response });
  };

  render() {
    if (this.state.room._id !== undefined) {
      return (
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Swiper
              style={styles.wrapper}
              showsButtons={true}
              showsPagination={false}
            >
              {this.state.room.photos.map((photo, index) => {
                return (
                  <View key={index} style={{ flex: 1 }}>
                    <Image source={{ uri: photo }} style={styles.flatPic} />
                  </View>
                );
              })}
            </Swiper>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{this.state.room.price} €</Text>
            </View>
          </View>
          <View style={styles.information}>
            <View style={styles.mainInfo}>
              <View>
                <Text style={styles.title} numberOfLines={1}>
                  {this.state.room.title}
                </Text>
                <View style={styles.ratingContainer}>
                  <Rating ratingValue={this.state.room.ratingValue} />

                  <Text style={styles.reviews}>
                    {this.state.room.reviews} reviews
                  </Text>
                </View>
              </View>

              <Image
                style={styles.userPicture}
                source={{ uri: this.state.room.user.account.photos[0] }}
              />
            </View>
            <View>
              <Text numberOfLines={3} style={styles.description}>
                {this.state.room.description}
              </Text>
            </View>
            <View style={{ width: "100%", height: 150 }}>
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: this.state.room.loc[1],
                  longitude: this.state.room.loc[0],
                  latitudeDelta: 0.009,
                  longitudeDelta: 0.004
                }}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: this.state.room.loc[1],
                    longitude: this.state.room.loc[0]
                  }}
                />
              </MapView>
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  flatPic: {
    flex: 1,

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
  wrapper: {},
  information: {
    flex: 1,
    padding: 20,
    width: "100%"
  },
  mainInfo: {
    flexDirection: "row",
    width: "80%",
    marginBottom: 30
  },
  title: {
    fontSize: 20,
    paddingRight: 20
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  description: {
    fontSize: 17,
    marginBottom: 30
  },

  userPicture: {
    height: 70,
    width: 70,
    borderRadius: 35
  },

  reviews: {
    color: "#BBBBBB",
    paddingLeft: 6,
    fontSize: 15
  }
});
