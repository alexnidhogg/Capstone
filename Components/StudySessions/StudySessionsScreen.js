import {SafeAreaView, Text, View, Button, ScrollView, Modal} from 'react-native';
import * as React from 'react';
import { Style } from './StudySessionsStyle'


const StudySessionsScreen = () => {
  return (
    <SafeAreaView>
      <View style={Style.TitleBlock}>

        <Text style={Style.Title}>
          Study Sessions
        </Text>

        <ScrollView style={Style.Classes} horizontal={true}>
          {
            Topics.map((item, key) =>(
              <View key={key} style={Style.Class}>
                <Text>{item}</Text>
              </View>
            ))
          }
        </ScrollView>
      </View>

      <View style={Style.SessionBlock}>
        <ScrollView>
          {
            Sessions.map((item, key) => (
              <View style={Style.Session} key={key}>
                <Text style={Style.SessionLeft}>{item.StartDate}</Text>
                <Text style={Style.SessionLeft}> - </Text>
                <Text style={Style.SessionLeft}>{item.EndDate}</Text>
                <Text style={Style.SessionRight}>{item.Notification}</Text>
              </View>
            ))
          }
        </ScrollView>
      </View>
      <View style={Style.ButtonBlock}>

        <Button title="Create" style={Style.Buttons}>

        </Button>

        <Button title="Back" style={Style.Buttons}>

        </Button>

      </View>
    </SafeAreaView>
  );
};

let Topics = [];
Topics[Topics.length] = "Math";
Topics[Topics.length] = "English";
Topics[Topics.length] = "Science";
Topics[Topics.length] = "Gym";

class StudySession {
  constructor(StartDate, EndDate, Topic, Notification){
    this.StartDate = StartDate;
    this.EndDate = EndDate;
    this.Topic = Topic;
    this.Notification = Notification;
  }
}

let Sessions = [];
Sessions[Sessions.length] = new StudySession("5:00 pm", "7:00 pm April 12", "Math", "");
Sessions[Sessions.length] = new StudySession("2:00 pm", "6:00 pm April 15", "Math", "Conflict!");
Sessions[Sessions.length] = new StudySession("9:00 am", "12:00 pm April 17", "Math", "Teacher Hosted");
Sessions[Sessions.length] = new StudySession("5:00 pm", "7:00 pm April 12", "Math", "");
Sessions[Sessions.length] = new StudySession("2:00 pm", "6:00 pm April 15", "Math", "Conflict!");
Sessions[Sessions.length] = new StudySession("9:00 am", "12:00 pm April 17", "Math", "Teacher Hosted");
Sessions[Sessions.length] = new StudySession("5:00 pm", "7:00 pm April 12", "Math", "");
Sessions[Sessions.length] = new StudySession("2:00 pm", "6:00 pm April 15", "Math", "Conflict!");
Sessions[Sessions.length] = new StudySession("9:00 am", "12:00 pm April 17", "Math", "Teacher Hosted");
Sessions[Sessions.length] = new StudySession("5:00 pm", "7:00 pm April 12", "Math", "");
Sessions[Sessions.length] = new StudySession("2:00 pm", "6:00 pm April 15", "Math", "Conflict!");
Sessions[Sessions.length] = new StudySession("9:00 am", "12:00 pm April 17", "Math", "Teacher Hosted");
Sessions[Sessions.length] = new StudySession("5:00 pm", "7:00 pm April 12", "Math", "");
Sessions[Sessions.length] = new StudySession("2:00 pm", "6:00 pm April 15", "Math", "Conflict!");
Sessions[Sessions.length] = new StudySession("9:00 am", "12:00 pm April 17", "Math", "Teacher Hosted");
Sessions[Sessions.length] = new StudySession("5:00 pm", "7:00 pm April 12", "Math", "");
Sessions[Sessions.length] = new StudySession("2:00 pm", "6:00 pm April 15", "Math", "Conflict!");
Sessions[Sessions.length] = new StudySession("9:00 am", "12:00 pm April 17", "Math", "Teacher Hosted");
Sessions[Sessions.length] = new StudySession("5:00 pm", "7:00 pm April 12", "Math", "");
Sessions[Sessions.length] = new StudySession("2:00 pm", "6:00 pm April 15", "Math", "Conflict!");
Sessions[Sessions.length] = new StudySession("9:00 am", "12:00 pm April 17", "Math", "Teacher Hosted");



export default StudySessionsScreen;

