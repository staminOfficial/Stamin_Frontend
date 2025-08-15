import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageThemeView from '../components/PageThemeView'
import AuthHeaderFrame from '../components/Headers/Auth/AuthHeaderFrame'
import LogoWithName from '../components/Headers/LogoWithName'
import CircularProgressMeter from '../components/Indicators/AuthIndicators/CircularProgressMeter'
import TextScallingFalse from '../components/TextScallingFalse'
import AuthButton from '../components/Buttons/AuthButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useNavigation } from '@react-navigation/native';


const AccountCreated = () => {
    type AccountCreatedNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
    const navigation = useNavigation<AccountCreatedNavigationProp>();

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
    ButtonStyle:{
        marginVertical: 50
    }
})