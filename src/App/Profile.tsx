import { StyleSheet, Image, View, Dimensions } from 'react-native'
import React from 'react'
import PageThemeView from '../components/PageThemeView'
import coverpic from '../../assets/visuals/images/coverpic.jpg'
import profilePic from '../../assets/visuals/images/Stamin_Login.png'
import TextScallingFalse from '../components/TextScallingFalse'
import HeartIcon from '../components/Svg/WatchIndicatorIcons/HeartIcon'

const Profile = () => {

  const size = Dimensions.get('window').width * 0.3;

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
        <View style={{ width: '100%', gap: 4, paddingHorizontal: 18}}>
          <View style={{ width: '100%'}}>
            <TextScallingFalse style={{ color: 'white', fontSize: 20, fontWeight: '400', flexWrap:'wrap'}}>Taylor Huges</TextScallingFalse>
          </View>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <View>
              <TextScallingFalse style={{ color: 'white', fontWeight: '200', fontSize: 10 }}>Jun 2001</TextScallingFalse>
            </View>
            <View>
              <TextScallingFalse style={{ color: 'white', fontWeight: '200', fontSize: 10 }}>Brooklyn, Britain</TextScallingFalse>
            </View>
            <View>
              <TextScallingFalse style={{ color: 'white', fontWeight: '200', fontSize: 10 }}>Status. Yesterday</TextScallingFalse>
            </View>
          </View>
          <View style={{ width: '100%', backgroundColor:'orange'}}>
            <TextScallingFalse style={{fontSize: 11, fontWeight:'400', color:'white', flex: 1, flexWrap: 'wrap'}}>
              Pushing Limits on two Wheels - Elite Road Cyclist With a Passion for Speed and Endurance
            </TextScallingFalse>
          </View>
        </View>

        <View style={{backgroundColor:'#181818', width:'100%', paddingVertical: 20, flexDirection:'row', borderRadius: size/2}}>
        <View style={{flexDirection:'row'}}>
          {/* <HeartIcon /> */}
          <TextScallingFalse style={{fontSize: 12, fontWeight:'500', color:'white'}}>
            75
          </TextScallingFalse>
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
    marginBottom: '11%',
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
  }
})