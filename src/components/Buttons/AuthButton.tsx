import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import TextScallingFalse from "../TextScallingFalse";

interface SignupButtonProps {
  onPress: (event?: GestureResponderEvent) => void;
  children: React.ReactNode;
  disabled: boolean;
  textStyle?: any;
  style?: ViewStyle;
}

const AuthButton: React.FC<SignupButtonProps> = ({
  onPress,
  children,
  disabled,
  textStyle,
  style
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={[styles.ButtonStyle, style]}
      disabled={disabled}
    >
      <TextScallingFalse style={[styles.ButtonTextStyle, textStyle]}>
        {children}
      </TextScallingFalse>
    </TouchableOpacity>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  ButtonStyle: {
    width: 310,
    height: 42,
    backgroundColor: "#BAFF4C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    alignSelf: 'center',
  },
  ButtonTextStyle: {
    color: 'black',
    fontSize: 15,
    fontWeight: '900'
  }
});
