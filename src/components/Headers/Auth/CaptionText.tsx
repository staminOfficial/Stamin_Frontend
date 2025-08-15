import { StyleSheet, Text, View, TextStyle } from 'react-native'
import React from 'react'
import TextScallingFalse from '../../TextScallingFalse'
interface CaptionText {
    children: React.ReactNode;
    style?: TextStyle | TextStyle[];
}

const CaptionText: React.FC<CaptionText> = ({ children, style }) => {
  return (
    <TextScallingFalse style={[styles.CaptionTextStyle, style]}>
      {children}
    </TextScallingFalse>
  )
}

export default CaptionText

const styles = StyleSheet.create({
    CaptionTextStyle:{
    fontSize: 13,
    color: 'white'
    }
})