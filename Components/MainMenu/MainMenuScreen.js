import {SafeAreaView, Text, View} from 'react-native';
import * as React from 'react';
import Header from "./MainMenuAssets/Header";
import ClassObject from "./MainMenuAssets/ClassObject";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MainMenuScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: 'lightgrey', height: hp('100%')}}>
      <View>
        <Header/>
        <ClassObject />
      </View>
    </SafeAreaView>
  );
};

export default MainMenuScreen;

