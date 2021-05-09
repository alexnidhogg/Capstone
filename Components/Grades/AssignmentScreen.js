import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import RNFS from 'react-native-fs';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import * as React from 'react';
import DocumentPicker from 'react-native-document-picker';

const AssignmentScreen = ({route, navigation}) => {
  const str = 'zzzx';
  const {sessionId} = route.params;
  const [subID, setSubID] = useState('');
  const [isSubmitted, loadSubCheck] = useState(false);
  const [singleFile, setSingleFile] = useState('');
  const [note, setNote] = useState('');
  const [file, selectedFile] = useState('');
  const [subDate, setSubDate] = useState(new Date());
  const [waiting, setWaiting] = useState(false);
  const [needsLoad, setLoad] = useState(true);

  const [feedback, loadFeedback] = useState({
    Grade: 0,
    Feedback: 'Please submit your assignment',
  });
  const [session, load] = useState({
    AssignmentName: ' ',
    TotalWeight: ' ',
    Marks: ' ',
  });

  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        readContent: true,
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      //Setting the state to show single file attributes
      setSingleFile(res);
      const response = await fetch(res.uri);
      const blob = await response.blob();
      RNFS.readFile(res.uri, 'base64').then((re) => {
        console.log(re);
        const today = new Date();
        firestore()
          .collection('Submission')
          .add({
            ActivityId: sessionId,
            Comment: note,
            Data: re,
            DateSubmitted: today.getDate(),
            SubmissionId: auth().currentUser.uid.substring(0, 5),
            SubmittedBy: auth().currentUser.uid,
          })
          .then(alert('File has been submitted'));
      });
      loadSubmission();
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  function loadActivity() {
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
        setWaiting(false);
      });
  }
  function loadSubmission() {
    firestore()
      .collection('Submission')
      .where('ActivityId', '==', sessionId)
      .where('SubmittedBy', '==', auth().currentUser.uid)
      .get()
      .then((value) => {
        var sub = '';
        if (value.docs.length != 0) {
          loadSubCheck(true);
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
    setWaiting(false);
    setLoad(false);
  }
  function submitAssignment() {
    const today = new Date();
    firestore()
      .collection('Submission')
      .add({
        ActivityId: sessionId,
        Comment: note,
        Data: file,
        DateSubmitted: today.getDate(),
        SubmissionId: auth().currentUser.uid.substring(0, 5),
        SubmittedBy: auth().currentUser.uid,
      })
      .then(alert('File has been submitted'));
  }
  const [loadedCourses, setLoadedCourses] = useState(false);
  const [loadedCourseLinks, setLoadedCourseLinks] = useState(false);
  if (!waiting) {
    if (needsLoad) {
      setWaiting(true);
      setLoad(false);
      loadActivity();
    } else if (!needsLoad && !loadedCourseLinks) {
      loadSubmission();
      setWaiting(true);
      setLoadedCourseLinks(true);
    }
  }
  return (
    <ImageBackground
      source={require('../Login/back1.png')}
      style={styles.LoginView}>
      <Button
        disabled={isSubmitted}
        title="help"
        onPress={() => selectOneFile()}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(desc) => setNote(desc)}
        value={note}
      />
      <Text>{session.AssignmentName}</Text>
      <Text>{session.TotalWeight}</Text>
      <Text>Submission ID: {subID}</Text>
      <Text>Feedback</Text>
      <Text>Grade: {(feedback.Grade / session.Marks).toFixed(2) * 100}%</Text>
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
