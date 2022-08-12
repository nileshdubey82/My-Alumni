import React, { Component,useState ,useEffect} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Edit(props) {
  const [username, setusername] = React.useState('');
  const [country, setcountry] = React.useState('');
  const [state, setstate] = React.useState('');
  const [zipcode,setzipcode]=React.useState('');
  const [address,setaddress]=React.useState('');
  const [company,setcompany]=React.useState("");
  const [position,setposition]=React.useState("");
  const [cpackage,setcpackage]=React.useState("");
  const [join,setjoin]=React.useState('');
  // const [cpackage,setcpackage]=React.useState("");

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

  function ShowDetail(A){

    // var APIURL = "http://192.168.52.94/phpapidb/login.php";
    var APIURL = "http://127.0.0.1/API_ALUMNI/company-show.php";
    // var APIURL = "http://127.0.0.1/API_ALUMNI/show.php";

      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };
    var Data ={
      Email:A
    };
    fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((Response)=>Response.json())
    .then((Response)=>{
      console.log(Response);
      setaddress(Response[0].Cm_Address)
      setcountry(Response[0].Country_Name)
      setstate(Response[0].State_Name)
      setzipcode(Response[0].Zipcode)
      setcompany(Response[0].Cm_Name)
      setcpackage(Response[0].Package)
      setjoin(Response[0].Joining_Year)
      setposition(Response[0].Position)
      // set(Response[0].Experience)
      })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  }
function Update(){
      var Email=`${gettingloginid}`
      var Country=`${country}`
      var State=`${state}`
      var Zipcode=`${zipcode}`
      var Address=`${address}`
      var Companyname=`${company}`
      var CPosition=`${position}`
      var CPackage= `${cpackage}`
      var Joinyear=`${join}`

      // alert(Mobile)
    // var APIURL = "http://192.168.52.94/phpapidb/login.php";
    var APIURL = "http://127.0.0.1/API_ALUMNI/company-insert.php";
    // var APIURL = "http://127.0.0.1/API_ALUMNI/show.php";

      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };
    var Data ={
      "Email":Email,
      "country":Country,
      "state":State,
      "zipcode":Zipcode,
      "address":Address,
      "companyname":Companyname,
      "position":CPosition,
      "package":CPackage,
      "joinyear":Joinyear
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
      if(Response[0].Message=='Success')
      props.navigation.push("Profile")
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
            fontSize: 20,
            marginBottom: 10,
          }}>
          Your Working Company Details
        </Text>
          <View style={{flex:1}}>
        <Text style={{fontSize:15}}>Country Name :</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="country name"
            placeholderTextColor="grey"
            style={styles.textInput}
            value={country}
            onChangeText={(e) => setcountry(e)}
          />
        </View>
        <Text style={{fontSize:15}}>State Name:</Text>
        <View style={styles.action}>
          <TextInput

            placeholder="state name"
            value={state}
            placeholderTextColor="grey"
            style={styles.textInput}
            onChangeText={(e) => setstate(e)}
            keyboardType="roll"
          />
        </View>
        <Text style={{fontSize:15}}>Company area Zipcode:</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="zip-code"
            placeholderTextColor="grey"
            value={zipcode}
            style={styles.textInput}
            onChangeText={(e) => setzipcode(e)}
            keyboardType="numeric"
          />
        </View>
        <Text style={{fontSize:15}}>Address of current working area:</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Enter your working address"
            placeholderTextColor="grey"
            style={styles.textInput}
            onChangeText={(roll) => setaddress(roll)}
            keyboardType="numeric"
            value={address}
          />
        </View>
        <Text style={{fontSize:15}}>Company Name :</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Company name"
            placeholderTextColor="grey"
            style={styles.textInput}
            value={company}
            onChangeText={(e) => setcompany(e)}
          />
        </View>
        <Text style={{fontSize:15}}>Your Position:</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your Position"
            value={position}
            placeholderTextColor="grey"
            style={styles.textInput}
            onChangeText={(e) => setposition(e)}
            keyboardType="roll"
          />
        </View>
        <Text style={{fontSize:15}}>Package per ANM:</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="package"
            placeholderTextColor="grey"
            value={cpackage}
            style={styles.textInput}
            onChangeText={(e) => setcpackage(e)}
            keyboardType="numeric"
          />
        </View>
          <Text style={{fontSize:15}}>Joining year:</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="joining year"
            placeholderTextColor="grey"
            value={join}
            style={styles.textInput}
            onChangeText={(e) => setjoin(e)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.loginButtonSection}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              Update()
            }}>
            <Text style={styles.text}>UPDATE</Text>
          </TouchableOpacity>
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
