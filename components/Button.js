import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

const Button = ({ onPress, children, style, margin }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            styles.buttonContainer,
            margin && { marginVertical: 0 },
            styles.light,
          ]}
        >
          <Text style={[styles.textLight]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;
const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    marginVertical: 20,
    borderRadius: 12,
    padding: 12,
  },
  disabled: {
    padding: 2,
    width: 60,
  },
  pressed: {
    opacity: 0.5,
  },
  light: {
    backgroundColor: "#FF0020",
  },
  textLight: {
    color: "#000",
    textAlign: "center",
  },
});
