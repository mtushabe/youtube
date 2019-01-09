import React, { Component } from "react";
import { getNetworkState } from "../../actions";
import { NetInfo, View, Dimensions, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

const { width } = Dimensions.get("window");

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.notificationText}>You're Offline</Text>
    </View>
  );
}
function MiniOnlineSign() {
  return (
    <View style={styles.onlineContainer}>
      <Text style={styles.notificationText}> You're Online</Text>
    </View>
  );
}

class Netinfo extends Component {
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }

  _handleConnectionChange = isConnected => {
    //isConnected ? _this.animate("gray") : _this.animate("gray");
    isConnected
      ? this.props.getNetStatus(true)
      : this.props.getNetStatus(false);
  };

  render() {
    console.log("HELLO" + this.props.status);
    if (this.props.status) {
      return <MiniOnlineSign />;
    }
    return <MiniOfflineSign />;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width,
    position: "absolute"
  },

  onlineContainer: {
    backgroundColor: "#61b329",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width,
    position: "absolute"
  },
  notificationText: { color: "#fff" }
});

const mapStateToProps = state => {
  return {
    status: state.network.isConnected
  };
};
const mapDispatchToProps = dispatch => ({
  getNetStatus: status => {
    dispatch(getNetworkState(status));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Netinfo);
