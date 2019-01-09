import React, { Component } from "react";
import {
  Image,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Text,
  View,
  RefreshControl
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";

class Favorites extends Component {
  static navigationOptions = {
    headerTitle: "Favorites"
  };

  render() {
    const { favorites, movies } = this.props; //destructuring from props
    const selected = movies.filter(movie =>
      favorites.some(el => el === movie.id.videoId)
    );
    //favorites.forEach(id => {
    // selected.push(movies.filter(x => x.id.videoId === id));
    // });

    console.log("SELECTED: " + selected);

    console.log("FAV ID: " + favorites);
    //console.log("Movies: " + movies);
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.body}>
            {selected.map((item, i) => (
              <TouchableHighlight
                key={item.id.videoId}
                onPress={() =>
                  navigate("YouTubeVideo", {
                    youtubeId: item.id.videoId
                  })
                }
              >
                <View style={styles.vids}>
                  <Image
                    source={{
                      uri: item.snippet.thumbnails.medium.url
                    }}
                    style={{ width: 320, height: 200 }}
                  />
                  <View style={styles.vidItems}>
                    <Image
                      source={require("../images/NightKing.jpeg")}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        marginRight: 5
                      }}
                    />
                    <Text style={styles.vidText}>{item.snippet.title}</Text>
                    <Icon name="more-vert" size={20} color="#555" />
                  </View>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies.movies,
    favorites: state.favorites
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  vids: {
    paddingBottom: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    borderBottomWidth: 0.6,
    borderColor: "#aaa"
  },
  fav: {
    paddingTop: 10,
    paddingLeft: 5,
    alignItems: "flex-start",
    justifyContent: "space-around"
  },
  vidItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10
  },
  vidText: {
    color: "#000",
    paddingLeft: 20,
    paddingRight: 20
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 0.5,
    borderColor: "#bbb",
    height: 60,
    backgroundColor: "#FFF"
  },
  tabItems: {
    alignItems: "center",
    justifyContent: "center"
  },
  tabTitle: {
    fontSize: 11,
    color: "#3c3c3c",
    paddingTop: 4
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 45,
    borderColor: "#7a42f4",
    borderWidth: 0,
    flex: 1,
    fontSize: 17,
    marginLeft: 10,
    marginRight: 10
  }
});

export default connect(mapStateToProps)(Favorites);
