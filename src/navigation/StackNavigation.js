import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import SignIn from '../screens/SignIn';

import BottomTabNavigation from './BottomTabNavigation';
// import {useSelector} from 'react-redux';
import Add from '../screens/Add';
import Articles from '../screens/Articles';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  //   const user = useSelector(state => state.works.user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: '#f8f8f8'},
        }}
        // initialRouteName={user ? 'BottomTabs' : 'SignIn'}
        initialRouteName={'BottomTabs'}>
        {/* <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Add Work" component={AddWork} />
        <Stack.Screen name="Add Payment Link" component={AddPaymentLink} />
        <Stack.Screen name="Add Client" component={AddClient} />
        <Stack.Screen name="Add Category" component={AddCategory} /> */}
        {/* <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Client Works" component={ClientWorks} /> */}
        {/* <Stack.Screen name="Add" component={Add} /> */}
        <Stack.Screen name="BottomTabs" component={BottomTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
