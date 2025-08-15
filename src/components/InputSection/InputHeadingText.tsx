import { StyleSheet, TextStyle, View } from 'react-native'
import TextScallingFalse from '../TextScallingFalse'
interface InputHeadingText {
    children: React.ReactNode;
    style?: TextStyle | TextStyle[]; // allow custom styles
}
const InputHeadingText: React.FC<InputHeadingText> = ({ children, style }) => {
    return (
        <TextScallingFalse style={[styles.textStyle, style]}>
            {children}
        </TextScallingFalse>
    )
}

export default InputHeadingText

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 14,
        color: 'white',
    }
})