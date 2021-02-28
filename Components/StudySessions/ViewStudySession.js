import {SafeAreaView, Text, View, Button, ScrollView, Modal} from 'react-native';
import * as React from 'react';
import { Style } from './StudySessionsStyle'

const StudySessionsScreen = ({navigation}) => {
  return (
    <View style={Style.TitleBlock}>
      <Text style={Style.Title}>
        {Topic} session at {StartTime.time} to {EndTime.time} on {StartTime.date}.
      </Text>
      <Text style={Style.NormalText}>
        Organized By: {Organizer.name}
      </Text>
      <ScrollView style={Style.Description}>
        <Text style={Style.NormalText}>
          {Description}
        </Text>
      </ScrollView>
      <Text style={Style.NormalText}>
        Current Attendees
      </Text>
      <ScrollView style={Style.DescriptionWithBorder}>
        {
          Attendees.map((item, key) => (
            <Text key={key} style={Style.SessionLeft}>{item.name}</Text>
          ))
        }
      </ScrollView>
      <View style={Style.Bottom}>
        <View style={Style.Buttons}>
          <Button title="Join" style={Style.Buttons}>

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

class DateTime {
  constructor(date, time){
    this.date = date;
    this.time = time;
  }
}
class User {
  constructor(name){
    this.name = name;
  }
}

let Topic = "Math";
let StartTime = new DateTime("April 2", "2:00 pm");
let EndTime = new DateTime("April 2", "4:00 pm");
var Description = "We're going to be going over the material for the unit 2 test. Everything from Chapters 2-5 will be covered. "
let Attendees = [];
Attendees[Attendees.length] = new User("John Smith");
Attendees[Attendees.length] = new User("Will Bo");
Attendees[Attendees.length] = new User("Marshall Mathers");
Attendees[Attendees.length] = new User("Slim Shady");
for(var i = 1; i<5; i++){
  Description = Description + Description
  Attendees[Attendees.length] = new User("John Smith");
  Attendees[Attendees.length] = new User("Will Bo");
  Attendees[Attendees.length] = new User("Marshall Mathers");
  Attendees[Attendees.length] = new User("Slim Shady");
}

let Organizer = new User("Jimbo Baggins");

export default StudySessionsScreen;
