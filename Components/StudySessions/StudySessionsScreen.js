import {SafeAreaView, Text, View, Button, ScrollView, Modal} from 'react-native';
import * as React from 'react';


const StudySessionsScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>
          Study Sessions
        </Text>

        <ScrollView horizontal="true">
          {
            Topics.map((item, key) =>(
              <Text key={key}>{item}</Text>
            ))
          }
        </ScrollView>

        <ScrollView>
          {
            Sessions.map((item, key) => (
              <View>
                <Text>{item.StartDate}</Text>
                <Text>{item.EndDate}</Text>
                <Text>{item.Notification}</Text>
              </View>
            ))
          }
        </ScrollView>

        <Button title="Create">

        </Button>
        <Button title="Back">

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


export default StudySessionsScreen;

