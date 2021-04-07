import * as React from 'react';
import Header from './MainMenuAssets/Header';
import ClassObject from './MainMenuAssets/ClassObject';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
//
const MainMenuScreen = ({navigation}) => {
  console.log(auth().currentUser.uid);
  return (
    <ImageBackground
      source={require('../Login/back1.png')}
      style={styles.LoginView}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.titleText}>Study Buddy</Text>
        <Text
          style={styles.titleText}
          onPress={() => {
            auth().signOut();
          }}>
          {' '}
          Log Out
        </Text>
      </View>
      <Image
        style={{
          marginTop: 30,
          width: 150,
          height: 150,
        }}
        source={require('../Login/user.png')}
      />
      <Text style={styles.userNameText}>{auth().currentUser.email}</Text>
      <Text style={styles.userAreaHeader}>This Week</Text>
      <View style={styles.userDataArea}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.menuIcon}
            source={require('./MainMenuAssets/assignments.png')}
          />
          <Image
            style={styles.menuIcon}
            source={require('./MainMenuAssets/stats.png')}
          />
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => navigation.navigate('StudySessions')}>
            <Image
              style={{width: 50, height: 50, marginLeft: 'auto'}}
              source={require('./MainMenuAssets/study.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Button
          style={{color: 'grey', borderRadius: 10, width: wp('80%')}}
          title="View All Study Sessions"
          onPress={() => navigation.navigate('StudySessions')}
        />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  LoginView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  titleText: {
    paddingLeft: 15,
    marginTop: 20,
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'MMA Champ',
    textShadowRadius: 10,
    textShadowColor: 'black',
  },
  userDataArea: {
    width: '55%',
    height: '50%',
    backgroundColor: 'rgba(252, 195, 110, 0.8)',
    borderRadius: 30,
  },
  userNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  userAreaHeader: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  menuIcon: {
    marginLeft: 'auto',
    marginRight: 15,
    marginTop: 10,
    width: 50,
    height: 50,
  },
});
export default MainMenuScreen;
