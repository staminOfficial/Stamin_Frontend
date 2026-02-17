import { StyleSheet, Image, View, Dimensions, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import PageThemeView from '../components/PageThemeView'
import coverpic from '../../assets/visuals/images/coverpic.jpg'
import TextScallingFalse from '../components/TextScallingFalse'
import HeartIcon from '../../assets/visuals/images/HeartIcon.jpg'
import KalBurnIcon from '../../assets/visuals/images/KalBurnIcon.jpg'
import O2Icon from '../../assets/visuals/images/O2Icon.jpg'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation';

const Profile = () => {
  type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

  const [selectSportsId, setSelectSportsId] = useState(0);
  const navigation = useNavigation<SettingsScreenNavigationProp>()

  const watch = {
    watchName: 'Google',
    watchData: [
      {
        icon: HeartIcon,
        Readings: '75',
      },
      {
        icon: KalBurnIcon,
        Readings: '100'
      },
      {
        icon: O2Icon,
        Readings: '98%'
      },
      {
        icon: O2Icon,
        Readings: '3km'
      }
    ]
  }

  const watchDetails = () => {
    return watch.watchData.map((e, i) => {
      return (
        <View key={i} style={styles.WatchDetailsCapsule}>
          <Image source={e.icon} style={styles.WatchDetailsIcon} />
          <TextScallingFalse style={styles.WatchDetailsText}>
            {e.Readings}
          </TextScallingFalse>
        </View>
      )
    })
  }

  const userData = {
    coverPic: '',
    profilePic: '',
    firstName: 'Taylor',
    lastName: 'Huges',
    generalData: [
      { Label: '', value: 'Jun 2001' },
      { Label: '', value: 'Brooklyn, Britain' },
      { Label: 'Status', value: 'yesterday' },
    ],
    about: 'Pushing Limits on two Wheels - Elite Road Cyclist With a Passion for Speed and Endurance'
  }

  const generalDetails = () => {
    return userData.generalData.map((e, i) => {
      return (
        <View key={i}>
          <TextScallingFalse style={styles.UserGeneralDetailsText}>{e.Label} {e.value}</TextScallingFalse>
        </View>
      )
    })
  }

  const sportsData = [
    {
      id: 1,
      icon: '',
      name: 'Run',
      distance: '31.4 km',
      time: '1h 23m',
      elevation: '418 m',
      initial: '0 km',
      mid: '247 km',
      high: '405 km',
    },
    {
      id: 2,
      icon: '',
      name: 'Cycling',
      distance: '27.4 km',
      time: '1h 40m',
      elevation: '320 m',
      initial: '0 km',
      mid: '147 km',
      high: '205 km',
    },
    {
      id: 3,
      icon: '',
      name: 'Swim',
      distance: '2 km',
      time: '35 m',
      elevation: '200 m',
      initial: '0 km',
      mid: '447 km',
      high: '305 km',
    },
    {
      id: 4,
      icon: '',
      name: 'Javlin',
      distance: '4 km',
      time: '2 m',
      elevation: '310 m',
      initial: '0 km',
      mid: '347 km',
      high: '545 km',
    }
  ]

  const selectSports = (id: number) => {
    setSelectSportsId(id)
  }

  const selectedSport = sportsData.find(
    item => item.id === selectSportsId
  )

  const sportsDataSections = selectedSport
    ? [
      {
        name: 'Distance',
        data: `${selectedSport.distance}`,
      },
      {
        name: 'Time',
        data: `${selectedSport.time}`,
      },
      {
        name: 'Elevation Gain',
        data: `${selectedSport.elevation}`
      }
    ] : [];

  const SportsDataSectionComponent = () => {
    return sportsDataSections.map((e, i) => {
      return (
        <View key={i}>
          <TextScallingFalse style={styles.SportsDataSectionComponentTitles}>{e.name}</TextScallingFalse>
          <TextScallingFalse style={styles.SportsDataSectionComponentData}>{e.data}</TextScallingFalse>
        </View>
      )
    })
  }

  const graphicalNumericSection = selectedSport
    ? [
      {
        name: 'high',
        data: `${selectedSport.high}`
      },
      {
        name: 'mid',
        data: `${selectedSport.mid}`
      },
      {
        name: 'initial',
        data: `${selectedSport.initial}`
      },
    ] : [];

  const SportsGraphicalNumericComponent = () => {
    return graphicalNumericSection.map((e, i) => {
      return (
        <TextScallingFalse key={i} style={{ color: 'gray', fontSize: 9 }}>{e.data}</TextScallingFalse>
      )
    })
  }

  const handleSettings = () => {
    navigation.navigate('ProfileSettings')
  }

  return (
    <PageThemeView>
      <View style={styles.mainView}>
        {/* cover pic part */}
        <View style={styles.CoverPicContainer}>
          <Image
            source={coverpic}
            style={styles.CoverPic}
          />
          {/* profile pic part */}
          <View style={styles.ProfilePicView}>
            <View style={styles.ProfilePicContainer}>
              <Image
                source={coverpic}
                style={styles.ProfilePicImage}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleSettings} activeOpacity={0.4} style={{alignSelf:'flex-end', marginRight: 30, padding: 12}}>
            <TextScallingFalse style={{color:'white', fontSize: 14, fontWeight:'500', zIndex: 100}}>@</TextScallingFalse>
          </TouchableOpacity>
        </View>
        {/* user details part */}
        <View style={styles.UserDetails}>
          <View style={styles.NameContainer}>
            <TextScallingFalse style={styles.NameText}>{userData.firstName} {userData.lastName}</TextScallingFalse>
          </View>
          <View style={styles.GeneralDataContainer}>
            {generalDetails()}
          </View>
          <View style={{}}>
            <TextScallingFalse style={styles.AboutText}>
              Pushing Limits on two Wheels - Elite Road Cyclist With a Passion for Speed and Endurance
            </TextScallingFalse>
          </View>
        </View>

        <View style={styles.WatchDataContainer}>
          <View style={styles.WatchReedingsContainer}>
            {watchDetails()}
          </View>
          <View style={styles.WatchNameContainer}>
            <TextScallingFalse style={styles.WatchNameText}>{watch.watchName}</TextScallingFalse>
          </View>
        </View>

        <View style={styles.SportsContainer}>
          <View style={styles.SportsContainerView}>
            <FlatList
              data={sportsData} //for main data access
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()} //to uniquely fetch each data
              //for rending each items in the list
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectSports(item.id)} activeOpacity={0.7}
                  style={[styles.SportsButton, { borderColor: selectSportsId == item.id ? '#B2ED54' : '#303030' }]}>
                  <TextScallingFalse style={{ color: selectSportsId == item.id ? '#B2ED54' : '#505050', fontSize: 12 }}>@</TextScallingFalse>
                  <TextScallingFalse style={{ color: selectSportsId == item.id ? '#B2ED54' : '#505050', fontSize: 13 }}>{item.name}</TextScallingFalse>
                </TouchableOpacity>
              )}
            />
            {/* Sports data section */}
            <View style={styles.SportsDataView}>
              <TextScallingFalse style={styles.SportsDataHeading}>This week</TextScallingFalse>
              <View style={styles.ButtonListContainer}>
                {SportsDataSectionComponent()}
              </View>
            </View>
            {/* graphical presentation section */}
            <View style={styles.GraphicalPresentationSection}>
              <View style={styles.GraphicalNumericData}>
                {SportsGraphicalNumericComponent()}
              </View>
              <View style={styles.graphicPatternView}>

              </View>
            </View>
          </View>
        </View>

      </View>
    </PageThemeView>
  )
}

export default Profile

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
    position: 'absolute',
    width: '100%',
    paddingLeft: 22,
    paddingTop: 105
  },
  ProfilePicContainer: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: 'white',
    borderColor: '#B2ED54',
    borderWidth: 1
  },
  ProfilePicImage: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
    alignSelf: 'center',
    borderRadius: size / 2
  },
  UserDetails: {
    width: '100%',
    gap: 8,
    paddingHorizontal: 18,
    paddingBottom: 20
  },
  NameContainer: {
    width: '100%'
  },
  NameText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    flexWrap: 'wrap'
  },
  GeneralDataContainer: {
    flexDirection: 'row',
    gap: 10
  },
  AboutText: {
    fontSize: 11,
    fontWeight: '200',
    color: 'white',
    flexWrap: 'wrap'
  },
  WatchDataContainer: {
    backgroundColor: '#181818',
    height: 44,
    padding: 6,
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: size / 2
  },
  WatchReedingsContainer: {
    flexDirection: 'row',
    gap: 5,
    height: '100%'
  },
  WatchNameContainer: {
    paddingHorizontal: 15
  },
  WatchNameText: {
    fontSize: 11,
    fontWeight: '500',
    color: 'white'
  },
  WatchDetailsCapsule: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#252525',
    borderRadius: size / 2
  },
  WatchDetailsIcon: {
    width: 17,
    height: 17,
    borderRadius: size / 2
  },
  WatchDetailsText: {
    fontSize: 10,
    fontWeight: '500',
    color: 'white',
    paddingRight: 2
  },
  UserGeneralDetailsText: {
    color: 'white',
    fontWeight: '200',
    fontSize: 10
  },
  SportsDataSectionComponentTitles: {
    fontSize: 12,
    fontWeight: '300',
    color: 'white'
  },
  SportsDataSectionComponentData: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white'
  },
  SportsContainer: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 10
  },
  SportsContainerView: {
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#151515', padding: 10
  },
  SportsButton: {
    paddingHorizontal: 10,
    marginRight: 8,
    paddingVertical: 5,
    gap: 8,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SportsDataView: {
    width: '100%',
    paddingVertical: 15,
    gap: 6,
    paddingHorizontal: 4
  },
  SportsDataHeading: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  ButtonListContainer: {
    flexDirection: 'row',
    gap: 25
  },
  GraphicalPresentationSection: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    paddingLeft: 10,
    paddingVertical: 10
  },
  GraphicalNumericData: {
    height: 70,
    gap: 15
  },
  graphicPatternView:{
    borderWidth: 1, 
    borderColor: '#202020', 
    width: '80%', 
    height: 70
  }
})