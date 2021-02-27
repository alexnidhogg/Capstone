import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const GradeScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Returned Assignments</Text>
        <ScrollView horizontal="true">
          {Assignments.map((item, key) => (
            <View>
              <Text style={styles.nameTxt}>{item.Name}</Text>
              <Text>{item.Assigned}</Text>
              <Text>Grade Recvieved: {item.Grade}</Text>
              <Text>{item.Feedback}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

class Assignment {
  constructor(Name,Assigned, Grade, Feedback) {
    this.Assigned = Assigned;
    this.Grade = Grade;
    this.Feedback = Feedback;
    this.Name = Name;
  }
}

let Assignments = [];
Assignments[Assignments.length] = new Assignment(
  'Assignment1',
  'Febuary 13th',
  '86%',
  'Missing Some comments units?',
);
Assignments[Assignments.length] = new Assignment(
  'Lab 1',
  'Febuary 16th',
  '65%',
  'Missing Some comments units?',
);
Assignments[Assignments.length] = new Assignment(
  'Lab 2 Electric Boogaloo',
  'Febuary 20th',
  '0%',
  'No Submission???',
);
Assignments[Assignments.length] = new Assignment(
  'Midterm Exam',
  'Febuary 25th',
  '86%',
  'Good Work!',
);

const styles = StyleSheet.create({
  nameTxt: {
    fontSize: 24,
  }


});
export default GradeScreen;
