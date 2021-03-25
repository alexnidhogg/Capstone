import * as React from 'react';
import Header from './MainMenuAssets/Header';
import ClassObject from './MainMenuAssets/ClassObject';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView, Text, View, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
//
const MainMenuScreen = ({navigation}) => {
  console.log(auth().currentUser.uid);
  return (
    <SafeAreaView style={{backgroundColor: '#fff', height: hp('100%')}}>
      <View>
        <Button
          style={{color: 'grey', borderRadius: 10, width: wp('80%')}}
          title="View All Study Sessions"
          onPress={() => navigation.navigate('StudySessions')}
        />
        <Button
          style={{color: 'grey', borderRadius: 10, width: wp('80%')}}
          title="Logout"
          onPress={() => auth().signOut()}
        />
      </View>
      <View>
        <ClassObject
          title={'MATH2001'}
          imgSrc={
            'https://cdn.discordapp.com/attachments/496478386085167127/814982323413581838/9k.png'
          }
        />
        <ClassObject
          title={'ENG4081'}
          imgSrc={
            'https://cdn.discordapp.com/attachments/496478386085167127/814982593095008286/Z.png'
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default MainMenuScreen;
