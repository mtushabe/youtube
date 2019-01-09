import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Todo from "./Todo";
import Home from "./Home";
import Favorites from "./Favorites";
import YouTubeVideo from "./YouTubeVideo";
import Icon from "react-native-vector-icons/MaterialIcons";

const HomeStack = createStackNavigator({
  Home: {
    screen: Home
  },
  YouTubeVideo: {
    screen: YouTubeVideo
  }
});

const TodoStack = createStackNavigator({
  Todo: {
    screen: Todo
  }
});

const FavoriteStack = createStackNavigator({
  Favorites: {
    screen: Favorites
  }
});

const Route = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => <Icon name="home" size={20} />
      }
    },
    Favorites: {
      screen: FavoriteStack,
      navigationOptions: {
        tabBarLabel: "Favorite",
        tabBarIcon: ({ tintColor }) => <Icon name="whatshot" size={20} />
      }
    },

    Todo: {
      screen: TodoStack,
      navigationOptions: {
        tabBarLabel: "To do",
        tabBarIcon: ({ tintColor }) => <Icon name="subscriptions" size={20} />
      }
    },

    Library: {
      screen: Todo,
      navigationOptions: {
        tabBarLabel: "Library",
        tabBarIcon: ({ tintColor }) => <Icon name="folder" size={20} />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#222"
    }
  }
);
export default Route;
