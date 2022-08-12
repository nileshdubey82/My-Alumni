import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile(props) {
  const [name, setname] = React.useState('');
  const [roll, setroll] = useState('');
  const [mobile, setmobile] = useState('');
  const [user, setUser] = useState('');
  const [email, setemail] = useState('');
  const [exp, setexp] = useState('');

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
  function ShowDetail(A) {
    //         <Ionicons name='person-circle' size={60} color='black'
    // Loginid=`${gettingloginid}`
    // />
    // console.log("advbhjnadsk")
    // alert(Loginid)
    // alert(A)
    // console.log(Loginid)
    // console.log('fethc a here')
    // console.log(A)
    // var APIURL = "http://192.168.52.94/phpapidb/login.php";
    var APIURL = 'http://127.0.0.1/API_ALUMNI/show2.php';
    // var APIURL = "http://127.0.0.1/API_ALUMNI/show.php";

    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    var Data = {
      Email: A,
    };
    fetch(APIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then((Response) => Response.json())
      .then((Response) => {
        console.log('login data is succees');
        console.log(Response);
        setUser(Response);
        setname(Response[0].User_name);
        setmobile(Response[0].User_Mobile);
        setemail(Response[0].Email_id);
        setroll(Response[0].Branch_Dep);
        setexp(Response[0].Experience);
        // setusername(Response[0].User_name)
      })
      .catch((error) => {
        console.error('ERROR FOUND' + error);
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <View style={styles.userInfoSection}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('./my.jpeg')}
              style={{ width: 110, height: 110, borderRadius: 360, top: 20 }}
            />
            <Title
              style={[
                styles.title1,
                {
                  marginTop: 30,
                  marginBottom: 5,
                },
              ]}>
              {name}
            </Title>
            <Text style={styles.title2}>{email}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 3 }}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => props.navigation.navigate('EditProfile')}>
          <Text style={styles.text}>Edit Profile</Text>
          <Icon name="edit" color="#009387" size={25} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => props.navigation.navigate('CompanyDetails')}>
          <Text style={styles.text}>Company Works</Text>
          <Icon name="briefcase" color="#009387" size={25} />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={[
              styles.signout,
              {
                borderColor: '#009387',
                borderWidth: 2,
                marginTop: 35,
              },
            ]}
            onPress={() => props.navigation.push('SignIn')}>
            <Text
              style={[
                styles.textSignout,
                {
                  color: '#009387',
                },
              ]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    // paddingHorizontal: 30,
    marginBottom: 25,
    flex: 3,
    backgroundColor: '#009387',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  title1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  title2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },

  text: {
    color: 'black',
    fontWeight: '600',
    fontSize: 25,
    lineHeight: 26,
  },

  signout: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSignout: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: '',
  },
});
