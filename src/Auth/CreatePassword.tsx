import { StyleSheet, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
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

const CreatePassword = () => {
    type CreatePasswordNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OtpVerify'>;
    const navigation = useNavigation<CreatePasswordNavigationProp>();
    //useStates
    const [password, setPassword] = useState('')

    //Functions
    const handleNext = async () => {
        navigation.navigate('AccountCreated');
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
                            placeholder='' value={password}
                            onChangeText={setPassword} />
                    </View>
                </View>
                <AuthButton disabled={false} style={styles.NextButtonPosition} onPress={handleNext}>
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
        marginVertical: 40
    }
})