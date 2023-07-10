import React, {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Dialog, Portal, TextInput, useTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {setAdmin, setID} from '../store/userSlice';
import client from '../client';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const signIn = async () => {
    if (email !== '' && password !== '') {
      setLoading(true);
      try {
        const {data: res} = await client.post('login', {
          email: email.trim().toLowerCase(),
          password,
        });

        console.log(res.role);

        if (res.result === true) {
          dispatch(setID(res.id));

          if (res.role === 'Admin') {
            dispatch(setAdmin('Admin'));
            navigation.navigate('Orders');
          } else {
            navigation.reset({
              index: 0,
              routes: [{name: 'BottomTabs'}],
            });
          }
        } else {
          if (res.message == 'not_found') {
            setErrorModal(true);
            setErrorTitle('Not Found!');
            setErrorMessage('User does not exist. Please register first!');
          } else if (res.message == 'wrong_password') {
            setErrorModal(true);
            setErrorTitle('Wrong Password!');
            setErrorMessage('Please check your password and try again!');
          } else {
            setErrorModal(true);
            setErrorTitle('Error!');
            setErrorMessage('Some error occurred. Please try again later :/');
          }
        }
      } catch (err) {
        setErrorModal(true);
        setErrorTitle('Error!');
        setErrorMessage('Some error occurred. Please try again later :/');
      } finally {
        setLoading(false);
      }
    } else {
      setErrorModal(true);
      setErrorTitle('Empty Fields!');
      setErrorMessage('Please fill out all the fields!');
    }
  };

  return (
    <View style={styles.container(theme)}>
      <View style={styles.logo_container}>
        <Image
          source={require('../assets/logos/logo.png')}
          style={styles.logo}
        />
      </View>

      {errorModal && (
        <Portal>
          <Dialog
            visible={true}
            onDismiss={() => {
              setErrorModal(false);
            }}
            style={{backgroundColor: '#388E3C'}}>
            <Dialog.Icon icon="alert" size={30} />
            <Dialog.Title style={styles.title(theme)}>
              {errorTitle}
            </Dialog.Title>
            <Dialog.Content>
              <Text
                variant="bodyMedium"
                style={{color: theme.colors.secondary}}>
                {errorMessage}
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Pressable
                onPress={() => setErrorModal(false)}
                style={styles.modal_btn}>
                <Text style={styles.modal_text(theme)}>OK</Text>
              </Pressable>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}

      <View style={styles.input_container}>
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Email"
          value={email}
          textColor={theme.colors.primary}
          onChangeText={val => setEmail(val)}
          outlineStyle={[{borderRadius: 30, borderWidth: 2}]}
          style={styles.input(theme)}
        />
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Password"
          secureTextEntry
          textColor={theme.colors.primary}
          value={password}
          onChangeText={val => setPassword(val)}
          outlineStyle={[{borderRadius: 30, borderWidth: 2}]}
          style={styles.input(theme)}
        />

        <Button
          mode="outlined"
          loading={loading}
          onPress={loading ? null : signIn}
          style={styles.button(theme)}
          labelStyle={styles.button_text(theme)}
          rippleColor={theme.colors.primary}
          contentStyle={{flexDirection: 'row-reverse'}}>
          {loading ? 'Validating' : 'Login'}
        </Button>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
  }),
  logo_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  input_container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  input: theme => ({
    margin: 10,
    paddingLeft: 10,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
  }),

  button: theme => ({
    borderRadius: 30,
    textAlign: 'center',
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 5,
    borderWidth: 2,
    alignSelf: 'center',
    borderColor: theme.colors.primary,
  }),

  title: theme => ({
    textAlign: 'center',
    color: theme.colors.secondary,
  }),

  button_text: theme => ({
    color: theme.colors.primary,
    fontSize: 18,
  }),

  modal_btn: {
    marginRight: 10,
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },

  modal_text: theme => ({
    color: theme.colors.secondary,
    fontWeight: 700,
    fontSize: 15,
  }),
});
