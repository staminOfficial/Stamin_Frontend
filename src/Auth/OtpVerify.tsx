import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
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
import AuthSteps from '../components/Indicators/AuthIndicators/AuthSteps';

const OtpVerify = () => {
  type OtpVerifyNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OtpVerify'>;
  const navigation = useNavigation<OtpVerifyNavigationProp>();
  //useStates
  const [otpVerify, setOtpVerify] = useState('')

  const handleVerify = async () => {
    // verify logic
    navigation.navigate('CreatePassword');
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
              <CaptionText>six digit code sent to this email - ravisharma824093  </CaptionText>
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
              value={otpVerify}
              onChangeText={setOtpVerify}
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