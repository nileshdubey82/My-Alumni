import React, { Component } from 'react';
import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import Constants from 'expo-constants';
import SelectList from 'react-native-dropdown-select-list';
import { RadioButton } from 'react-native-paper';
import HomeStack from '../navigator/Navigation'

export default function Signup(props) {
  const [name, setname] = React.useState('');

  const [email, setemail] = React.useState('');
  const [mobile, setmobile] = React.useState('');
  const [course, setcourse] = React.useState('');
  const [user_type, setuser_type] = React.useState('');
  const [pass, setpass] = React.useState('');
  const [cpass, setcpass] = React.useState('');

  const InsertRecord = (props,navigation) => {
    var Email=`${email}`;
    var Password=`${pass}`;
    var ConfirmPw=`${cpass}`;
    var Name=`${name}`;
    var Mobile=`${mobile}`;
    var Branch=`${course}`;
    var User_type=`${user_type}`;

    var checkEmail = RegExp(
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i
    );

    if (
      Email.length == 0 ||
      Password.length == 0 ||
      ConfirmPw.length == 0 ||
      Name.length == 0 ||
      Mobile.length == 0 ||
      Branch.length == 0 ||
      User_type.length == 0
    ) {
      alert('Required Field Is Missing!!!');
    } else if (!checkEmail.test(Email)) {
      alert('invalid email!!!');
    }
    // Password validations
    else if (Password.length < 8) {
      alert('Minimum 08 characters required!!!');
    } else if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(Password)) {
      alert(' password  Use atleast 01 special character!!!');
    } else if (/[ ]/.test(Password)) {
      alert("Don't include space in password!!!");
    } else if (Password !== ConfirmPw) {
      alert('Password doesnot match!!!');
    } else if (Mobile.length == 10) {
      alert('mobile number must 10 digits');
    } else {
      //http://192.168.29.173/phpapidb/login.php
      //http://10.0.2.2:80/SignIn/SignIn.php
      var InsertAPIURL = "http://localhost/API_ALUMNI/profile-insert.php"; //API to render insert

      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      var Data = {
        "Email": Email,
        "Password": Password,
        "Name": Name,
        "Mobile": Mobile,
        "Branch": Branch,
        "User_type": User_type
      };

      // FETCH func ------------ ------------------------
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data) //convert data to JSON
      })
        .then((response) => response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
        .then((response) => {
          if(response[0].Message=="Complete"){
          alert(response[0].Message); // If data is in JSON => Display alert msg
          props.navigation.navigate('SignIn')
          } //Navigate to next screen if authentications are valid
        })
        .catch((error) => {
          alert('Error Occured' + error);
        });
    }
  };
  const data = [
    { key: 'cse', value: 'CSE' },
    { key: 'ee', value: 'EE' },
    { key: 'civil', value: 'CIVIL' },
    { key: 'mechanical', value: 'Mechanical' },
  ];

  return (
    <ScrollView style={styles.container} >
    <View style={styles.viewStyle}>
      <Text
        style={{
          color: 'green',
          fontWeight: 'bold',
          fontSize: 30,
          marginBottom: 10,
        }}>
        REGISTERATION FORM

      </Text>
      <Text>{cpass}</Text>

      <View style={styles.action}>
        <TextInput
          placeholder="Enter Your Name"
          placeholderTextColor="black"
          style={styles.textInput}
          onChangeText={(e) => setname(e)}
        />
      </View>

      <View style={styles.action}>
        <TextInput
          placeholder="Enter Email"
          placeholderTextColor="black"
          style={styles.textInput}
          onChangeText={(email) => setemail( email )}
        keyboardType="Email"
        />
      </View>

      <View style={styles.action}>
        <TextInput
          placeholder="Enter Your Mobile Number"
          placeholderTextColor="black"
          style={styles.textInput}
          onChangeText={(mobile) => setmobile(mobile)}
          keyboardType="numeric"
        />
      </View>
      <View>
        <Text style={{  fontSize: 17,color:'black' }}>Select your course :</Text>
        <SelectList data={data} setSelected={setcourse}  style={{color:"black"}}/>
      </View>
      <Text style={{ top: 10, fontSize: 17,color:'black' }}> select your type</Text>
      <TouchableOpacity
        onPress={() => {}}
        style={{ flexDirection: 'row', top: 10 }}>
        <RadioButton
          value="student"
          onPress={() => {
            setuser_type('Student');
          }}
          status={user_type === 'Student' ? 'checked' : 'unchecked'}
        />
        <Text
          style={{ fontSize: 17, color:'black' }}
          onPress={() => {
            setuser_type('Student');
          }}>
          STUDENT
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {}}>
        <RadioButton
          value="faculty"
          onPress={() => {
            setuser_type('Faculty');
          }}
          status={user_type === 'Faculty' ? 'checked' : 'unchecked'}
        />
        <Text
          style={{ fontSize: 17,color:'black' }}
          onPress={() => {
            setuser_type('Faculty');
          }}>
          FACULTY
        </Text>
      </TouchableOpacity>
      <View style={styles.action}>
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="black"
          style={styles.textInput}
          onChangeText={(pass)=>{setpass(pass)}}  />
      </View>
      <View style={styles.action}>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="black"
          style={styles.textInput}
          onChangeText={(cpass)=>{ setcpass(cpass)}}
        />
      </View>

      <View style={styles.loginButtonSection}>
        <Pressable
          style={styles.loginButton}
          onPress={() => {
            InsertRecord();
          }}>
          <Text style={styles.text} onPress={()=>{props.navigation.navigate("SignIn")}}>Register</Text>
        </Pressable>
      </View>
    </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  viewStyle: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 20,
    height: 40,
    fontSize: 15,
    flex: 1,
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
