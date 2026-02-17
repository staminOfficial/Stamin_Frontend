import { StyleSheet, TouchableOpacity, Image, Dimensions, View, Platform, PermissionsAndroid } from 'react-native'
import { useState } from 'react'
import coverpic from '../../../assets/visuals/images/coverpic.jpg'
import PageThemeView from '../../components/PageThemeView'
import TextScallingFalse from '../../components/TextScallingFalse'
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileSettings = () => {
    const [coverUri, setCoverUri] = useState<string | null>(null);

    const openGallery = async () => {
        if (Platform.OS == 'android') {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            );
        }
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            const uri = response.assets?.[0]?.uri;

            if (uri) {
                setCoverUri(uri);
            }
        });
    }
    return (
        <PageThemeView>
            <View style={styles.CoverPicContainer}>
                <TouchableOpacity activeOpacity={0.9} style={{ zIndex: 50, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', borderRadius: 30 }}>
                    <TouchableOpacity onPress={openGallery} activeOpacity={0.5} style={{ borderWidth: 1, borderColor: 'white', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 100, flexDirection: 'row', gap: 5 }}>
                        <TextScallingFalse style={{ color: 'white', fontSize: 13, fontWeight: '600' }}>Change Cover</TextScallingFalse>
                        <TextScallingFalse style={{ color: 'white', fontSize: 13 }}>@</TextScallingFalse>
                    </TouchableOpacity>
                </TouchableOpacity>
                <Image
                    source={coverpic}
                    style={styles.CoverPic}
                />
                {/* profile pic part */}
                <View style={styles.ProfilePicContainer}>
                    <TouchableOpacity activeOpacity={0.9} style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: '100%', zIndex: 100, position: 'absolute', borderRadius: size / 2, backgroundColor: 'rgb(0,0,0,0.5)' }} >
                        <TextScallingFalse style={{ color: 'white', fontSize: 20, alignSelf: 'center' }}>@</TextScallingFalse>
                    </TouchableOpacity>
                    <Image
                        source={coverpic}
                        style={styles.ProfilePicImage}
                    />
                </View>
            </View>
        </PageThemeView>
    )
}

export default ProfileSettings

const size = Dimensions.get('window').width * 0.3;
const styles = StyleSheet.create({
    CoverPicContainer: {
        width: '100%',
        height: 190,
        marginBottom: '12%',
    },
    CoverPic: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 30
    },
    ProfilePicView: {
        zIndex: 100,
        paddingLeft: 22,
        marginTop: -100,
        backgroundColor: 'purple'
    },
    ProfilePicContainer: {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: 'white',
        borderColor: '#B2ED54',
        borderWidth: 1,
        zIndex: 100,
        position: 'absolute',
        top: '55%',
        left: '6%'
    },
    ProfilePicImage: {
        width: '100%',
        height: '100%',
        objectFit: 'fill',
        alignSelf: 'center',
        borderRadius: size / 2
    },
})