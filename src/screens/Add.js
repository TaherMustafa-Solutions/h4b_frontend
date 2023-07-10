import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AddCard from '../components/AddCard';
import {useTheme} from 'react-native-paper';

const Add = () => {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container(theme)}>
      <View style={{marginBottom: '30%'}}>
        <View style={styles.block}>
          <AddCard
            logo_uri={require('../assets/icons/newspaper.png')}
            text={'Newspaper'}
            navigateText={'newspaper'}
            rate={'14'}
          />
          <AddCard
            logo_uri={require('../assets/icons/book.png')}
            text={'Books'}
            navigateText={'book'}
            rate={'12'}
          />
        </View>
        <View style={styles.block}>
          <AddCard
            logo_uri={require('../assets/icons/plastic.png')}
            text={'Plastic'}
            navigateText={'plastic'}
            rate={'10'}
          />
          <AddCard
            logo_uri={require('../assets/icons/cardboard.png')}
            text={'Cardboard'}
            navigateText={'cardboard'}
            rate={'5'}
          />
        </View>
        <View style={styles.block}>
          <AddCard
            logo_uri={require('../assets/icons/magazine.png')}
            text={'Magazines'}
            navigateText={'magazine'}
            rate={'15'}
          />
          <AddCard
            logo_uri={require('../assets/icons/aluminum.png')}
            text={'Aluminum'}
            navigateText={'aluminum'}
            rate={'105'}
          />
        </View>
        <View style={styles.block}>
          <AddCard
            logo_uri={require('../assets/icons/iron.png')}
            text={'iron'}
            navigateText={'iron'}
            rate={'26'}
          />
          <AddCard
            logo_uri={require('../assets/icons/paper.png')}
            text={'Paper'}
            navigateText={'paper'}
            rate={'15'}
          />
        </View>
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
