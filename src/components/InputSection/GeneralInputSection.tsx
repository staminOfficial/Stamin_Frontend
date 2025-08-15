import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface TextInputSectionProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  cursorColor?: string;
  secureTextEntry?: boolean; // Accept secureTextEntry as a prop
  customStyle?: object;
}

const GeneralInputSection: React.FC<TextInputSectionProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize,
  cursorColor,
  secureTextEntry, // Destructure secureTextEntry
  customStyle,
}) => {
  return (
    <View style={{ marginTop: 4 }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"transparent"}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry} // Add secureTextEntry here
        style={[styles.input, customStyle]}
        textAlignVertical="center"
        cursorColor={'#12956B'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    color: "white",
    fontSize: 18,
    paddingLeft: 10,
    paddingEnd: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default GeneralInputSection;
