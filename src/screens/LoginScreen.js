import React, { Component ,useEffect} from 'react';
import { View, Pressable, Text, TextInput, TouchableOpacity, Button,Platform ,StyleSheet,StatusBar,Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Navigation from './RootStack';
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SignIn(props) {

  useEffect(()=>{
        // InsertRecord();
  },[])

   const InsertRecord = () => {
    var Email1 =`${email}`;
    var Password1 = `${pass}`;

    if ((Email1.length == 0) || (Password1.length == 0)) {
      alert("Required Field Is Missing!!!");
    } else {
      var APIURL = "http://localhost/API_ALUMNI/login.php";
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      var Data = {
        "Email":Email1,
        "Password":Password1
      };

      fetch(APIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
        .then((response) =>response.json())
        .then((response) => {
          // alert(response[0].Message)
          if (response[0].Message =="Admin") {
    props.navigation.navigate("Admin");
            console.log("Admin")
            // props.navigation.navigate("Admin");
          } else if(response[0].Message =="Student"){
           console.log("Student")

            const A=Email1;
            console.log(A);
            try{
                  AsyncStorage.setItem("Email",A)
                  console.log("successs email is stored in a");
            }
            catch(e){
                //error
            }
            props.navigation.navigate("HomeScreen");
          }else{
            alert("wait for confirmation")
          }
          console.log(Data);
        })
        .catch((error) => {
          alert(error)
          console.error("ERROR FOUND" + error);
        })
    }

  }
    const[email,setEmail]=React.useState("");
    const[pass,setpass]=React.useState("");

  return (
       <View style={styles.container}>

             <StatusBar backgroundColor='white'/>
        <View style={styles.header}>
            <Animatable.Text
            animation='pulse' easing='ease-out' iterationCount="infinite"
            style={{fontSize:27,fontWeight:"bold",color:'white',fontFamily:'sans-serif'}}>WELCOME ALUMNI</Animatable.Text>


        </View>
        <View style={styles.footer}>
          <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
           <Feather
            name="user"
            color="#05375a"
            size={20}
            />
            <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(e) => setEmail(e)}
            value={email}
            />
            <Feather
            name="check-circle"
            color="green"
            size={2}
            />
         </View>
         <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
         <View style={styles.action}>
              <FontAwesome
              name="lock"
              color="#05375a"
              size={20}
              />
              <TextInput
              placeholder="Your Password"
              style={styles.textInput}
              autoCapitalize="none"
            onChangeText={(p) => setpass(p)}
              />

         </View>
         <TouchableOpacity onPress={() => {
              props.navigation.navigate("Forget");}} >
                <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>

              <TouchableOpacity onPress={() => {
              InsertRecord()
            }} style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 3,
                        marginTop: 15,
                    }]} onPress={()=>{
                      props.navigation.navigate("BottomTab");
                    }}>
                   <Animatable.Text
            animation='pulse' easing='ease-in' iterationCount="infinite" style={[styles.textSign, {color:'#009387' }]}>Login</Animatable.Text>
              </TouchableOpacity>

               <TouchableOpacity
 onPress={() => {
              props.navigation.navigate("SignUp");}} style={{alignItems:'center'}}>
                    <Text style={[styles.textSign,{
                      color:'lightblue',
                      fontSize:14
                    }]}>create new account</Text>
                    </TouchableOpacity>
      </View>
      <View style={{flex:1}}></View>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#009387',
      paddingHorizontal:25
  },
  header:{
      flex: 2,
      // backgroundColor: '#009387',
      justifyContent: 'center',
      alignItems:'center',
      borderBottomLeftRadius: 20,
        borderBottomRightRadius: 100,
    },
    footer:{
      flex: 4,
      backgroundColor: '#fff',
      // borderTopLeftRadius: 20,
      // borderTopRightRadius:20,
      borderRadius:20,
      paddingHorizontal: 20,
      paddingVertical: 30,
      // alignItems:'center'
    },

    text_footer: {
      color: '#05375a',
      fontSize: 18,
      fontWeight:'bold'

    },
    textInput: {
        flex: 1,
        marginTop: Platform.a === '' ? 0 : 1,
        paddingLeft: 10,
        color: '#05375a',
    },

    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5

    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }


});

