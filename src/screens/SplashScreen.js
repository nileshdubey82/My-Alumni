import { View, Text,StyleSheet ,Image, StatusBar} from 'react-native'
import React from 'react'

export default function SplashScreen() {
  return (
	<View style={styles.container}>
	<StatusBar hidden={true} backgroundColor="white"/>
	<Image source={require('../Images/loginpage.jpeg')} style={{ width: 350, height: 350 }} />
	</View>
  )
}

const styles = StyleSheet.create({
	container:{
		flex:1 ,
		backgroundColor:'#ffffff',
		justifyContent:'center'
	}
})
