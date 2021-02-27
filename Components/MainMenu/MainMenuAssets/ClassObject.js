import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logo from './cal.jpg';
import grades from './grades.jpg';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/core";

const ClassObject = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableHighlight onPress={() => navigation.navigate('Grades')}>
      <View style={styles.classIcon}>
        <Image style={styles.img} source={{uri: props.imgSrc}} />
        <Text style={styles.className}>{props.title}</Text>
        <Image style={styles.cal} source={logo} />

        <Image style={styles.grade} source={grades} />
      </View>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  className: {
    position: 'absolute',
    width: wp('80%'),
    color: '#fff',
    fontSize: 20,
    fontFamily: 'sans',
    zIndex: 1,
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
    textAlign: 'right',
  },
  classIcon: {
    marginTop: 30,
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  img: {
    width: wp('80%'),
    height: 200,
    borderRadius: 10,
    zIndex: 1,
  },
  cal: {
    right: 50,
    top: 50,
    borderRadius: 10,
    width: 50,
    height: 50,
    position: 'absolute',
    zIndex: 1,
  },
  grade: {
    right: 50,
    top: 145,
    borderRadius: 10,
    width: 50,
    height: 50,
    position: 'absolute',
    zIndex: 1,
  },
});
export default ClassObject;
