import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const classObject = (props) => {
  return (
    <View style={styles.classIcon}>
      <Image
        style={styles.img}
        source={{
          uri:
            'https://www.cnn.com/2010/POLITICS/06/08/rage.obama/t1largrage.gi.jpg',
        }}
      />
      <Text style={styles.className}>Math or something lol</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  className: {
    position: 'absolute',
    width: wp('80%'),
    color: '#fff',
    fontFamily: 'monospace',
    zIndex: 1,
    padding: 20,
    borderRadius: 10,
    textAlign: 'left',
  },
  classIcon: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  img: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    position: 'relative',
    width: wp('80%'),
    height: 200,
    borderRadius: 10,
    elevation: 8,
    zIndex: 1,
  },
});
export default classObject;
