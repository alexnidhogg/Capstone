import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import * as React from 'react';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as ToastAndroid from 'react-native';
import auth from '@react-native-firebase/auth';
import RNFS from 'react-native-fs';
import {firebase} from '@react-native-firebase/firestore';
import DocumentPicker from 'react-native-document-picker';
import {useState} from 'react';


//Commemt
const SignUpScreen = ({navigation}) => {
  const [user, onChangeText] = useState('');
  const [pass, passget] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [StudentNumber, setStudentNumber] = useState('');
  const [singleFile, setSingleFile] = useState('');

  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        readContent: true,
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      //Setting the state to show single file attributes
      const response = await fetch(res.uri);
      const blob = await response.blob();
      RNFS.readFile(res.uri, 'base64').then((re) => {
        setSingleFile(re);
      });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <View>
      <TextInput
        placeholder="First Name"
        onChangeText={(fn) => setFirstName(fn)}
        value={firstName}
      />
      <TextInput
        placeholder="Last Name"
        onChangeText={(ln) => setlastName(ln)}
        value={lastName}
      />
      <TextInput
        placeholder="Student Number"
        onChangeText={(num) => setStudentNumber(num)}
        value={StudentNumber}
      />
      <TextInput
        placeholder="Username"
        onChangeText={(user) => onChangeText(user)}
        value={user}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(passwrd) => passget(passwrd)}
        value={pass}
      />
      <Button title="Select Picture" onPress={() => selectOneFile()} />
      <Button
        style={styles.submit}
        title="Login"
        onPress={() => {
          console.log(user);
          auth()
            .createUserWithEmailAndPassword(user, pass)
            .then(() => {
              auth()
                .signInWithEmailAndPassword(user, pass)
                .then(() => {
                  firestore().collection('Users').add({
                    FirstName: firstName,
                    LastName: lastName,
                    StudentNumber: StudentNumber,
                    UserClass: 'Student',
                    UserId: auth().currentUser.uid,
                    profilePic: "data:image/jpeg;base64," + singleFile,
                  });
                });
              navigation.navigate('MainMenu');
            });
          return;
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  LoginView: {
    marginLeft: 40,
    marginTop: 100,
    width: wp('80%'),
    padding: 15,
  },
  submit: {
    color: 'darkslategrey',
  },
  signUp: {
    color: 'blue',
    textAlign: 'center',
    margin: 10,
    opacity: 75,
    textShadowRadius: 10,
  },
});

export default SignUpScreen;
