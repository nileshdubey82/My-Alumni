import React,{useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import SelectList from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function Chat(props) {
const [gettingloginid,setgettingloginid]=React.useState('')

 useEffect(() => {

            try{
              AsyncStorage.getItem("Email")
              .then((value)=>{
                setgettingloginid(value);
                var A=`${value}`;
                // InsertRecord(A);
              console.log(A)
              console.log("receive id");
              console.log(value);
              })
            }
            catch(e){
              console.log(e)
            }
            var A=`${gettingloginid}`;
            console.log(A);
            console.log("success");
  }, []);
  const [message, setmessage] = React.useState('');
  const [subject, setsubject] = React.useState('');
  const [to, setto] = React.useState('');
  // const [sfrom, setsfrom] = React.useState('prachi@gmail.com');

  const InsertRecord = () => {
    var From=`${gettingloginid}`;
    alert("A value is  "+From)

    var To = `${to}`;
    var Subject=`${subject}`
    var Message = `${message}`;
    // alert("sjfiljsal"+From)
    var checkEmail = RegExp(
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i
    );

    if (
      To.length == 0 ||
      Subject.length == 0 ||
      Message.length == 0

    ) {
      // alert('Required Field Is Missing!!!');
    }
    else {
      alert("data insert sdkfksjdf")
      var InsertAPIURL = 'http://localhost/API_ALUMNI/message-insert.php'; //API to render insert

      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      var Data = {
        From:From,
        To: To,
        Subject: Subject,
        Message: Message
      };
      // FETCH func ------------ ------------------------
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data) //convert data to JSON
      })
        .then((response) => response.json()) //check response type of API (CHECK OUTPUT OF DATA IS IN JSON)
        .then((response) => {
         console.log(response[0].Message)
          alert(response[0].Message); // If data is in JSON => Display alert msg
          // props.navigation.navigate(''); //Navigate to next screen if authentications are valid
        })
        .catch((error) => {
          alert('Error Occured' + error);
        });
    }
  };
  return (
    <SafeAreaView style={styles.main}>
      <TextInput
        style={styles.input}
        // onChangeText={onChangeText}
        // value={text}
        placeholder="From "
        value={gettingloginid}
        editable={false}
        selectTextOnFocus={false}

        placeholderTextColor={'grey'}
      />
      <TextInput
        style={styles.input}
        onChangeText={(i)=>{setto(i)}}
        // value={text}
        placeholder="To "
        placeholderTextColor={'grey'}
      />
      <TextInput
        style={styles.input}
        onChangeText={(i)=>{setsubject(i)}}
        // value={text}
        placeholder="Subject"
        placeholderTextColor={'grey'}
      />
      <TextInput
        style={styles.textArea}
        underlineColorAndroid="transparent"
        placeholder="Type something"
        placeholderTextColor="grey"
        numberOfLines={10}
        multiline={true}
        onChangeText={(i)=>{setmessage(i)}}
      />
      <View style={{justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity style={styles.sendbutton} onPress={()=>{InsertRecord()}}>
        <Text>Send Message</Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-around',left:-50}}>
      <TouchableOpacity style={styles.seenbutton } onPress={()=>{props.navigation.navigate("SeenMessage")}}>
        <Text>Seen Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.seenbutton ]}onPress={()=>{props.navigation.navigate("ReceiveMsg")}}>
        <Text>Received Messages</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'lightgrey',
  },
  sendbutton: {
    backgroundColor: '#009387',
    justifyContent: 'center',
    width: 100,
    alignItems: 'center',
    textAlign: 'center',
    height: 50,
    borderRadius: 10,

  },
  seenbutton: {
    backgroundColor: '#009387',
    justifyContent: 'center',
    width: 100,
    alignItems: 'center',
    textAlign: 'center',
    height: 50,
    borderRadius: 10,
    left:50,
    top: 20,
  },
});
