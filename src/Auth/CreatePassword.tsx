import { StyleSheet, ScrollView, View, Vibration, Platform, ToastAndroid} from 'react-native'
import React, { useEffect, useState } from 'react'
import PageThemeView from '../components/PageThemeView'
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AuthHeaderFrame from '../components/Headers/Auth/AuthHeaderFrame'
import CentralLogo from '../components/Headers/Auth/CentralLogo'
import InputHeadingText from '../components/InputSection/InputHeadingText'
import GeneralInputSection from '../components/InputSection/GeneralInputSection'
import HeadingText from '../components/Headers/Auth/HeadingText'
import CaptionText from '../components/Headers/Auth/CaptionText'
import AuthButton from '../components/Buttons/AuthButton'
import AuthSteps from '../components/Indicators/AuthIndicators/AuthSteps';
import PasswordInputSection from '../components/InputSection/PasswordInputSection';
import { useDispatch, useSelector} from 'react-redux';
import { vibrationPattern } from '../constants/vibrationPattern';
import Toast from "react-native-toast-message";
import { AppDispatch, RootState } from '../../reduxStore';
import { completeSignup, completeSignupPayload } from '../../reduxStore/slices/user/signupSlice';

const CreatePassword = () => {
    type CreatePasswordNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OtpVerify'>;
    const navigation = useNavigation<CreatePasswordNavigationProp>();
    //useStates
    const [password, setPassword] = useState('')
    const dispatch = useDispatch<AppDispatch>();
    const [confirmPassword, setConfirmPassword] = useState('')
    const [matched, setMatching] = useState(false);

    const isAndroid = Platform.OS === "android";
    const passwordMatched = password === confirmPassword;
    const { loading, email } = useSelector((state: RootState) => state.signup);
    console.log("email - ",email)

    const feedback = (message: string, type: "error" | "success" = "error") => {
        if (type === "error") {
            Vibration.vibrate(vibrationPattern);
            isAndroid
                ? ToastAndroid.show(message, ToastAndroid.SHORT)
                : Toast.show({
                    type,
                    text1: message,
                    visibilityTime: 3000,
                    autoHide: true,
                });
        } else {
            Toast.show({
                type,
                text1: message,
                visibilityTime: 3000,
                autoHide: true,
            });
        }
    };

    //Functions
    const handleNext = async () => {
        if(password.length === 0){
            feedback("Password is required")
            return;
        }
        if (password.length < 8) {
            feedback("Password must be at least 8 characters long.", "error");
            return;
        }
        const CompleteSignupPayload = {
            email: email || "",
            password: password || ""
        }
        try {
            const result = await dispatch(
                completeSignup(CompleteSignupPayload)
            ).unwrap();

            feedback(result.message, "success");
            navigation.navigate('AccountCreated');
        } catch (error) {
            console.error("Signup error:", error);
            feedback("Something went wrong. Please try agian.", "error");
        }
    };

    return (
        <PageThemeView>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}>
                {/* Header */}
                <AuthHeaderFrame>
                    <View />
                    <CentralLogo />
                    <View />
                </AuthHeaderFrame>
                {/* Form Body */}
                <View style={styles.FormContainerView}>
                    {/* Header Texts */}
                    <View>
                        <HeadingText>Create Password</HeadingText>
                        <CaptionText>Create & Confirm your 6 digit Password</CaptionText>
                    </View>
                    <View>
                        <InputHeadingText>Create Password</InputHeadingText>
                        <PasswordInputSection
                            placeholder='' value={password}
                            onChangeText={setPassword} />
                    </View>
                    <View>
                        <InputHeadingText>Confirm Password</InputHeadingText>
                        <PasswordInputSection
                            placeholder='' value={confirmPassword}
                            onChangeText={setConfirmPassword} />
                    </View>
                </View>
                <AuthButton disabled={!passwordMatched} style={[styles.NextButtonPosition, { backgroundColor: passwordMatched ? '#BAFF4C' : '#202020' }]} onPress={handleNext}>
                    Next
                </AuthButton>
                {/* Auth Indicator */}
                <AuthSteps currentStep={3} />
            </ScrollView>
        </PageThemeView>
    )
}

export default CreatePassword

const styles = StyleSheet.create({
    FormContainerView: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        gap: 16
    },
    NextButtonPosition: {
        marginVertical: 40,
    }
})