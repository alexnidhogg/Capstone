import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import * as React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as ToastAndroid from 'react-native';
import {useState} from 'react/cjs/react.production.min';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [user, onChangeText] = React.useState('');
  const [pass, passget] = React.useState('');
  return (
    <ImageBackground source={require('./back1.png')} style={styles.LoginView}>
      <View style={styles.titleCont}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.titleText}>Study Buddy</Text>
          <Text styles={{flex: 1}} />
        </View>
      </View>
      <Image source={require('./user.png')} style={styles.userImg} />
      <TextInput
        placeholder="UserName"
        onChangeText={(text) => onChangeText(text)}
        value={user}
        style={styles.userField}
        placeholderTextColor="#FFF"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(passwrd) => passget(passwrd)}
        value={pass}
        style={styles.userField}
        placeholderTextColor="#FFF"
      />
      <TouchableOpacity
        style={styles.submit}
        title="Login"
        onPress={() => {
          console.log(user);
          auth()
            .signInWithEmailAndPassword(user, pass)
            .then(() => {
              navigation.navigate('MainMenu');
            });

          return;
        }}>
        <Text style={styles.buttonLogText}>Login</Text>
      </TouchableOpacity>

      <Text
        style={styles.signUp}
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        {'Sign Up'}
      </Text>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  LoginView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'right',
    flex: 1,
    fontSize: 30,
    marginRight: 30,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'MMA Champ',
    textShadowRadius: 10,
    textShadowColor: 'black',
  },
  submit: {
    marginTop: 20,
    borderColor: '#FFF',
    borderRadius: 30,
    borderWidth: 2,
    paddingHorizontal: 50,
    paddingVertical: 7,
  },
  signUp: {
    color: '#FFF',
    textAlign: 'center',
    margin: 10,
    opacity: 75,
    textShadowRadius: 10,
  },
  userImg: {
    marginTop: 50,
    width: 150,
    height: 150,
  },
  userField: {
    marginTop: 20,
    width: '60%',
    color: '#FFF',
  },
  buttonLogText: {
    color: '#FFF',
  },
  titleCont: {
    width: 400,
    height: 50,
  },
});
export default LoginScreen;
