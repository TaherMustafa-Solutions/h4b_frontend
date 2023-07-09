import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AddCard from '../components/AddCard';
import {useTheme} from 'react-native-paper';

const Add = () => {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container(theme)}>
      <View style={styles.block}>
        <AddCard
          logo_uri={require('../assets/icons/add_client_logo_1.png')}
          text={'Books'}
          navigateText={'Books'}
        />
        <AddCard
          logo_uri={require('../assets/icons/add_client_logo_1.png')}
          text={'Books'}
          navigateText={'Books'}
        />
      </View>
      <View style={styles.block}>
        <AddCard
          logo_uri={require('../assets/icons/add_client_logo_1.png')}
          text={'Books'}
          navigateText={'Books'}
        />
        <AddCard
          logo_uri={require('../assets/icons/add_client_logo_1.png')}
          text={'Books'}
          navigateText={'Books'}
        />
      </View>
      <View style={styles.block}>
        <AddCard
          logo_uri={require('../assets/icons/add_client_logo_1.png')}
          text={'Books'}
          navigateText={'Books'}
        />
        <AddCard
          logo_uri={require('../assets/icons/add_client_logo_1.png')}
          text={'Books'}
          navigateText={'Books'}
        />
      </View>
      <View style={styles.block}>
        <AddCard
          logo_uri={require('../assets/icons/add_client_logo_1.png')}
          text={'Books'}
          navigateText={'Books'}
        />
        <AddCard
          logo_uri={require('../assets/icons/add_client_logo_1.png')}
          text={'Books'}
          navigateText={'Books'}
        />
      </View>
      <View style={styles.block}>
        <AddCard
          logo_uri={require('../assets/icons/add_client_logo_1.png')}
          text={'Books'}
          navigateText={'Books'}
        />
        <AddCard
          logo_uri={require('../assets/icons/add_client_logo_1.png')}
          text={'Books'}
          navigateText={'Books'}
        />
      </View>
      <View style={styles.block}>
        <AddCard
          logo_uri={require('../assets/icons/add_client_logo_1.png')}
          text={'Books'}
          navigateText={'Books'}
        />
        <AddCard
          logo_uri={require('../assets/icons/add_client_logo_1.png')}
          text={'Books'}
          navigateText={'Books'}
        />
      </View>
    </ScrollView>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: theme => ({
    height: '100%',
    backgroundColor: theme.colors.secondary,
  }),

  block: {
    flexDirection: 'row',
  },
});
