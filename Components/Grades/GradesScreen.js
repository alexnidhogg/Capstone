import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import {useState} from 'react';
import * as React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Style} from '../StudySessions/StudySessionsStyle';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const GradeScreen = ({navigation}) => {
  const [courseLinks, setCourseLinks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [activityID, setActID] = useState([]);
  function LoadUserActivities() {
    firestore()
      .collection('Activity')
      .where('CourseID', '==', 'TestCourse1')
      .get()
      .then((value) => {
        var id = [];
        var assignmentsRaw = [
          {
            ActivityID: 'zz',
            description: 'nn',
            totalMarks: 14,
            weight: 12,
            sub: '',
          },
        ];
        for (var i = 0; i < value.docs.length; i++) {
          id[i] = value.docs[i].get('ActivityID');
          assignmentsRaw[i] = {
            activityID: value.docs[i].get('ActivityID'),
            description: value.docs[i].get('ActivityTitle'),
            totalMarks: value.docs[i].get('TotalMarks'),
            weight: value.docs[i].get('Weight'),
          };
        }
        setAssignments(assignmentsRaw);
        setWaiting(false);
      });
  }
  function LoadCourseLinks() {
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
  function LoadCourses() {
    firestore()
      .collection('Course')
      .where('CourseId', 'in', courseLinks)
      .get()
      .then((values) => {
        var CoursesRaw = [
          {
            CourseId: 'ALL',
            CourseName: 'All',
          },
        ];
        for (var i = 0; i < values.docs.length; i++) {
          CoursesRaw[i + 1] = {
            CourseId: courseLinks[i],
            CourseName: values.docs[i].get('CourseName'),
          };
        }
        setCourses(CoursesRaw);
        setWaiting(false);
      });
  }

  const [needsLoad, setLoad] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [loadedCourses, setLoadedCourses] = useState(false);
  const [loadedCourseLinks, setLoadedCourseLinks] = useState(false);

  if (!waiting) {
    if (needsLoad) {
      setWaiting(true);
      setLoad(false);
      LoadUserActivities();
    } else if (!needsLoad && !loadedCourseLinks) {
      LoadCourseLinks();
      setWaiting(true);
      setLoadedCourseLinks(true);
    } else if (loadedCourseLinks && !loadedCourses) {
      setWaiting(true);
      setLoadedCourses(true);
      LoadCourses();
    }
  }

  const onReturn = () => {
    setLoad(true);
  };

  return (
    <ImageBackground
      source={require('../Login/back1.png')}
      style={styles.LoginView}>
      <View style={styles.userDataArea}>
        <Text style={styles.areaHeader}>Assignments</Text>
        <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
          <View style={styles.userActivityArea}>
            <ScrollView>
              {assignments.map((item, key) => (
                <View key={key}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      margin: 10,
                      borderRadius: 90,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Assignment', {
                          sessionId: item.activityID,
                          callback: onReturn,
                        })
                      }>
                      <Image
                        source={require('../MainMenu/MainMenuAssets/pen.png')}
                        style={{width: 50, height: 50, margin: 5}}
                      />
                    </TouchableOpacity>
                    <View>
                      <Text style={styles.activityText}>
                        {item.description}
                      </Text>
                      <Text style={styles.activityText}>
                        Total Marks: {item.totalMarks}
                      </Text>
                      <Text style={styles.activityText}>
                        Total Weight: {item.weight * 100}%
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.userClassArea}>
            <ScrollView>
              {courses.map((item, key) => (
                <View style={styles.classItem} key={key}>
                  <TouchableWithoutFeedback>
                    <Text style={styles.classItemText}>{item.CourseName}</Text>
                  </TouchableWithoutFeedback>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
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
  userDataArea: {
    marginTop: 100,
    width: '80%',
    height: '80%',
    backgroundColor: 'rgba(252, 195, 110, 0.8)',
    borderRadius: 30,
  },
  userClassArea: {
    alignSelf: 'flex-end',
    width: '30%',
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 30,
  },
  userActivityArea: {
    width: '60%',
    height: '100%',
    marginTop: 15,
    marginRight: 30,
    borderRadius: 30,
  },
  activityText: {
    color: 'rgb(210,87,255)',
    fontWeight: 'bold',
  },
  areaHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  classItemText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  classItem: {
    borderRadius: 30,
    marginTop: 5,
  },
});
export default GradeScreen;
