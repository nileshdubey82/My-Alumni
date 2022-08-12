// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';

// import Navigation from '../components/RootStack/';

function Search  (props) {

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState('');
  const [masterDataSource, setMasterDataSource] = useState('');

  useEffect(() => {
    fetch('http://localhost/API_ALUMNI/profile-show.php')
      .then((response) => response.json())
      .then((response) => {
        setFilteredDataSource(response);
        setMasterDataSource(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const response = masterDataSource.filter(
        function (item) {
          const itemData = item.Signup_id
            ? item.User_name.toUpperCase()
            : ''
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(response);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <TouchableOpacity style={styles.itemStyle} onPress={()=>{props.navigation.navigate("ProfileDetails", {
        item: item
      })}}>
      <Text>
        {item.User_name.toUpperCase()}{'\n'}
         {item.Branch_Dep.toUpperCase()}{"\n"}
          {item.Email_id.toUpperCase()}
      </Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height:1,
          marginTop:3,
          width: '100%',
          // backgroundColor: 'black',

        }}
      />
    );
  };


  return (
    <SafeAreaView style={{flex: 1,padding:10}}>
        <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          onPress={()=>{props.navigation.navigate("Forget");}}
        />
      </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
    backgroundColor:"lightblue",
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});

export default Search;
