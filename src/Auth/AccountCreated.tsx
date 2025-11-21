import { StyleSheet, Text, View, BackHandler } from 'react-native'
import React, { useCallback } from 'react'
import PageThemeView from '../components/PageThemeView'
import AuthHeaderFrame from '../components/Headers/Auth/AuthHeaderFrame'
import LogoWithName from '../components/Headers/LogoWithName'
import CircularProgressMeter from '../components/Indicators/AuthIndicators/CircularProgressMeter'
import TextScallingFalse from '../components/TextScallingFalse'
import AuthButton from '../components/Buttons/AuthButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector, UseSelector } from 'react-redux'
import { RootState } from '../../reduxStore'


const AccountCreated = () => {
    type AccountCreatedNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
    const navigation = useNavigation<AccountCreatedNavigationProp>();
    const { email } = useSelector((state: RootState) => state.signup)

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                navigation.replace('Login'); // go to Login instead of previous screen
                return true; // prevent default back
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

             return () => subscription.remove();
        }, [navigation])
    );


    //Functions
    const handleDone = async () => {
            navigation.navigate('Home');
    };

    return (
        <PageThemeView>
            {/* header */}
            <AuthHeaderFrame>
                <View />
                <LogoWithName />
                <View />
            </AuthHeaderFrame>
            {/* body */}
            <View style={styles.bodyView}>
                <CircularProgressMeter />
                {/* Success Message */}
                <TextScallingFalse style={styles.MessageStyle}>
                    Account Created Successfully
                </TextScallingFalse>
            </View>
            {/* Done Button */}
            <AuthButton style={styles.ButtonStyle} disabled={false} onPress={handleDone}>
                Done
            </AuthButton>
        </PageThemeView>
    )
}

export default AccountCreated

const styles = StyleSheet.create({
    bodyView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingTop: 40
    },
    MessageStyle: {
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 40,
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
    },
    ButtonStyle: {
        marginVertical: 50
    }
})