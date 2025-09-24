import { StyleSheet, ScrollView, TouchableOpacity, Platform, ToastAndroid, View } from 'react-native'
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import PageThemeView from '../components/PageThemeView'
import CentralLogo from '../components/Headers/Auth/CentralLogo'
import AuthHeaderFrame from '../components/Headers/Auth/AuthHeaderFrame'
import GeneralInputSection from '../components/InputSection/GeneralInputSection'
import TextScallingFalse from '../components/TextScallingFalse';
import InputHeadingText from '../components/InputSection/InputHeadingText';
import HeadingText from '../components/Headers/Auth/HeadingText';
import CaptionText from '../components/Headers/Auth/CaptionText';
import AuthButton from '../components/Buttons/AuthButton';
import { useDispatch, useSelector } from "react-redux";
import AuthSteps from '../components/Indicators/AuthIndicators/AuthSteps';
import { AppDispatch, RootState } from '../../reduxStore';
import { z } from "zod";
import { otpSchema } from '../schemas/signupSchema';
import { verifyOtpSignup } from '../../reduxStore/slices/user/signupSlice';
import Toast from 'react-native-toast-message';

const OtpVerify = () => {
  type OtpVerifyNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OtpVerify'>;
  const navigation = useNavigation<OtpVerifyNavigationProp>();
  const { loading, userId, email, success, error } = useSelector((state: RootState) => state.signup);
  const dispatch = useDispatch<AppDispatch>();
  const isAndroid = Platform.OS === "android";
  //useStates
  const [OTP, setOTP] = useState<string>("");

  //feedback message
  const feedback = (message: string, type: "error" | "success" = "error") => {
    if (type === "error") {
      // Vibration.vibrate(vibrationPattern);
      isAndroid
        ? ToastAndroid.show(message, ToastAndroid.SHORT)
        : Toast.show({
          type,
          text1: message,
          visibilityTime: 3000,
          autoHide: true,
        });
    } else
      Toast.show({
        type,
        text1: message,
        visibilityTime: 3000,
        autoHide: true,
      });
  };


  const handleVerify = async () => {
    try {
      const OtpPayload = otpSchema.parse({ OTP, userId });

      const response = await dispatch(
        verifyOtpSignup({ _id: OtpPayload.userId, otp: OtpPayload.OTP })
      ).unwrap();

      feedback(response.message || "OTP Verfied successfully", "success");
      navigation.navigate('CreatePassword');
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const validationError = err.errors[0]?.message || "Invalid input.";
        feedback(validationError);
      } else {
        feedback(err || "Verification failed. Please try again.");
      }
    }
  }

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
        {/* formBody */}
        <View style={styles.formBodyView}>
          <View>
            <HeadingText>Verify your Email</HeadingText>
            <View style={styles.EnterEmailContainer}>
              <CaptionText>six digit code sent to this email - {email} </CaptionText>
              <TouchableOpacity activeOpacity={0.5} style={styles.EditButtonStyle}>
                <TextScallingFalse style={styles.EditEmailText}>Edit Email</TextScallingFalse>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {/* Input Section */}
            <InputHeadingText>Enter Your 6 digit Otp</InputHeadingText>
            <GeneralInputSection
              placeholder=''
              value={OTP}
              onChangeText={setOTP}
            />
          </View>
          {/* Verify Button  */}
          <AuthButton style={styles.VerifyButtonStyle} disabled={false} onPress={handleVerify}>
            Verify
          </AuthButton>
        </View>
        <AuthSteps currentStep={2} />
      </ScrollView>
    </PageThemeView>
  )
}

export default OtpVerify

const styles = StyleSheet.create({
  formBodyView: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    gap: 16
  },
  EditButtonStyle: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B2ED54',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EnterEmailContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 8
  },
  EditEmailText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 10
  },
  VerifyButtonStyle: {
    marginTop: '10%'
  }
})