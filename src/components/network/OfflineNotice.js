import React, { PureComponent } from "react";
import { View, Text, NetInfo, Dimensions, StyleSheet } from "react-native";
import { getNetworkState } from "../../actions";
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

class OfflineNotice extends PureComponent {
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = isConnected => {
    isConnected
      ? this.props.getNetStatus(true)
      : this.props.getNetStatus(false);
  };

  render() {
    console.log("TESTED" + this.props.isConnected);

    if (!this.props.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
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
    isConnected: state.network.isConnected
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
)(OfflineNotice);
