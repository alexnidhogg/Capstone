import {SafeAreaView, Text, View} from 'react-native';
import * as React from 'react';
import Header from './MainMenuAssets/Header';
import ClassObject from './MainMenuAssets/ClassObject';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MainMenuScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#fff', height: hp('100%')}}>
      <View>
        <Header />
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
