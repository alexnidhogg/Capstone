import {SafeAreaView, Text, View, Button, ScrollView, Modal, TextInput} from 'react-native';
import * as React from 'react';
import { Style } from './StudySessionsStyle'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Firebase from '@react-native-firebase/app'

const CreateStudySessionsScreen = ({navigation}) => {
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
        <TextInput style={Style.LabelBorder}/>
      </View>
      <View style={Style.FormRow}>
        <Text style={Style.FormLabel}>End Time</Text>
        <TextInput style={Style.LabelBorder}/>
      </View>
      <View style={Style.FormRowColumn}>
        <Text style={Style.FormLabel}>Description</Text>
        <TextInput style={Style.BorderGrow} multiline={true}/>
      </View>
      <View style={Style.FormRow}>
        <Text style={Style.FormLabel}>Subject</Text>
        <TextInput style={Style.LabelBorder}/>
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

function CreateStudySession() {
  const Connection = Firebase.ReactNativeFirebase;

}

export default CreateStudySessionsScreen;
