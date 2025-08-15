import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageThemeView from '../components/PageThemeView'
import TextScallingFalse from '../components/TextScallingFalse'

const Home = () => {
  return (
    <PageThemeView>
      <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
      <TextScallingFalse style={{color:'white', fontSize: 16, fontWeight:'500', alignSelf:'center'}}>Welcome to Stamin</TextScallingFalse>
      </View>
    </PageThemeView>
  )
}

export default Home

const styles = StyleSheet.create({})