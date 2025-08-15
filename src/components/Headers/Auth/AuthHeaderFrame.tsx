import { StyleSheet, View } from 'react-native'
interface AuthHeaderFrameViewProps {
  children: React.ReactNode; // Define children prop
}
const AuthHeaderFrame: React.FC<AuthHeaderFrameViewProps> = ({ children })  => {
  return (
    <View style={styles.containerView}>
      {children}
    </View>
  )
}
export default AuthHeaderFrame

const styles = StyleSheet.create({
    containerView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 20,
        paddingVertical: 32
    }
})