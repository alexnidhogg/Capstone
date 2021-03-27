import {SafeAreaView, Text, View, Button, ScrollView, Modal, TextInput} from 'react-native';
import * as React from 'react';
import { Style } from './StudySessionsStyle'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {useState} from 'react';
import firestore from '@react-native-firebase/firestore'
import DatePicker from "react-native-date-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import auth from "@react-native-firebase/auth";

/*
let DropdownController = <DropDownPicker
  items = {
    courseList
  }
  onChangeItem={
    item => setCourse(item)
  }
  style={{width: '100%'}}
/>
 */

//let DropDownController = <DropDownPicker/>

const CreateStudySessionsScreen = ({navigation}) => {

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [description, setDescription] = useState("")
  const [course, setCourse] = useState("")
  const [courseList, updateCourseList] = useState([])

  function CreateStudySession() {
    firestore().collection('StudySession').add({
      ClassId: '/Course/' + course,
      EndDate: endDate,
      OrganizerID: auth().currentUser.uid,
      StartDate: startDate,
      Private: false
    })
  }

  firestore().collection('Course').get().then((values) => {
    let courses = values.docs
    let courseListNew = []
    //alert(courses.length)
    for(var x = 0; x < courses.length; x++){
      courseListNew[x] = {label: courses[x].get('CourseName'), value: courses[x].get('CourseName')}
    }
    updateCourseList(courseListNew)
    //DropDownController.controller.addItems(courseList)
    //alert(courseListNew)
  }).catch((error) => {

  })

  return (
    <View style={Style.TitleBlock}>
      <Text style={Style.Title}>
        Study Sessions
      </Text>
      <Text style={Style.NormalTextCentered}>
        Create Study Session
      </Text>
      <View style={Style.FormRow}>
        <Text style={Style.FormLabel}>Start Time</Text>
        <DatePicker
          date={startDate}
          onDateChange={setStartDate}
          style={{height: 100}}
        />
      </View>
      <View style={Style.FormRow}>
        <Text style={Style.FormLabel}>End Time</Text>
        <DatePicker
          date={endDate}
          onDateChange={setEndDate}
          style={{height: 100}}
        />
      </View>
      <View style={Style.FormRowColumn}>
        <Text style={Style.FormLabel}>Description</Text>
        <TextInput style={Style.BorderGrow} multiline={true}
          onChangeText={setDescription}
        />
      </View>
      <View style={Style.FormRow}>
        <Text style={Style.FormLabel}>Subject</Text>
        <View
          style={{width: '75%', height: 50}}
        >
          <DropDownPicker
            items = {
              courseList
            }
            onChangeItem={
              item => setCourse(item.value)
            }
            placeholder="Select a course"
            containerStyle={{width: '100%', height: 50}}
          />
        </View>
      </View>
      <View style={Style.Bottom}>
        <View style={Style.Buttons}>
          <Button
            title="Create"
            style={Style.Buttons}
            onPress={
              //() => navigation.navigate("CreateStudySession")
              () => CreateStudySession()
            }
          >
          </Button>

          <Button
            title="Back"
            style={Style.Buttons}
            onPress={() => navigation.goBack()}
          >
          </Button>
        </View>
      </View>
    </View>
  )
}



export default CreateStudySessionsScreen;
