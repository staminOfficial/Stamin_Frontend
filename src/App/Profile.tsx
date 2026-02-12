import { StyleSheet, Image, View, Dimensions, FlatList } from 'react-native'
import React from 'react'
import PageThemeView from '../components/PageThemeView'
import coverpic from '../../assets/visuals/images/coverpic.jpg'
import TextScallingFalse from '../components/TextScallingFalse'
import HeartIcon from '../../assets/visuals/images/HeartIcon.jpg'
import KalBurnIcon from '../../assets/visuals/images/KalBurnIcon.jpg'
import O2Icon from '../../assets/visuals/images/O2Icon.jpg'

const Profile = () => {

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

  const data = [
    {
      id: 1,
      name: 'item 1'
    },
    {
      id: 2,
      name: 'item 2'
    }
  ]

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

        <View style={{ width: '100%', paddingVertical: 10,  paddingHorizontal: 10 }}>
          <View style={{ width: '100%', flexDirection:'row', borderRadius: 10, borderWidth: 1, borderColor: '#252525', padding: 10 }}>
            <FlatList
              data={data} //for main data access
              horizontal
              keyExtractor={item => item.id.toString()} //for getting exact details from data
              renderItem={({ item }) => (
                <View style={{paddingHorizontal: 10, paddingVertical: 5, gap: 8, borderRadius: 10, borderWidth: 1, flexDirection:'row', justifyContent:'space-between', borderColor:'gray'}}>
                  <TextScallingFalse style={{color:'gray', fontSize: 12}}>@</TextScallingFalse>
                  <TextScallingFalse style={{color:'gray'}}>{item.name}</TextScallingFalse>
                </View>
              )}
            />
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
  }
})