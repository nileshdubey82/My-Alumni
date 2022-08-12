import React, { Component,useState ,useEffect} from 'react';
import {
  NoInput,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  Pressable,
} from 'react-native';
import Constants from 'expo-constants';
import { RadioButton } from 'react-native-paper';
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
//import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import { Colors } from './Colors';
//import Icon from "react-native-vector-icons/MaterialIcons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Edit(props) {
  const [gettingloginid, setgettingloginid] = React.useState('');

  useEffect(() => {
    ShowDetail();

    try {
      AsyncStorage.getItem('Email').then((value) => {
        setgettingloginid(value);
        var A = `${value}`;
        ShowDetail(A);
        console.log(A);
        console.log('receive id');
        console.log(value);
      });
    } catch (e) {
      console.log(e);
    }
    var A = `${gettingloginid}`;
    console.log(A);
    console.log('success');
  }, []);

  const [name, setname] = React.useState('');
  const [roll, setroll] = React.useState('');
  const [mobile, setmobile] = React.useState('');
  const [user,setUser]=React.useState('');
  const [email,setemail]=React.useState('');
  const [exp,setexp]=React.useState('');

  function ShowDetail(A){

    // var APIURL = "http://192.168.52.94/phpapidb/login.php";
    var APIURL = "http://127.0.0.1/API_ALUMNI/show2.php";
    // var APIURL = "http://127.0.0.1/API_ALUMNI/show.php";

      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };
    var Data ={
      "Email":A
    };
    fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((Response)=>Response.json())
    .then((Response)=>{
      setUser(Response);
      setname(Response[0].User_name)
      setmobile(Response[0].User_Mobile)
      setemail(Response[0].Email_id)
      setroll(Response[0].RollNumber)
      setexp(Response[0].Experience)
      console.log(Response);
      })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  }
function Update(){
      var Email=`${email}`
      var Name=`${name}`
      var Roll=`${roll}`
      var Exp=`${exp}`
      var Mobile=`${mobile}`

      // alert(Roll)
    // var APIURL = "http://192.168.52.94/phpapidb/login.php";
    var APIURL = "http://127.0.0.1/API_ALUMNI/profile-update.php";
    // var APIURL = "http://127.0.0.1/API_ALUMNI/show.php";

      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };
    var Data ={
      "Email":Email,
      "Name":Name,
      "Mobile":Mobile,
      "Roll":Roll,
      "Exp":Exp
    };
    fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((Response)=>Response.json())
    .then((Response)=>{
      // setUser(Response);
      // alert("Success")
      if(Response[0].Message=="Success"){
          props.navigation.navigate("Profile")
      }
      // alert(Response[0].Message)
      console.log(Response);
      })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewStyle}>
        <Text
          style={{
            color: 'green',
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: 10,
          }}>
          User Information
        </Text>
          <View style={{flex:1}}>
        <Text style={{fontSize:15}}>Your Name :</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Enter Your Name"
            placeholderTextColor="black"
            style={styles.textInput}
            value={name}
            onChangeText={(e) => setname(e)}
          />
        </View>
        <Text style={{fontSize:15}}>Your Email ID :</Text>
        <View style={styles.action}>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            placeholder="Email Id"
            value={email}
            placeholderTextColor="grey"
            style={styles.textInput}
            keyboardType="roll"
          />
        </View>
        <Text style={{fontSize:15}}>Your Mobile Number :</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Enter Your mobile Number"
            placeholderTextColor="grey"
            value={mobile}
            style={styles.textInput}
            onChangeText={(mobile) => setmobile(mobile)}
            keyboardType="numeric"
          />
        </View>
        <Text style={{fontSize:15}}>Your Roll Number:</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Enter Your Roll Number"
            placeholderTextColor="grey"
            style={styles.textInput}
             onChangeText={(roll) => setroll(roll)}
            keyboardType="numeric"
            value={roll}
          />
        </View>
        <Text style={{fontSize:15}}>Your College Experience :</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Enter Your Experience"
            placeholderTextColor="grey"
            style={styles.textInput}
            onChangeText={(exp) => setexp(exp)}
            keyboardType="numeric"
            value={exp}

          />
        </View>

        <View style={styles.loginButtonSection}>
          <Pressable
            style={styles.loginButton}
            onPress={() => {
              Update(),
              ShowDetail()

            }}>
            <Text style={styles.text}>UPDATE</Text>
          </Pressable>
        </View>
      </View>
      </View>
     </ScrollView>
  );
}

const styles = StyleSheet.create({

  viewStyle: {
    padding: 20,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 2,
    color:"green",
    marginBottom: 20,
    height: 40,
    fontSize: 15,
    flex: 1,
    borderRadius:10,
    padding:10

  },
  action: {
    flexDirection: 'row',
    paddingBottom: 5,
    width: '100%',

  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textTransform: 'uppercase',
  },
  loginButtonSection: {
    width: '100%',
    // height: '30%',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#06baab',
    color: 'white',
    height: 35,
    justifyContent: 'center', //up dwn
    alignItems: 'center', //r & l
    width: '70%',
    borderRadius: 10,
  },
});
