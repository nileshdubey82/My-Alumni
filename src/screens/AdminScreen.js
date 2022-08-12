import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

function Temp1({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.admin}>Hello Admin</Text>
      </View>
      <View style={styles.main}>
        <TouchableOpacity
          style={styles.event}
          onPress={() => navigation.navigate('ViewReport')}>
          <Text style={styles.txt1}>
            View All Request!{' '}
            <Feather
              style={styles.icon}
              name="arrow-right"
              size={23}
              color="black"
            />{' '}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.event}
          onPress={() => navigation.navigate('eventpost')}>
          <Text style={styles.txt1}>
            Post New Events{' '}
            <Feather
              style={styles.icon}
              name="arrow-right"
              size={23}
              color="black"
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.event}
          onPress={() => navigation.push('SignIn')}>
          <Text style={styles.txt1}>
            Log-Out{' '}
            <Feather
              style={styles.icon}
              name="log-out"
              size={23}
              color="black"
            />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Temp1;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'lightgray',
    marginTop: 24,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  main: {
    // flex: 1,
    // backgroundColor: 'lightgray',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'lightblue',
    height: 110,
    fontSize: 48,
    fontWeight: 'bold',
    borderRadius: 35,
    alignItems: 'center',
     justifyContent: 'center',
  },
  admin: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 35,
    top: 26,
  },
  event: {
    backgroundColor: 'orange',
    // shadowOpacity:10,
    height: 100,
    width: 200,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
  },
  txt1: {
    fontSize: 18,
    // textShadowColor:"gray",
  },
});
