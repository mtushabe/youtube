import React from "react";
import { StyleSheet, View } from "react-native";
import { ProgressDialog } from "react-native-simple-dialogs";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export const Loading = () => {
  return (
    <View style={styles.container}>
      <ProgressDialog
        visible={true}
        title="Loading."
        message="Please, wait..."
      />
    </View>
  );
};
