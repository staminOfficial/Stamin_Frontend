import { StyleSheet, TouchableOpacity, Image, Dimensions, View, Platform, PermissionsAndroid } from 'react-native'
import { useState } from 'react'
import coverpic from '../../../assets/visuals/images/coverpic.jpg'
import PageThemeView from '../../components/PageThemeView'
import TextScallingFalse from '../../components/TextScallingFalse'
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'

const ProfileSettings = () => {
    const [coverUri, setCoverUri] = useState<string | null>(null);
    const [profileUri, setProfileUri] = useState<string | null>(null);

    const openGallery = async (type: string) => {
        try {
            const image = await ImagePicker.openPicker({
                mediaType: 'photo',
                cropping: true,
                width: type == "cover" ? 410 : 400,
                height: type == "cover" ? 190 : 400,
                compressImageQuality: 0.8,
            });

            if (image?.path) {
                if (type == "cover") {
                    setCoverUri(image.path);
                }
                else if (type == "profile") {
                    setProfileUri(image.path);
                }
            }
        } catch (error) {
            console.log("user cancelled or error:", error);
        }
    };

    return (
        <PageThemeView>
            <View style={styles.mainView}>
                {/* cover and profilepic section */}
                <View style={styles.CoverPicContainer}>
                    <TouchableOpacity onPress={() => openGallery("cover")} activeOpacity={0.9} style={styles.CoverPicView}>
                        <TouchableOpacity onPress={() => openGallery("cover")} activeOpacity={0.5} style={styles.ChangeCoverPicButton}>
                            <TextScallingFalse style={styles.CoverPicChangeButtonText}>Change Cover</TextScallingFalse>
                            <TextScallingFalse style={{ color: 'white', fontSize: 13 }}>@</TextScallingFalse>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <Image
                        source={coverUri ? { uri: coverUri } : coverpic}
                        style={styles.CoverPic}
                    />
                    {/* profile pic part */}
                    <View style={styles.ProfilePicContainer}>
                        <TouchableOpacity onPress={() => openGallery("profile")} activeOpacity={0.9} style={styles.profilePicButton} >
                            <TextScallingFalse style={{ color: 'white', fontSize: 20, alignSelf: 'center' }}>@</TextScallingFalse>
                        </TouchableOpacity>
                        <Image
                            source={profileUri ? { uri: profileUri } : coverpic}
                            style={styles.ProfilePicImage}
                        />
                    </View>
                </View>

                <View style={styles.UserInfoEditingContainer}>
                    <View style={styles.editInfoContainer}>
                        <TextScallingFalse style={styles.text}>First Name   -</TextScallingFalse>
                        <TextScallingFalse style={styles.text}>Ravi</TextScallingFalse>
                    </View>
                    <View style={styles.editInfoContainer}>
                        <TextScallingFalse style={styles.text}>Last Name   -</TextScallingFalse>
                        <TextScallingFalse style={styles.text}>Sharma</TextScallingFalse>
                    </View>
                    <View style={styles.editInfoContainer}>
                        <TextScallingFalse style={styles.text}>Date of Birth   -</TextScallingFalse>
                        <TextScallingFalse style={styles.text}>17/06/2001</TextScallingFalse>
                    </View>
                    <View style={styles.editInfoContainer}>
                        <TextScallingFalse style={styles.text}>Location   -</TextScallingFalse>
                        <TextScallingFalse style={styles.text}>Brooklyn, Britain</TextScallingFalse>
                    </View>
                    <View style={styles.editInfoContainer}>
                        <TextScallingFalse style={styles.text}>Height   -</TextScallingFalse>
                        <TextScallingFalse style={styles.text}>6ft</TextScallingFalse>
                    </View>
                    <View style={styles.editInfoContainer}>
                        <TextScallingFalse style={styles.text}>Weight   -</TextScallingFalse>
                        <TextScallingFalse style={styles.text}>65kg</TextScallingFalse>
                    </View>
                </View>
            </View>
        </PageThemeView>
    )
}

export default ProfileSettings

const size = Dimensions.get('window').width * 0.3;
const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 4
    }, 
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
    CoverPicView: {
        zIndex: 50,
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        borderRadius: 30
    },
    ChangeCoverPicButton: {
        borderWidth: 1,
        borderColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 100,
        flexDirection: 'row',
        gap: 5
    },
    CoverPicChangeButtonText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '600'
    },
    profilePicButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        zIndex: 100,
        position: 'absolute',
        borderRadius: size / 2,
        backgroundColor: 'rgb(0,0,0,0.5)'
    },
    UserInfoEditingContainer:{
        width: '100%', 
        paddingHorizontal: 10, 
        paddingVertical: 10, 
        gap: 10
    },
    editInfoContainer:{
         flexDirection: 'row', 
         gap: 10,
         width:'100%',
         paddingVertical: 10,
         paddingHorizontal: 20,
         borderRadius: 10,
         borderWidth: 1,
         borderColor:'#252525',
    },
    text:{
        color: 'white', 
        fontSize: 17, 
        fontWeight: '400'
    }
})