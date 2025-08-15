import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import TextScallingFalse from '../../TextScallingFalse'
import Logo from "../../../../assets/visuals/logos/Stamin.Logo.png"

const CentralLogo = () => {
  return (
    <View style={styles.Container}>
    <Image source={Logo} style={styles.logo}/>
      <TextScallingFalse style={styles.Text}>
        Stamin
      </TextScallingFalse>
    </View>
  )
}

export default CentralLogo

const styles = StyleSheet.create({
    Container:{
        justifyContent:'center',
        alignItems:'center',
        width: '25%'
    },
    logo:{
        width: 50,
        height: 50,
    },
    Text:{
        fontSize: 22,
        color:'white',
        fontWeight: 500,
        paddingVertical: 3,
    }
})