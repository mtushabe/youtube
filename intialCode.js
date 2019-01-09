import React, { Component } from "react";
import {
  Image,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  View
} from "react-native";
import { ProgressDialog } from "react-native-simple-dialogs";
import { createStackNavigator } from "react-navigation";
import YouTube from "react-native-youtube";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import YouTubeVideo from "./components/YouTubeVideo";
import { Provider } from "react-redux"; //hook the store with the app with the provider
import Todo from "./components/Todo";
import moviesReducer from "../reducers/movies";

const apiKey = "AIzaSyBJ3ntReiv0L19H2RoYW62LpRdIuyPhIpw";
const channelId = "UCQzdMyuz0Lf4zo4uGcEujFw";
const results = 30;
const { data, isFetching } = movies;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#FFF"
    },
    headerLeft: (
      <TouchableOpacity>
        <Image
          style={{ height: 22, width: 98, marginLeft: 20 }}
          source={require("./images/youtube.png")}
        />
      </TouchableOpacity>
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

  componentDidMount() {
    fetch(
      "https://www.googleapis.com/youtube/v3/search/?key=AIzaSyBJ3ntReiv0L19H2RoYW62LpRdIuyPhIpw&channelId=UCQzdMyuz0Lf4zo4uGcEujFw&part=snippet,id&order=date&maxResults=30"
    )
      .then(res => res.json())
      .then(res => {
        const videoId = [];
        res.items.forEach(item => {
          videoId.push(item); //data from the api being push to into the videoId array
        });
        this.setState({
          progressVisible: true,
          isLoading: false,
          data: videoId
        });
      })
      .catch(error => {
        isLoading: false;
        console.error(error);
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ProgressDialog
            visible={this.state.progressVisible}
            title="Loading."
            message="Please, wait..."
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.body}>
              {this.state.data.map((item, i) => (
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
                        source={require("./images/NightKing.jpeg")}
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
          <View style={styles.tabBar}>
            <TouchableOpacity style={styles.tabItems}>
              <Icon name="home" size={20} />
              <Text style={styles.tabTitle}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItems}>
              <Icon name="whatshot" size={20} />
              <Text style={styles.tabTitle}>Trending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabItems}
              onPress={() => this.props.navigation.navigate("Todo")}
            >
              <Icon name="subscriptions" size={20} />
              <Text style={styles.tabTitle}>To do</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItems}>
              <Icon name="folder" size={20} />
              <Text style={styles.tabTitle}>Library</Text>
            </TouchableOpacity>
          </View>
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

  vidItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10
  },
  vidText: {
    color: "#000",
    padding: 20
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
  }
});

export default (screens = createStackNavigator({
  Home: { screen: Home },
  Todo: Todo, //this is the new way of doing it in V2
  YouTubeVideo: { screen: YouTubeVideo }
}));
