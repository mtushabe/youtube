import React, { Component } from "react";
import {
  Image,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  RefreshControl
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { fetchMoviesFromAPI, postFavorites } from "../actions";
import { connect } from "react-redux";
import { Loading } from "./utils/Loading";
import OfflineNotice from "./network/OfflineNotice";

class Home extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#FFF"
    },
    headerLeft: (
      <View style={{ flexDirection: "row", flex: 1 }}>
        <TouchableOpacity>
          <Image
            style={{ height: 22, width: 98, marginLeft: 20 }}
            source={require("../images/youtube.png")}
          />
        </TouchableOpacity>
        <TextInput
          style={{
            height: 45,
            borderColor: "#7a42f4",
            borderWidth: 0,
            flex: 1,
            fontSize: 17,
            marginLeft: 10,
            marginRight: 10
          }}
          autoCorrect={false}
          placeholder="Search.."
          autoCapitalize="none"
          autoFocus={true}
        />
      </View>
    ),
    headerRight: (
      <View
        style={{
          flexDirection: "row",
          marginRight: 20,
          justifyContent: "space-around"
        }}
      >
        <TouchableOpacity>
          <Icon name="search" size={20} color={"#555"} style={{ padding: 5 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            name="account-circle"
            size={20}
            color={"#555"}
            style={{ padding: 5 }}
          />
        </TouchableOpacity>
      </View>
    )
  };
  markFavorites(movieId) {
    this.props.postFavorites(movieId);
  }

  componentDidMount() {
    this.props.getMovies();
  }

  render() {
    const { movies, isFetching, refresh, favorites } = this.props; //destructuring from props
    //console.log("Props: " + this.props);
    //console.log("Movies: " + movies);
    const { navigate } = this.props.navigation;
    if (isFetching) {
      return <Loading />;
    } else {
      return (
        <View style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={refresh} />
            }
          >
            <View style={styles.body}>
              {movies.map((item, i) => (
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
                    <View>
                      <View style={styles.fav}>
                        <TouchableOpacity
                          onPress={() => this.markFavorites(item.id.videoId)}
                        >
                          <Icon
                            name={
                              favorites.some(el => el === item.id.videoId)
                                ? "favorite"
                                : "favorite-border"
                            }
                            size={25}
                            color={
                              favorites.some(el => el === item.id.videoId)
                                ? "#d80000"
                                : "#000"
                            }
                          />
                        </TouchableOpacity>
                      </View>

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
                  </View>
                </TouchableHighlight>
              ))}
            </View>
          </ScrollView>
          <OfflineNotice />
        </View>
      );
    }
  }
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

function mapStateToProps(state) {
  //access whatever we have in our root reducer
  return {
    movies: state.movies.movies,
    isFetching: state.movies.isFetching,
    favorites: state.favorites
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMovies: () => dispatch(fetchMoviesFromAPI()), //dispatch helps execute our actions through reducer
    refresh: () => dispatch(fetchMoviesFromAPI()),
    postFavorites: movieId => dispatch(postFavorites(movieId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
