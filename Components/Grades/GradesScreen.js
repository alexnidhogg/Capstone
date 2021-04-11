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
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Style} from '../StudySessions/StudySessionsStyle';

const GradeScreen = ({navigation}) => {
  const [courseLinks, setCourseLinks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);

  function LoadUserActivities() {
    var AssignmentsList = [];

    firestore()
      .collection('Activity')
      .where('CourseID', '==', 'TestCourse1')
      .get()
      .then((value) => {
        var assignmentsRaw = [
          {
            description: 'nn',
            totalMarks: 14,
            weight: 12,
          },
        ];
        for (var i = 0; i < value.docs.length; i++){
          assignmentsRaw[i] = {
            description: value.docs[i].get('ActivityTitle'),
            totalMarks: value.docs[i].get('TotalMarks'),
            weight: value.docs[i].get('Weight'),
          };
        }
        setAssignments(assignmentsRaw);
      });
  }
  function LoadCourseLinks() {
    firestore()
      .collection('CourseRecord')
      .where('UserId', '==', auth().currentUser.uid)
      .get()
      .then((values) => {
        var CourseLinksRaw = [];
        for (var i = 0; i < values.docs.length; i++) {
          CourseLinksRaw[i] = values.docs[i].get('CourseId');
        }
        setCourseLinks(CourseLinksRaw);
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
      });
  }
  LoadCourseLinks();
  setTimeout(() => {
    LoadCourses();
  }, 2000);
  LoadUserActivities();
  return (
    <ImageBackground
      source={require('../Login/back1.png')}
      style={styles.LoginView}>
      <View style={styles.userDataArea}>
        <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
          <View style={styles.userActivityArea}>
            <ScrollView>
              {assignments.map((item, key) => (
                <View key={key}>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={require('../Login/user.png')} style={{width: 50, height: 50}}/>
                    <View>
                      <Text>{item.description}</Text>
                      <Text>{item.totalMarks}</Text>
                      <Text>{item.weight}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.userClassArea}>
            <ScrollView>
              {courses.map((item, key) => (
                <View key={key}>
                  <TouchableWithoutFeedback>
                    <Text>{item.CourseName}</Text>
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
    marginRight: 20,
    backgroundColor: 'red',
    borderRadius: 30,
  },
});
export default GradeScreen;
