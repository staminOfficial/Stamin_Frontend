import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import logo from '../../../assets/visuals/logos/Stamin.Logo.png'
import TextScallingFalse from '../TextScallingFalse'

const LogoWithName = () => {
  return (
    <View style={styles.componentView}>
      <Image style={styles.Logo} source={logo} />
      <TextScallingFalse style={styles.NameTextStyle}>Stamin</TextScallingFalse>
    </View>
  )
}

export default LogoWithName

const styles = StyleSheet.create({
  Logo: {
    width: 40,
    height: 40,
  },
  componentView: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center'
  },
  NameTextStyle: {
    color: 'white',
    fontSize: 35,
    fontWeight: '500'
  }
})