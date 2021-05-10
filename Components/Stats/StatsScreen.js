import {Text} from 'react-native-svg';
import {useState} from 'react';
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as React from 'react';

const StatsScreen = ({route, navigation}) => {
  const [courseLinks, setCourseLinks] = useState([]);
  const [activity, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [submissionId, setSubmissionId] = useState([]);
  const [assignmentData, setAssignmentData] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [loadedCourseLinks, setLoadedCourseLinks] = useState(false);
  const {uid} = route.params;
  const [loadedActivities, setLoadedActivities] = useState(false);
  const [loadedSubmissions, setLoadedSubmission] = useState(false);
  const [loadedGrades, setLoadedGrades] = useState(false);

  function LoadCourseLinks() {
    firestore()
      .collection('CourseMembership')
      .where('UserID', '==', uid)
      .get()
      .then((values) => {
        var CourseLinksRaw = [];
        for (var i = 0; i < values.docs.length; i++) {
          CourseLinksRaw[i] = values.docs[i].get('CourseID');
        }
        setSelectedActivity(CourseLinksRaw[0]);
        setCourseLinks(CourseLinksRaw);
        setWaiting(false);
      });
  }
  function loadActivities() {
    firestore()
      .collection('Activity')
      .where('CourseID', '==', selectedActivity)
      .get()
      .then((value) => {
        var assignmentsRaw = [];
        for (var i = 0; i < value.docs.length; i++) {
          assignmentsRaw[i] = value.docs[i].get('ActivityID');
        }
        setActivities(assignmentsRaw);
        setWaiting(false);
      });
  }
  function loadSubmission() {
    firestore()
      .collection('Submission')
      .where('ActivityId', 'in', activity)
      .where('SubmittedBy', '==', uid)
      .get()
      .then((value) => {
        let sub = [];
        if (value.docs.length != 0) {
          for (var i = 0; i < value.docs.length; i++) {
            sub[i] = value.docs[i].get('SubmissionId');
          }
        }
        setSubmissionId(sub);
        setWaiting(false);
      });
  }
  if (!waiting) {
    if (!loadedCourseLinks) {
      setWaiting(true);
      LoadCourseLinks();
      setLoadedCourseLinks(true);
    } else if (loadedCourseLinks && !loadedActivities) {
      setWaiting(true);
      loadActivities();
      setLoadedActivities(true);
    } else if (loadedActivities && !loadedSubmissions) {
      setWaiting(true);
      loadSubmission();
      setLoadedSubmission(true);
    } else if (loadedSubmissions && !loadedGrades) {
      setWaiting(true);
      getFeedBack();
      setLoadedGrades(true);
    }
  }
  console.log(assignmentData);
  function getFeedBack() {
    firestore()
      .collection('AssignmentGrade')
      .where('SubmissionId', 'in', submissionId)
      .get()
      .then((value) => {
        let data = [
          {
            x: 0,
            y: 0,
          },
        ];
        for (var i = 0; i < value.docs.length; i++) {
          data[i] = {
            x: i,
            y: value.docs[i].get('Grade'),
          };
        }
        setAssignmentData(data);
        setWaiting(false);
      });
  }

  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        style={{
          data: {stroke: '#c43a31'},
          parent: {border: '1px solid #ccc'},
        }}
        data={assignmentData}
      />
    </VictoryChart>
  );
};

export default StatsScreen;
