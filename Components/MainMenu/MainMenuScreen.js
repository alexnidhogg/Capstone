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
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useState} from 'react';
import {ProgressChart} from 'react-native-chart-kit';
import * as Dimensions from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
} from 'victory-native';

//
const MainMenuScreen = ({navigation}) => {
  const [user, setUser] = useState({
    Icon: '',
    Name: '',
  });

  const [needsLoad, setLoad] = useState(true);
  const [waiting, setWaiting] = useState(false);
  function loadUser() {
    firestore()
      .collection('Users')
      .where('UserId', '==', auth().currentUser.uid)
      .get()
      .then((value) => {
        var userRaw = {
          Icon: value.docs[0].get('profilePic'),
          Name:
            value.docs[0].get('FirstName') +
            ' ' +
            value.docs[0].get('LastName'),
        };
        setUser(userRaw);
        setWaiting(false);
      });
  }
  if (!waiting) {
    if (needsLoad) {
      setWaiting(true);
      setLoad(false);
      loadUser();
    }
  }

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
            navigation.navigate('Login');
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
          borderRadius: 90,
        }}
        source={{uri: user.Icon}}
      />
      <Text style={styles.userNameText}>{user.Name}</Text>
      <Text style={styles.userAreaHeader}>This Week</Text>
      <View style={styles.userDataArea}>
        <View style={{flexDirection: 'row', marginLeft: 25}}>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => navigation.navigate('Grades')}>
            <Image
              style={{width: 50, height: 50, marginLeft: 'auto'}}
              source={require('./MainMenuAssets/assignments.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => navigation.navigate('StudySessions')}>
            <Image
              style={{width: 50, height: 50, marginLeft: 'auto'}}
              source={require('./MainMenuAssets/stats.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => navigation.navigate('StudySessions')}>
            <Image
              style={{width: 50, height: 50, marginLeft: 'auto'}}
              source={require('./MainMenuAssets/study.png')}
            />
          </TouchableOpacity>
        </View>
        <VictoryPie
          height={200}
          width={200}
          innerRadius={25}
          colorScale={["cyan", "pink"]}
          padAngle={5}
          data={[
            {x: 'Done', y: 10},

            {x: 'In Progress', y: 90},
          ]}
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
