import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageThemeView from '../components/PageThemeView'
import TextScallingFalse from '../components/TextScallingFalse'

const Profile = () => {
  return (
    <PageThemeView>
      <TextScallingFalse style={{color:'white', fontWeight:'500', fontSize: 20, alignSelf:'center'}}>Profile</TextScallingFalse>
    </PageThemeView>
  )
}

export default Profile

const styles = StyleSheet.create({})