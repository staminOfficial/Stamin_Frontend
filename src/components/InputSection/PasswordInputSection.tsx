import React, { useState } from 'react'
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import EyeButtonSvgIcon from "../Svg/Icons_svg/EyeButtonSvgIcon";

interface TextInputSectionProps extends TextInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    cursorColor?: string;
    secureTextEntry?: boolean; // Accept secureTextEntry as a prop
    customStyle?: object;
}

const PasswordInputSection: React.FC<TextInputSectionProps> = ({
    placeholder,
    value,
    onChangeText,
    keyboardType,
    autoCapitalize,
    customStyle,
}) => {
    const [showPassword, setShowPassword] = useState(true);

    return (
        <View style={styles.containerView}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={"transparent"}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                secureTextEntry={showPassword} // Add secureTextEntry here
                style={[styles.input, customStyle]}
                textAlignVertical="center"
                cursorColor={'#BAFF4C'}
            />
            <TouchableOpacity 
            activeOpacity={0.5} 
            style={styles.EyeButtonView}
            onPress={() => setShowPassword(prev => !prev)}
            >
            <EyeButtonSvgIcon isVisible={!showPassword}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    containerView: {
        marginTop: 4,
        flexDirection: 'row',
        width: '100%',
        height: 44,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
    },
    input: {
        width: '85%',
        color: "white",
        fontSize: 18,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 8,
        paddingBottom: 8,
        paddingStart: 10,
    },
    EyeButtonView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '15%',
    }
});

export default PasswordInputSection;
