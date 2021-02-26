import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};
Header.defaultProps = {
  title: 'Study Buddy',
};
const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: 'darkslateblue'
  },
  text: {
    color: '#fff',
    fontSize: 23,
    textAlign: 'left'
  },
});
export default Header;
