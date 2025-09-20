import { StyleSheet, TouchableOpacity,ActivityIndicator, View, ScrollView,Platform, Keyboard,Vibration, ToastAndroid } from 'react-native'
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import PageThemeView from '../components/PageThemeView'
import CentralLogo from '../components/Headers/Auth/CentralLogo'
import BackButtonSvg from '../components/Svg/Icons_svg/BackButtonSvg'
import TextScallingFalse from '../components/TextScallingFalse';
import GeneralInputSection from '../components/InputSection/GeneralInputSection';
import CalendarSvg from '../components/Svg/Icons_svg/CalendarSvg';
import AuthButton from '../components/Buttons/AuthButton';
import AuthSteps from '../components/Indicators/AuthIndicators/AuthSteps';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AuthHeaderFrame from '../components/Headers/Auth/AuthHeaderFrame';
import InputHeadingText from '../components/InputSection/InputHeadingText';
import HeadingText from '../components/Headers/Auth/HeadingText';
import { z } from 'zod';
import { useDispatch, useSelector } from "react-redux";
import { signupSchema } from "../schemas/signupSchema";
import { signupUser } from '../../reduxStore/slices/signupSlice';
import { AppDispatch, RootState } from '../../reduxStore';
import Toast from "react-native-toast-message";

const CreateAccount = () => {
  type CraeteAccountScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateAccount'>;
  const navigation = useNavigation<CraeteAccountScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.signup);
  
  //Manual functions
  const isAndroid = Platform.OS === "android";

  //useStates
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dobDate, setDobDate] = useState(new Date());

  //Form Data
  const formData = {
    firstName,
    lastName,
    email,
    dateOfBirth,
  }

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

  //Continue button function
  const ValidateSignupForm = async () => {
    try {
      const SignupPayload = signupSchema.parse(formData);
      // ✅ NOW convert to ISO only for sending to backend
      const payloadForBackend = {
        ...SignupPayload,
        dateOfBirth: SignupPayload.dateOfBirth
          ? (() => {
            const [day, month, year] = SignupPayload.dateOfBirth.split("-");
            return `${year}-${month}-${day}`;
          })()
          : undefined,
      };
      const response = await dispatch(signupUser(payloadForBackend)).unwrap();
      console.log("Signup response:", response);
      feedback(response.message || "OTP sent to email", "success");
      // Navigate to next page
      navigation.navigate('OtpVerify')
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const validationError = err.errors[0]?.message || "Invalid input.";
        feedback(validationError,"error");
      } else {
        console.log("Backend response: ", err);
        feedback(err || "An error occured. Please try again.");
      }
    }
  }

  const onChange = (event: any, selectedDate?: Date) => {
  if (selectedDate) {
    setDobDate(selectedDate);
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const year = selectedDate.getFullYear();
    setDateOfBirth(`${day}-${month}-${year}`); // string for schema/backend
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
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()} style={styles.BackButton}>
            <BackButtonSvg />
          </TouchableOpacity>
          <CentralLogo />
          <View style={styles.block} />
        </AuthHeaderFrame>
        {/* Heading */}
        <View style={{ paddingHorizontal: 22 }}>
          <HeadingText>
            Create your account
          </HeadingText>
        </View>
        {/* FormBody */}
        <View style={styles.FormContainer}>
          {/* Name */}
          <View style={styles.NameView}>
            {/*First Name Input */}
            <View style={styles.NameComponent}>
              <InputHeadingText>First Name</InputHeadingText>
              <GeneralInputSection
                placeholder='' value={firstName}
                onChangeText={setFirstName} />
            </View>
            {/*Last Name Input */}
            <View style={styles.NameComponent}>
              <InputHeadingText>Last Name</InputHeadingText>
              <GeneralInputSection
                placeholder='' value={lastName}
                onChangeText={setLastName} />
            </View>
          </View>
          {/* Email Input */}
          <View>
            <InputHeadingText>Email</InputHeadingText>
            <GeneralInputSection
              placeholder='' value={email}
              onChangeText={setEmail} />
          </View>
          {/* Date Of Birth Input */}
          <View>
            <InputHeadingText>Date Of Birth</InputHeadingText>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                DateTimePickerAndroid.open({
                  value: dobDate,
                  onChange,
                  mode: 'date',
                  maximumDate: new Date(),
                  display: 'calendar', // can be 'spinner', 'default', 'calendar', etc.
                })
              }}
              activeOpacity={0.7} style={styles.DOB_Input_View}>
              <InputHeadingText style={{ fontSize: 16 }}> {dobDate.getDate()}/{dobDate.getMonth() + 1}/{dobDate.getFullYear()}</InputHeadingText>
              <CalendarSvg />
            </TouchableOpacity>
          </View>
        </View>
        {/* Next Button */}
        <View style={styles.ButtonContainer}>
          {
            loading ? 
            <ActivityIndicator color={'#BAFF4C'} size={40} style={{paddingVertical: 1}}/>
            :
            <AuthButton disabled={false} onPress={ValidateSignupForm}>
            <TextScallingFalse style={styles.SubmitButtonText}>Next</TextScallingFalse>
          </AuthButton>
          }
        </View>
        {/* Indicator */}
        <AuthSteps currentStep={1} />
      </ScrollView>
    </PageThemeView>
  )
}

export default CreateAccount

const styles = StyleSheet.create({

  BackButton: {
    width: 60,
    paddingTop: 10,
  },
  TransCompo: {
    width: 60,
  },
  Heading: {
    color: 'white',
    fontSize: 30,
    fontWeight: 500,
    paddingHorizontal: 22
  },
  FormContainer: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 22,
    paddingVertical: 30,
    gap: 18
  },
  NameView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  NameComponent: {
    width: '49%'
  },
  DOB_Input_View: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    marginTop: 4,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  SubmitButtonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '900'
  },
  ButtonContainer: {
    paddingVertical: 40
  },
  block: {
    width: 60
  },
})