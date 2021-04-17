import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import * as React from 'react';

const AssignmentScreen = ({route, navigation}) => {
  const {sessionId} = route.params;
  const [subID, setSubID] = useState('');
  const [isSubmitted, loadSubCheck] = useState(false);
  const [feedback, loadFeedback] = useState({
    Grade: 0,
    Feedback: 'Please submit your assignment',
  });
  const [session, load] = useState({
    AssignmentName: ' ',
    TotalWeight: ' ',
    Marks: ' ',
  });

  firestore()
    .collection('Activity')
    .where('ActivityID', '==', sessionId)
    .get()
    .then((value) => {
      let activityRaw = {
        AssignmentName: value.docs[0].get('ActivityTitle'),
        TotalWeight: value.docs[0].get('Weight'),
        Marks: value.docs[0].get('TotalMarks'),
      };
      load(activityRaw);
    });
  firestore()
    .collection('Submission')
    .where('ActivityId', '==', sessionId)
    .where('SubmittedBy', '==', auth().currentUser.uid)
    .get()
    .then((value) => {
      var sub = '';
      if (value.docs.length != 0) {
        sub = value.docs[0].get('SubmissionId');
      } else {
        sub = 'NA';
      }
      setSubID(sub);
    });
  if (subID != 'NA') {
    firestore()
      .collection('AssignmentGrade')
      .where('SubmissionId', '==', subID)
      .get()
      .then((value) => {
        let grade = {
          Grade: value.docs[0].get('Grade'),
          Feedback: value.docs[0].get('Feedback'),
        };
        loadFeedback(grade);
      });
  }
  return (
    <ImageBackground
      source={require('../Login/back1.png')}
      style={styles.LoginView}>
      <Text>{session.AssignmentName}</Text>
      <Text>{session.TotalWeight}</Text>
      <Text>Submission ID: {subID}</Text>
      <Text>Feedback</Text>
      <Text>Grade: {((feedback.Grade / session.Marks).toFixed(2) * 100)}%</Text>
      <Text>Additional Comments {feedback.Feedback}</Text>
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
export default AssignmentScreen;
