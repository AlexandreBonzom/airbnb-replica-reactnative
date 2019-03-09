import React from "react";
import { MapView } from "expo";
import {
  Platform,
  ActivityIndicator,
  Text,
  View,
  StyleSheet
} from "react-native";
import axios from "axios";
import { Constants, Location, Permissions } from "expo";
import CustomMarker from "../Components/Marker";
export default class Map extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    roomsAround: []
  };

  static navigationOptions = {
    title: "Map",
    headerStyle: {
      backgroundColor: "#FF595F"
    },
    headerTitleStyle: { color: "white", fontSize: 20, fontWeight: "400" },
    headerTintColor: "white"
  };

  async componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "La géolocalisation ne fonctionne pas sur le simulateur Android, tu peux tester sur ton device !"
      });
    } else {
      this.getLocationAsync();
    }
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission refusée"
      });
    } else {
      const location = await Location.getCurrentPositionAsync({});
      this.setState(
        {
          location: location
        },
        async () => {
          const roomsAround = await axios
            .get(
              `https://airbnb-api.now.sh/api/room/around?longitude=${
                this.state.location.coords.longitude
              }&latitude=${this.state.location.coords.latitude}`
            )
            .then(response => response.data);
          this.setState({ roomsAround: roomsAround });
        }
      );
    }
  };
  onPress = id => {
    this.props.navigation.navigate("Room", { id: id });
  };
  render() {
    if (this.state.errorMessage) {
      return <Text>{this.state.errorMessage}</Text>;
    } else if (this.state.location) {
      if (this.state.roomsAround.length > 0) {
        return (
          <>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.04
              }}
            >
              {this.state.roomsAround.map(room => {
                return (
                  <MapView.Marker
                    key={room._id}
                    coordinate={{
                      latitude: room.loc[1],
                      longitude: room.loc[0]
                    }}
                    onPress={() => this.onPress(room._id)}
                  >
                    <CustomMarker price={room.price} id={room._id} />
                  </MapView.Marker>
                );
              })}
            </MapView>
          </>
        );
      } else {
        return (
          <>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.04
              }}
            />
          </>
        );
      }
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
    justifyContent: "center"
  }
});
