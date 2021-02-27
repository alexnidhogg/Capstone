import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as React from 'react';
import {ScrollView} from 'react-native-gesture-handler';


const GradeScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.SessionBlock}>
        <Text>Returned Assignments</Text>
        <ScrollView horizontal="true">
          {Assignments.map((item, key) => (
            <View style={styles.Assignments} key={key}>
              <Text style={styles.nameTxt}>{item.Name}</Text>
              <View>
                <Text style={styles.Details}>{item.Assigned}</Text>
                <Text style={styles.Details}>Grade Recvieved: {item.Grade}</Text>
                <Text style={styles.Details}>{item.Feedback}</Text>
              </View>
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
//
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
    textAlign: 'right'
  },
  Assignments: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#9999aa"
  },
  Details: {
    padding: 5,
    marginLeft: "auto",
    alignSelf: "stretch",
    textAlign: "right"
  }
});
export default GradeScreen;
