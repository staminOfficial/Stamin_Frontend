import { StyleSheet, TextStyle } from 'react-native'
import React from 'react'
import TextScallingFalse from '../../TextScallingFalse'
interface HeadingText {
    children: React.ReactNode
    style?: TextStyle | TextStyle[];
}

const HeadingText: React.FC<HeadingText> = ({ children, style }) => {
  return (
    <TextScallingFalse style={styles.TextStyle}>
      {children}
    </TextScallingFalse>
  )
}

export default HeadingText

const styles = StyleSheet.create({
    TextStyle:{
     color: 'white',
     fontSize: 30,
     fontWeight: '500',
    }
})