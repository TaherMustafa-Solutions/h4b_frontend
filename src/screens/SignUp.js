import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Snackbar,
  TextInput,
  useTheme,
} from 'react-native-paper';
import client from '../client';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [origPhoto, setOrigPhoto] = useState(
    'https://res.cloudinary.com/dsxcazh94/image/upload/v1688945408/users/kyu8aezxo4hgsmdnqwbj.png',
  );
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  const success = '../assets/icons/checked.png';
  const failed = '../assets/icons/error.png';

  const theme = useTheme();
  const navigation = useNavigation();

  const handleChoosePhoto = async () => {
    await launchImageLibrary({noData: false}, response => {
      if (!response.didCancel) {
        if (response) {
          setPhoto(response);
        } else {
          setPhoto(null);
        }
      }
    });
  };

  const handleUploadPhoto = async () => {
    console.log(photo);
    const formData = new FormData();
    setUploading(true);

    formData.append('email', email);
    formData.append('photo', {
      name: photo.assets[0].fileName,
      type: photo.assets[0].type,
      uri:
        Platform.OS === 'ios'
          ? photo.assets[0].uri.replace('file://', '')
          : photo.assets[0].uri,
    });

    await fetch(`https://dotcomsolutions.biz/api/h4bProfile.php`, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(response => {
        // setPhoto(null);
        setUploaded(true);
        setUploading(false);
      })
      .catch(error => {
        console.log('error', error);
        setPhoto(null);
        setUploading(false);
      });
  };

  const handleCancelPhoto = () => {
    setPhoto(null);
  };

  const signUp = async () => {
    if (username !== '' && email !== '' && password !== '' && mobile !== '') {
      setLoading(true);
      try {
        const {data: res} = await client.post('signup', {
          name: username,
          phone_no: mobile.trim(),
          address: address.trim(),
          email: email.trim().toLowerCase(),
          password,
        });

        console.log(res);

        if (res.result === true) {
          <Snackbar
            visible={visible}
            onDismiss={() => {
              setVisible(false);
              setTimeout(() => {
                setError(false);
              }, 100);
            }}
            onIconPress={() => setVisible(false)}
            duration={3000}
            icon={() => (
              <Image
                source={error ? require(failed) : require(success)}
                style={{
                  width: 23,
                  height: 23,
                  marginBottom: 2,
                  marginRight: 10,
                }}
              />
            )}
            style={styles.snackbar(error)}>
            <Text style={{color: error ? '#880808' : '#006400'}}>
              Registered Successfully!
            </Text>
          </Snackbar>;
          setTimeout(() => {
            navigation.navigate('SignIn');
          }, 2000);
        } else {
          setErrorModal(true);
          setErrorTitle('Small Password!');
          setErrorMessage('Password should be at least 6 characters long!');
        }
      } catch (err) {
        setErrorModal(true);
        setErrorTitle('Email Taken!');
        setErrorMessage('This email is taken. Please enter another one!');
        console.log(err);
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
    <ScrollView style={{backgroundColor: theme.colors.secondary, flex: 1}}>
      <View style={styles.logo_container}>
        {photo ? (
          <>
            <Image source={{uri: photo.assets[0].uri}} style={styles.pic} />
            {!uploaded && (
              <TouchableOpacity
                onPress={handleUploadPhoto}
                disabled={uploading}
                style={
                  uploading
                    ? [
                        styles.uploadBtn,
                        styles.shadow,
                        {backgroundColor: 'gray'},
                      ]
                    : [styles.uploadBtn, styles.shadow]
                }>
                {uploading ? (
                  <Text style={[styles.uploadBtnText]}>
                    Uploading&nbsp;&nbsp;
                    <ActivityIndicator color={'white'} size={10} />
                  </Text>
                ) : (
                  <Text style={styles.uploadBtnText}>Upload Photo</Text>
                )}
              </TouchableOpacity>
            )}

            {!uploaded && (
              <TouchableOpacity
                onPress={handleCancelPhoto}
                disabled={uploading}
                style={
                  uploading
                    ? [
                        styles.cancelBtn,
                        styles.shadow,
                        {backgroundColor: 'gray'},
                      ]
                    : [styles.cancelBtn, styles.shadow]
                }>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <View style={styles.profile}>
            <TouchableOpacity
              onPress={() => {
                if (email !== '') {
                  handleChoosePhoto();
                } else {
                  setErrorModal(true);
                  setErrorTitle('Empty Email!');
                  setErrorMessage('Please enter email first!');
                }
              }}
              style={styles.chooseBtn}>
              <Image
                source={{
                  uri: `${origPhoto}?random=${Math.random()
                    .toString(36)
                    .substring(7)}`,
                }}
                style={styles.pic}
              />
            </TouchableOpacity>
            <Text style={styles.profileText}>Upload Photo</Text>
          </View>
        )}
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
          label="Name"
          placeholder="Name"
          value={username}
          textColor={theme.colors.primary}
          onChangeText={val => setUsername(val)}
          outlineStyle={[{borderRadius: 30, borderWidth: 2}]}
          style={styles.input(theme)}
        />
        <TextInput
          mode="outlined"
          label="Mobile"
          placeholder="Mobile"
          value={mobile}
          textColor={theme.colors.primary}
          onChangeText={val => setMobile(val)}
          outlineStyle={[{borderRadius: 30, borderWidth: 2}]}
          style={styles.input(theme)}
        />
        <TextInput
          mode="outlined"
          label="Address"
          placeholder="Address"
          multiline={true}
          numberOfLines={3}
          value={address}
          textColor={theme.colors.primary}
          onChangeText={val => setAddress(val)}
          outlineStyle={[{borderRadius: 30, borderWidth: 2}]}
          style={styles.input(theme)}
        />
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
          onPress={loading ? null : signUp}
          style={styles.button(theme)}
          labelStyle={styles.button_text(theme)}
          rippleColor={theme.colors.primary}
          contentStyle={{flexDirection: 'row-reverse'}}>
          {loading ? 'Validating' : 'Register'}
        </Button>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '15%',
        }}>
        <Text style={{color: '#43A047'}}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text
            style={{
              textDecorationLine: 'underline',
              color: '#2E7D32',
              fontWeight: 500,
            }}>
            {' '}
            SignIn
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
    width: 270,
    height: 270,
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

  profileContainer: {
    width: '92%',
    padding: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },

  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 5,
  },

  profileText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '800',
    width: '100%',
    fontSize: 18,
  },

  uploadBtn: {
    backgroundColor: '#FB8C00',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 5,
    borderRadius: 4,
    minWidth: '50%',
  },

  uploadBtnText: {
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 7,
  },

  cancelBtn: {
    backgroundColor: '#9F2B68',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 5,
    borderRadius: 4,
    minWidth: '50%',
  },

  cancelBtnText: {
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 7,
  },

  picContainer: {
    width: '30%',
    alignItems: 'center',
  },

  pic: {
    width: 130,
    height: 130,
    borderRadius: 65,
    // borderColor: 'black',
  },

  detailsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  formRow: {
    flexDirection: 'row',
  },

  submitButtonContainer: {
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitButton: (isValid, formSubmitted) => ({
    backgroundColor: !isValid || formSubmitted ? 'gray' : '#397fe2',
    minWidth: '25%',
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  }),

  submitText: {
    color: 'white',
    fontSize: 15,
  },

  submittingText: {
    color: 'white',
    fontSize: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBlock: {
    width: '50%',
    marginVertical: 5,
  },

  label: {
    paddingLeft: 5,
    fontWeight: 600,
    fontSize: 13,
    paddingBottom: 6,
  },

  chooseBtn: {
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 5,
    borderRadius: 4,
  },

  logout: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  logoutBtn: {
    width: 22,
    height: 22,
    opacity: 0.3,
  },

  workInfoContainer: {
    padding: 20,
    alignItems: 'center',
  },

  snackbar: error => ({
    margin: 0,
    padding: 0,
    borderRadius: 0,
    backgroundColor: error ? '#F88379' : '#a6f1a6',
  }),
});
