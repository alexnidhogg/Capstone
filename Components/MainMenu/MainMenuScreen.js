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
  const [chartState, setChart] = useState('Assignments Due');

  const [loadedCourseLinks, setLoadedCourseLinks] = useState(false);
  const [courseLinks, setCourseLinks] = useState([]);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [submissionTotal, setSubCount] = useState(0);
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
      });
  }
  function loadCourseLinks() {
    firestore()
      .collection('CourseMembership')
      .where('UserID', '==', auth().currentUser.uid)
      .get()
      .then((values) => {
        var CourseLinksRaw = [];
        for (var i = 0; i < values.docs.length; i++) {
          CourseLinksRaw[i] = values.docs[i].get('CourseID');
        }
        setCourseLinks(CourseLinksRaw);
        setWaiting(false);
      });
  }
  function loadSubTotal(){
    firestore()
      .collection('Submission')
      .where('SubmittedBy', '==', auth().currentUser.uid)
      .get()
      .then((values) => {
        setSubCount(values.docs.length);
        setWaiting(false);
      });
  }
  function loadActivityCount() {
    firestore()
      .collection('Activity')
      .where('CourseID', 'in', courseLinks)
      .get()
      .then((values) => {
        setAssignmentCount(values.docs.length);
        setWaiting(false);
      });
  }
  if (!waiting) {
    if (needsLoad) {
      setWaiting(true);
      setLoad(false);
      loadUser();
      loadCourseLinks();
    } else if (!needsLoad && !loadedCourseLinks) {
      setWaiting(true);
      setLoadedCourseLinks(true);
      loadActivityCount();
      loadSubTotal();
    }
  }

  return (
    <ImageBackground
      source={require('../Login/back1.png')}
      style={styles.LoginView}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.titleText}>Study Buddy</Text>
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
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
          }}>
          {chartState}
        </Text>
        <VictoryPie
          animate={{duration: 500}}
          height={200}
          width={230}
          innerRadius={25}
          colorScale={['cyan', 'pink']}
          padAngle={5}
          style={{
            alignSelf: 'center',
            labels: {fill: 'white', fontWeight: 'bold', fontSize: 10},
          }}
          data={[
            {x: 'Done', y: submissionTotal},

            {x: 'In Progress', y: assignmentCount - submissionTotal},
          ]}
        />
        <Text
          style={styles.logoutText}
          onPress={() => {
            auth().signOut();
            navigation.navigate('Login');
          }}>
          {' '}
          Log Out
        </Text>
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
  logoutText: {
    textAlign: 'center',
    flex: 1,
    fontSize: 15,
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
