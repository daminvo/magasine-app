import { Pressable, StyleSheet, Text } from "react-native";

const AppButton = (props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: props.disabled
            ? "#ccc"
            : pressed
            ? "#FBFAF0"
            : props.color || "red",
        },
        styles.container,
        props.buttonStyles,
      ]}
      disabled={props.disabled}
      onPress={props.onPress}
      accessible
      accessibilityLabel={props.accessibilityLabel || "A Button"}
    >
      <Text style={[styles.text, props.textStyles]}>
        {props.children || "Press Me"}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  text: { color: "white" },
});

export default AppButton;