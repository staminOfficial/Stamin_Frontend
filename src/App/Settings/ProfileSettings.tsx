import { StyleSheet, TouchableOpacity, Image, Dimensions, View, Platform, PermissionsAndroid, TextInput, KeyboardAvoidingView } from 'react-native'
import { useState } from 'react'
import coverpic from '../../../assets/visuals/images/coverpic.jpg'
import PageThemeView from '../../components/PageThemeView'
import TextScallingFalse from '../../components/TextScallingFalse'
import ImagePicker from 'react-native-image-crop-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import BackButtonSvg from '../../components/Svg/Icons_svg/BackButtonSvg'
import SmallBackButtonSvg from '../../components/Svg/Icons_svg/SmallBackButton'

const ProfileSettings = () => {
    const [coverUri, setCoverUri] = useState<string | null>(null);
    const [profileUri, setProfileUri] = useState<string | null>(null);
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState<string | null>(null);
    const [calender, setCalender] = useState(false);
    const [date, setDate] = useState(new Date());

    //for temperorly lets create userData an local state here
    const [userData, setUserData] = useState({
        First_Name: "Ravi",
        Last_Name: "Sharma",
        Date_Of_Birth: "17/06/2001",
        location: "Brooklyn, Britain",
        height: "6ft",
        weight: "65kg",
        about: "Pushing Limits on two Wheels - Elite Road Cyclist With a Passion for Speed and Endurance"
    })

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

    const editingOptionsData = [
        {
            id: 1,
            name: 'First Name',
            icon: '@'
        },
        {
            id: 2,
            name: 'Last Name',
            icon: '@'
        },
        {
            id: 3,
            name: 'Date of Birth',
            icon: '@'
        },
        {
            id: 4,
            name: 'Location',
            icon: '@'
        },
        {
            id: 5,
            name: 'Height',
            icon: '@'
        },
        {
            id: 6,
            name: 'Weight',
            icon: '@'
        },
        {
            id: 7,
            name: 'About',
            icon: '@'
        }
    ]

    const openModal = (name: string) => {
        if (name === "Date of Birth") {
            setCalender(true);
        }
        else {
            setModalData(name);
            setModal(true);
        }
    }

    const EditingOptions = () => {
        return editingOptionsData.map((e, i) => {
            const keyMap: Record<string, keyof typeof userData> = {
                'First Name': 'First_Name',
                'Last Name': 'Last_Name',
                'Date of Birth': 'Date_Of_Birth',
                'Location': 'location',
                'Height': 'height',
                'Weight': 'weight',
                'About': 'about'
            };
            const value = userData[keyMap[e.name]];
            return (
                <View key={i} style={styles.editInfoContainer}>
                    <TextScallingFalse style={styles.QuestionText}>{e.name}</TextScallingFalse>
                    {e.name === "First Name" || e.name === "Last Name" ? (
                        <View style={styles.WritingContainer}>
                            <TextInput numberOfLines={1} style={styles.AnswerText}>{value}</TextInput>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}><TextScallingFalse style={{ color: 'white' }}>{e.icon}</TextScallingFalse></View>
                        </View>
                    ) : (
                        <TouchableOpacity onPress={() => openModal(e.name)} activeOpacity={0.7} style={styles.WritingContainer}>
                            <TextInput editable={false} numberOfLines={1} style={styles.AnswerText}>{value}</TextInput>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}><TextScallingFalse style={{ color: 'white' }}>{e.icon}</TextScallingFalse></View>
                        </TouchableOpacity>
                    )}
                </View>
            )
        })
    }


    return (
        <PageThemeView>
            <KeyboardAvoidingView style={styles.mainView}>
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
                {/* editting section */}
                <View style={styles.UserInfoEditingContainer}>
                    {EditingOptions()}
                </View>
            </KeyboardAvoidingView>

            {modal === true ? (
                <View style={{ width: '100%', height: '100%', zIndex: 100, position: 'absolute', backgroundColor: 'black', gap: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20 }}>
                        <TouchableOpacity onPress={() => setModal(false)} style={{ paddingHorizontal: 15, paddingVertical: 10, }}>
                            <SmallBackButtonSvg />
                        </TouchableOpacity>
                        <TextScallingFalse style={{ color: 'white', fontSize: 19, fontWeight: '500' }}>{modalData}</TextScallingFalse>
                    </View>
                    <View style={{width:'100%', paddingHorizontal: 20}}>
                        <TextScallingFalse style={styles.AnswerText}>Brooklyn, Britain</TextScallingFalse>
                        <View style={{borderBottomWidth: 1, borderColor:'white', width:'100%'}} />
                    </View>
                </View>
            ) : null}
            {/* Date Of Birth Input */}
            {calender && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setCalender(false);
                        if (selectedDate) {
                            const formatted = selectedDate.toLocaleDateString("en-GB");

                            setUserData(prev => ({
                                ...prev,
                                Date_Of_Birth: formatted
                            }));
                        }
                    }}
                />
            )}
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
    UserInfoEditingContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingRight: 25,
        paddingVertical: 10,
        gap: 10
    },
    editInfoContainer: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center'
    },
    QuestionText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '400',
        width: 110
    },
    AnswerText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '400',
        width: '74%',
    },
    AnswerTextAbout: {
        color: 'white',
        fontSize: 15,
        fontWeight: '400',
    },
    WritingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "65%"
    }
})