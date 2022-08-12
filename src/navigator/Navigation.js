import { View, Text } from 'react-native'
import React ,{useState,useEffect}from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//screens
import HomeScreen from '.././screens/HomeScreen';
import BottomTab from '../bottomtab/BottomTab';
import Login from '../screens/LoginScreen'
import SignUp from '.././screens/SignUpScreen'

import AddressScreen from '../screens/AddressScreen';
import CompanyDetails from '../screens/CompanyDetails';
import EditProfile from '../screens/EditProfile';
import Notifications from '../screens/Notifications';
import SplashScreen from '../screens/SplashScreen';
const Stack = createNativeStackNavigator();

export default function Navigation() {

	const [splash,setsplash]=useState(true);

	useEffect(()=>{

		setTimeout(()=>{
					setsplash(false)
		},2000);
	},[]);


  return (
	<NavigationContainer>
	<Stack.Navigator  screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: 'white',
      }}>
	  { splash ?<Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}} />:null}

	  <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
	  <Stack.Screen name="BottomTab" component={BottomTab} options={{headerShown:false}}/>

	  <Stack.Screen name="SignUp" component={SignUp} />
	  <Stack.Screen name='EditProfile' component={EditProfile}/>
	  <Stack.Screen name='CompanyDetails' component={CompanyDetails}/>
	  <Stack.Screen name='AddressScreen' component={AddressScreen}/>
	  <Stack.Screen name='Notifications' component={Notifications}/>

	</Stack.Navigator>
  </NavigationContainer>
  )
}
