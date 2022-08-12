import { View, Text ,Button, TouchableOpacity} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//screens
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Navigation from '../navigator/Navigation';
const Tab = createBottomTabNavigator();

export default function BottomTab(props) {
  return (
	<Tab.Navigator tabBarOptions={{
		activeTintColor: '#009387',
		inactiveTintColor: 'black',
		style: { backgroundColor: 'green'}
		}}
		screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: 'white',
      }}>
	<Tab.Screen name="Home" component={HomeScreen} options={{
		tabBarIcon: () => <Ionicons name='home' size={20} color='black'
		/>
		,
		headerRight: () => (
				<TouchableOpacity style={{right:20}} onPress={()=>{
					props.navigation.navigate("Notifications")
				}}>
					<Ionicons  name='notifications' size={30} color='white' />
				</TouchableOpacity>
      ),
	}}
	/>
	<Tab.Screen name="SearchScreen" component={SearchScreen} options={{
		tabBarIcon: () =><Ionicons name='search-circle' size={25} color='black' />
	}} />
	<Tab.Screen name="ChatScreen" component={ChatScreen} options={{
		tabBarIcon: () => <Ionicons name='chatbox-ellipses' size={25} color='black' />
	}

	}/>
	<Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
		tabBarIcon: () => <Ionicons name='person-circle' size={25} color='black'/>
	}}/>
  </Tab.Navigator>
  )
}

