import AuthButton from '../components/Buttons/AuthButton';
import GeneralInputSection from '../components/InputSection/GeneralInputSection';
import PageThemeView from '../components/PageThemeView';
import CrossIcon from '../components/Svg/Icons_svg/CrossSvg';
import TextScallingFalse from '../components/TextScallingFalse';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import login_banner from "../../assets/visuals/images/Stamin_Login.png";
import InputHeadingText from '../components/InputSection/InputHeadingText';
import LogoWithName from '../components/Headers/LogoWithName';
import loginSchema from '../schemas/loginSchema';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch,RootState } from '../../reduxStore';

const Login = () => {
    type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
    const navigation = useNavigation<LoginScreenNavigationProp>();

    //useStates
    const dispatch = useDispatch<AppDispatch>();
    const [id, setId] = useState("")
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");

    //Signup Functions
    const handleSignup = async () => {
        navigation.navigate('CreateAccount');
    };

    //Login Function
    const handleLogin = async () => {
        // try {
        //     const loginData = id.includes("@")
        //         ? loginSchema.parse({ email: id, password })
        //         : loginSchema.parse({ email: id, password });

        //     // Reset state and start loading
        //     dispatch(resetAuthState());
        //     setLoading(true);

        //     // Dispatch login action
        //     const response = await dispatch(loginUser(loginData)).unwrap();
        //     await dispatch(initializeAuth());

        //     // Feedback on Success
        //     TouchableNativeFeedback(response.message || "Login successfull", "Success");
        //     navigation.navigate('Home');

        // } catch (err: any) {
        //     if (err instanceof z.ZodError) {
        //         const validationError = err.errors[0]?.message || "Invalid input.";
        //         feedback(validationError);
        //     } else {
        //         feedback(err);
        //     }
        // } finally {
        //     setLoading(false);
        // }
        // Login function logic
    }

    return (
        <PageThemeView>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}>
                <View style={styles.LoginMainView}>
                    {/* Header component */}
                    <View style={styles.HeaderView}>
                        <LogoWithName />
                        <TouchableOpacity activeOpacity={0.5} style={styles.HeaderCrossButton}>
                            <CrossIcon />
                        </TouchableOpacity>
                    </View>
                    {/* Banner component */}
                    <View style={[styles.LoginBannerView, { position: 'relative' }]}>
                        <Image style={styles.LoginBannerImage} source={login_banner} />
                        <TextScallingFalse style={styles.LoginBannerText}>
                            Train Hard Think Smart
                        </TextScallingFalse>
                        <View style={styles.LoginBannerComponent} />
                    </View>
                    {/* Input Section Components */}
                    <View style={styles.InputSectionContainer}>
                        <View>
                            <InputHeadingText>Email or Username</InputHeadingText>
                            <GeneralInputSection
                                placeholder='' value={id}
                                onChangeText={setId} />
                        </View>
                        <View>
                            <InputHeadingText>Password</InputHeadingText>
                            <GeneralInputSection
                                placeholder='' value={id}
                                onChangeText={setId} />
                        </View>
                        <TouchableOpacity activeOpacity={0.5} style={styles.ForgotPasswordButton}>
                            <InputHeadingText style={{ color: '#BAFF4C' }}>Forgot Password</InputHeadingText>
                        </TouchableOpacity>
                    </View>
                    {/* Signup Button Component*/}
                    <AuthButton disabled={false} onPress={handleLogin}>
                        Sign in
                    </AuthButton>
                    {/* Signup Button Component*/}
                    <AuthButton disabled={false} onPress={handleSignup} textStyle={styles.SignupButtonText} style={styles.SignupButton}>
                        Don't have an account? Sign up
                    </AuthButton>
                </View>
            </ScrollView>
        </PageThemeView>
    )
}

export default Login

const styles = StyleSheet.create({
    //Main component
    LoginMainView: {
        gap: 15,
        flex: 1,
    },
    // Header component
    HeaderView: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingTop: 20,
        width: '100%',
        justifyContent: 'space-between'
    },
    HeaderCrossButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12
    },
    // banner component
    LoginBannerView: {
        width: '84%',
        height: 370,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    LoginBannerImage: {
        width: '88%',
        height: '100%',
        zIndex: 5,
        position: 'absolute',
        bottom: 0,
    },
    LoginBannerComponent: {
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 284,
        backgroundColor: '#BAFF4C',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    LoginBannerText: {
        width: '27%',
        color: 'white',
        fontSize: 15,
        zIndex: 10,
        position: 'absolute',
        top: '66%',
        right: '31%',
    },
    // Input Section Component
    InputSectionContainer: {
        width: '82%',
        alignSelf: 'center',
        gap: 10
    },
    InputSectionText: {
        color: 'white',
        fontSize: 16
    },
    // Buttons Component Styles
    ForgotPasswordButton: {
        paddingVertical: 1
    },
    SignupButton: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: '#BAFF4C'
    },
    SignupButtonText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '500'
    }
})