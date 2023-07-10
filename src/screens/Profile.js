import {
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Dialog, Portal, TextInput, useTheme} from 'react-native-paper';
import {persistor} from '../store';
import ProfileInfo from '../components/ProfileInfo';
import client from '../client';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [aluminum, setAluminum] = useState('');
  const [newspaper, setNewspaper] = useState('');
  const [magazine, setMagazine] = useState('');
  const [cardboard, setCardboard] = useState('');
  const [book, setBook] = useState('');
  const [plastic, setPlastic] = useState('');
  const [iron, setIron] = useState('');
  const [paper, setPaper] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imgUri, setImgUri] = useState(
    'https://res.cloudinary.com/dsxcazh94/image/upload/v1688945408/users/kyu8aezxo4hgsmdnqwbj.png',
  );

  const userID = useSelector(state => state.user.id);
  const theme = useTheme();
  const navigation = useNavigation();

  const al = require('../assets/icons/aluminum.png');
  const bk = require('../assets/icons/book.png');
  const cb = require('../assets/icons/cardboard.png');
  const fe = require('../assets/icons/iron.png');
  const mz = require('../assets/icons/magazine.png');
  const np = require('../assets/icons/newspaper.png');
  const pp = require('../assets/icons/paper.png');
  const ps = require('../assets/icons/plastic.png');

  async function getUser() {
    try {
      const {data: res} = await client.get(`user/${userID}`);

      if (res.result === true) {
        setName(res.data.name);
        setEmail(res.data.email);
        setMobile(res.data.phone_no);
        setAddress(res.data.address);

        setAluminum(res.data.aluminum);
        setNewspaper(res.data.newspaper);
        setMagazine(res.data.magazine);
        setCardboard(res.data.cardboard);
        setBook(res.data.book);
        setPaper(res.data.paper);
        setIron(res.data.iron);
        setPlastic(res.data.plastic);
      } else {
        setErrorModal(true);
        setErrorTitle('Error!');
        setErrorMessage('Some error occurred. Please try again later :/');
      }
    } catch (err) {
      setErrorModal(true);
      setErrorTitle('Error!');
      setErrorMessage('Some error occurred. Please try again later :/');
      console.log(err);
    }
  }

  async function getUserImg() {
    try {
      const {data: res} = await client.get(
        `https://dotcomsolutions.biz/api/getH4bProfile.php`,
        {params: {email}},
      );

      console.log(res);

      setImgUri(res);
    } catch (err) {
      setImgUri(
        'https://res.cloudinary.com/dsxcazh94/image/upload/v1688945408/users/kyu8aezxo4hgsmdnqwbj.png',
      );

      console.log(err);
    }
  }

  const logout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'No'},
        {
          text: 'Yes',
          onPress: () => {
            // AsyncStorage.clear();
            persistor.purge();
            navigation.reset({
              index: 0,
              routes: [{name: 'SignUp'}],
            });
          },
        },
      ],
      {cancelable: true},
    );
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getUserImg();
  }, [email]);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.secondary}}>
      <ScrollView style={styles.container(theme)}>
        <View style={[styles.profileContainer, styles.shadow]}>
          <TouchableOpacity onPress={logout} style={styles.logout}>
            <Image
              source={require('../assets/icons/logout.png')}
              style={styles.logoutBtn}
            />
          </TouchableOpacity>

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

          <View style={styles.picContainer}>
            <View style={styles.profile}>
              <TouchableOpacity style={styles.chooseBtn}>
                <Image
                  source={{
                    uri: imgUri,
                  }}
                  style={styles.pic}
                />
              </TouchableOpacity>
              <Text style={styles.profileText}>{name}</Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.form}>
              <View style={styles.formRow}>
                <View style={styles.inputBlock}>
                  <TextInput
                    editable={false}
                    value={mobile}
                    mode="outlined"
                    label="Mobile"
                    placeholder="Mobile"
                    onChangeText={val => setUsername(val)}
                    textColor={theme.colors.primary}
                    outlineStyle={[{borderRadius: 25}]}
                    style={{paddingLeft: 5, marginHorizontal: 5}}
                  />
                </View>

                <View style={styles.inputBlock}>
                  <TextInput
                    editable={false}
                    value={email}
                    mode="outlined"
                    label="Email"
                    placeholder="Email"
                    textColor={theme.colors.primary}
                    outlineStyle={[{borderRadius: 25}]}
                    style={{paddingLeft: 5, marginHorizontal: 5}}
                  />
                </View>
              </View>

              <View style={styles.inputCustomBlock}>
                <TextInput
                  editable={false}
                  value={address}
                  mode="outlined"
                  label="Address"
                  placeholder="Address"
                  textColor={theme.colors.primary}
                  outlineStyle={[{borderRadius: 25}]}
                  style={{paddingLeft: 5, marginHorizontal: 5}}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.workInfoContainer}>
          <View style={styles.formRow}>
            <ProfileInfo
              icon={al}
              color={'#0047AB'}
              number={aluminum}
              text={'Aluminum'}
            />
            <ProfileInfo
              icon={bk}
              color={'#E49B0F'}
              number={book}
              text={'Books'}
            />
          </View>

          <View style={styles.formRow}>
            <ProfileInfo
              icon={cb}
              color={'#F28C28'}
              number={cardboard}
              text={'Cardboard'}
            />
            <ProfileInfo
              icon={fe}
              color={'#6082B6'}
              number={iron}
              text={'Iron'}
            />
          </View>

          <View style={styles.formRow}>
            <ProfileInfo
              icon={mz}
              color={'#C2B280'}
              number={magazine}
              text={'Magazines'}
            />
            <ProfileInfo
              icon={np}
              color={'#40E0D0'}
              number={newspaper}
              text={'Newspapers'}
            />
          </View>

          <View style={styles.formRow}>
            <ProfileInfo
              icon={pp}
              color={'#C2B280'}
              number={paper}
              text={'Papers'}
            />
            <ProfileInfo
              icon={ps}
              color={'#40E0D0'}
              number={plastic}
              text={'Plastic'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.secondary,
    marginBottom: '30%',
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
    minWidth: '88%',
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
    minWidth: '88%',
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
    // borderWidth: StyleSheet.hairlineWidth,
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

  inputCustomBlock: {
    minWidth: 200,
    marginVertical: 5,
  },

  label: {
    paddingLeft: 5,
    fontWeight: '600',
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
    fontWeight: '700',
    fontSize: 15,
  }),
});
