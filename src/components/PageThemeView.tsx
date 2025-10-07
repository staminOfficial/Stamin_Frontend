import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface PageThemeViewProps {
  children: React.ReactNode; // Define children prop
}

const PageThemeView: React.FC<PageThemeViewProps> = ({ children }) => {
  return (
    <SafeAreaView style={{ width:'100%', height:'100%', backgroundColor:'black', padding: 4}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ width:'100%', height:'100%' }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // adjust if needed
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PageThemeView;

const styles = StyleSheet.create({});
