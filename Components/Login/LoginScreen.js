import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import * as React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as ToastAndroid from 'react-native';
import {useState} from 'react/cjs/react.production.min';
import auth from '@react-native-firebase/auth';
//
const LoginScreen = ({navigation}) => {
  const [user, onChangeText] = React.useState('');
  const [pass, passget] = React.useState('');
  return (
    <SafeAreaView>
      <View style={styles.LoginView}>
        <TextInput
          placeholder="UserName"
          onChangeText={(text) => onChangeText(text)}
          value={user}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(passwrd) => passget(passwrd)}
          value={pass}
        />
        <Button
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
          }}
        />
      </View>
    </SafeAreaView>
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
});
export default LoginScreen;
