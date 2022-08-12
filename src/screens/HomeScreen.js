import React, { useState ,useEffect} from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View,ScrollView } from "react-native";
import axios from 'axios';



const Home = () => {

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}> Title= {item.title}</Text>
    <Text style={[styles.title, textColor]}>Subject= {item.subject}</Text>
    <Text style={[styles.title, textColor]}>Event Detail= {item.event_detail}</Text>
    <Text style={[styles.title, textColor]}> Date= {item.date}</Text>
    <Text style={[styles.title, textColor]}>Venue= {item.venue}</Text>
  </TouchableOpacity>
);

  let [data, setData] = useState([]);
  //Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://127.0.0.1/API_ALUMNI/event-show2.php'
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.Signup_id === selectedId ? "#6e3b6e" : "#009387";
    const color = item.Signup_id === selectedId ? 'black' : 'white';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.Signup_id}
        extraData={selectedId}
      />
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'white',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 17,
  },
});

export default Home;
