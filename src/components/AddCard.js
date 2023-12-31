import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const AddCard = ({logo_uri, text, navigateText, rate}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, styles.shadow]}>
      <ImageBackground
        source={require('../assets/photos/cardBackground.jpg')}
        resizeMode="cover"
        borderRadius={10}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Add Form', {
              logo_uri,
              text,
              navigateText,
              rate,
            })
          }
          style={styles.buttonContainer}>
          <View style={{top: 0}}>
            <Image
              source={logo_uri}
              resizeMode="contain"
              style={{
                width: 80,
                height: 80,
              }}
            />
          </View>
          <Text style={styles.text}>{text}</Text>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: '#558B2F',
              ...styles.shadow,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/icons/addCategory.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: 'white',
              }}
            />
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },

  container: {
    width: '43%',
    height: 150,
    margin: 30,
    marginLeft: 20,
    marginRight: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#33691E',
    borderWidth: 1,
  },

  buttonContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    top: 25,
  },

  text: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
