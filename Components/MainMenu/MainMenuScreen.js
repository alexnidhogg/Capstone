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
  Picker,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import userpic from '../Login/user.png';
import {useState} from 'react';
import {ProgressChart} from 'react-native-chart-kit';
import * as Dimensions from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
} from 'victory-native';
import {PickerItem} from 'react-native/Libraries/Components/Picker/Picker';

//Do
const MainMenuScreen = ({navigation}) => {
  const [user, setUser] = useState({
    Icon: '',
    Name: '',
    UserClass: '',
    uid: '',
  });
  //Spagetti Haven send help plz
  const [listLoad, setListLoad] = useState(false);
  const [needsLoad, setLoad] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [chartState, setChart] = useState('Assignments Due');
  const [pCheck, setCheck] = useState(false);
  const [loadedCourseLinks, setLoadedCourseLinks] = useState(false);
  const [courseLinks, setCourseLinks] = useState([]);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [submissionTotal, setSubCount] = useState(0);
  const [childLink, setChildrenLink] = useState([]);
  const [userload, setLoadUser] = useState(true);
  const [loadedAct, setActLoad] = useState(false);
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
          UserClass: value.docs[0].get('UserClass'),
          uid: auth().currentUser.uid,
        };
        if (userRaw.UserClass == 'Parent') {
          setLoadUser(false);
          setCheck(true);
          setWaiting(true);
          loadChildrenLink();
        }
        setUser(userRaw);

        setWaiting(false);
      });
  }
  function loadChildrenLink() {
    firestore()
      .collection('ParentLink')
      .where('ParentUserID', '==', auth().currentUser.uid)
      .get()
      .then((value) => {
        const childLinkRaw = [];
        for (var i = 0; i < value.docs.length; i++) {
          childLinkRaw[i] = value.docs[i].get('ChildUserId');
        }
        setChildrenLink(childLinkRaw);
        setListLoad(true);
        setWaiting(false);
      });
  }
  function loadCourseLinks() {
    firestore()
      .collection('CourseMembership')
      .where('UserID', '==', user.uid)
      .get()
      .then((values) => {
        var CourseLinksRaw = [];
        for (var i = 0; i < values.docs.length; i++) {
          CourseLinksRaw[i] = values.docs[i].get('CourseID');
        }
        setCourseLinks(CourseLinksRaw);
        console.log(courseLinks);
        setWaiting(false);
      });
  }
  function loadSubTotal() {
    firestore()
      .collection('Submission')
      .where('SubmittedBy', '==', user.uid)
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
  function showChild() {
    var tempUser = {
      Icon: user.Icon,
      Name: user.Name,
      UserClass: user.UserClass,
      uid: childLink[0],
    };
    setUser(tempUser);
    setWaiting(false);
  }
  // i dont know how it works, i dont know why it works... but im afraid to ask
  if (!waiting) {
    if (needsLoad) {
      setWaiting(true);
      loadUser();
      setLoad(false);
    } else if (!loadedCourseLinks && userload) {
      setWaiting(true);
      loadCourseLinks();
      loadSubTotal();
      setLoadedCourseLinks(true);
    } else if (loadedCourseLinks && !loadedAct) {
      if (courseLinks.length != 0) {
        setWaiting(true);
        loadActivityCount();
        setActLoad(true);
      }
    } else if (!userload && listLoad) {
      setWaiting(true);
      showChild();
      setLoadUser(true);
    }
  }
  console.log(courseLinks.length);
  return (
    <ImageBackground
      source={require('../Login/back1.png')}
      style={styles.LoginView}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.titleText}>Study Buddy</Text>
      </View>
      {user.icon === '' ? (
        <Text>Be Paitent Dickhead </Text>
      ) : (
        <Image
          style={{
            marginTop: 30,
            width: 150,
            height: 150,
            borderRadius: 90,
          }}
          source={{uri: user.Icon}}
        />
      )}

      <Text style={styles.userNameText}>{user.Name}</Text>
      {pCheck === true ? (
        <Text style={styles.userAreaHeader}>Parental Overview</Text>
      ) : (
        <Text style={styles.userAreaHeader}>This Week</Text>
      )}

      <View style={styles.userDataArea}>
        <View style={{flexDirection: 'row', marginLeft: 25}}>
          {pCheck === false ? (
            <TouchableOpacity
              style={styles.menuIcon}
              onPress={() => navigation.navigate('Grades')}>
              <Image
                style={{width: 50, height: 50, marginLeft: 'auto'}}
                source={require('./MainMenuAssets/assignments.png')}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}

          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => navigation.navigate('StudySessions')}>
            <Image
              style={{width: 50, height: 50, marginLeft: 'auto'}}
              source={require('./MainMenuAssets/stats.png')}
            />
          </TouchableOpacity>
          {pCheck === false ? (
            <TouchableOpacity
              style={styles.menuIcon}
              onPress={() => navigation.navigate('StudySessions')}>
              <Image
                style={{width: 50, height: 50, marginLeft: 'auto'}}
                source={require('./MainMenuAssets/study.png')}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}
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
