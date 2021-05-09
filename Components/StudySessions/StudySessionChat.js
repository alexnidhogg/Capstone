import { Component, useState, ReactNode } from "react";
import { View, TextInput, Button, Text } from "react-native"
import model from "./Model/StudySessionChatModel";
import * as React from 'react';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const StudySessionChat = ({route, navigation}) => {

  const { sessionId } = route.params

  const [Refresh, triggerRefresh] = useState(0)

  const [Model, updateModel] = useState(new model(sessionId))

  const [Message, UpdateMessage] = useState("")

  const [MessageDisplay, SetMessageDisplay] = useState([])

  const increment = firestore.FieldValue.increment(1)

  Model.setRefresh(Messages)
  Model.Load(Refresh)

  firestore().collection('StudySession').doc(sessionId).collection('Chat').doc('Index').onSnapshot(
    Model.ReLoad, Error
  )

  function Error(errorInfo){
    console.log(errorInfo)
  }

  function SendMessage() {
    firestore().collection('StudySession').doc(sessionId).collection('Chat').add(
      {
        UserId: auth().currentUser.uid,
        PostDate: new Date(),
        Message: Message,
        type: "Message"
      }
    ).then(
      value => {
        firestore().collection('StudySession').doc(sessionId).collection('Chat').doc('Index').update(
          {
            lastSpeaker: auth().currentUser.uid,
            messageCount: increment
          }
        ).then(
          value => {
            Model.ReLoad()
          }
        )
      }
    )
    UpdateMessage("")
    console.log("Send Message")
    console.log(Message)
  }

  function GoBack() {
    navigation.goBack()
  }

  function Messages() {
    if(Model.messageCount < 1){
      SetMessageDisplay([])
    }
    else
    {
      let returnVal = []
      for(let i = 0; i < Model.messageCount; i++)
      {
        returnVal.push(<Text>
          {Model.GetUser(Model.messages[i].Speaker) + ": " + Model.messages[i].Message}
        </Text>)
      }
      console.log('Messages are:')
      console.log(returnVal)
      SetMessageDisplay(returnVal)
    }
  }

  console.log(Model)

  return (
    <View>
      <View>
        <TextInput onChangeText={UpdateMessage} value={Message}>

        </TextInput>
        <Button title={'Send'} onPress={SendMessage}>

        </Button>
        <Button title={'Back'} onPress={GoBack}>

        </Button>
      </View>
      <View>
        {
          MessageDisplay
        }
      </View>
    </View>
  )
}

export default StudySessionChat;
