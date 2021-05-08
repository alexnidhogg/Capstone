import firestore from '@react-native-firebase/firestore'

class model {

  messages;
  senders;
  studySessionId;

  callback;

  messageCount;
  lastSpeaker;

  initialized;

  constructor(studySessionId, callback) {

    this.messages = []
    this.senders = {}
    this.studySessionId = studySessionId

    this.callback = callback

    this.initialized = false;

  }

  setRefresh(func) {
    this.callback = func
  }

  ReLoad(){
    this.initialized = false;
    if(this.callback != undefined)
    {
      this.callback()
    }
  }

  GetUser(UserId){
    if(this.senders[UserId] == undefined){
      this.senders[UserId] = 'Loading...'
      firestore().collection('Users').where('UserId', '==', UserId).get().then(
        value => {
          console.log(value)
          this.senders[UserId] = value.docs[0].get('FirstName') + " " + value.docs[0].get('LastName')
        }
      )
      return this.senders[UserId]
    }
    else
    {
      return this.senders[UserId]
    }

  }

  Load(){
    if(this.initialized == false) {
      firestore().collection('StudySession').doc(this.studySessionId).collection('Chat').doc('Index').get().then(
        value => {

          this.messageCount = value.get('messageCount')
          this.lastSpeaker = value.get('lastSpeaker')
          //firestore().collection('StudySession').doc(this.studySessionId).collection('Chat').where('type','==','Message').orderBy('Time','desc').get().then(
          firestore().collection('StudySession').doc(this.studySessionId).collection('Chat').orderBy('PostDate','desc').get().then(
            values => {
              console.log(values.docs)
              this.messages = []
              if(values.docs.length > 0){
                for(let i = 0; i < values.docs.length; i++)
                {
                  if(values.docs[i].get('type') != 'Index'){
                    this.messages.push(
                      {
                        Speaker: values.docs[i].get('UserId'),
                        Message: values.docs[i].get('Message')
                      }
                    )
                  }
                this.messageCount = values.docs.length - 1
                }
                console.log(this.messages)
              }
              this.callback()
            }
          )
        }
      )
    }
    this.initialized = true;
  }
}

export default model;
