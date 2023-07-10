import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import SignIn from '../screens/SignIn';

import BottomTabNavigation from './BottomTabNavigation';
import {useSelector} from 'react-redux';
import Add from '../screens/Add';
import Articles from '../screens/Articles';
import SignIn from '../screens/SignIn';
import AddForm from '../screens/AddForm';
import SignUp from '../screens/SignUp';
import Orders from '../screens/Orders';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const userID = useSelector(state => state.user.id);
  const role = useSelector(state => state.user.role);
  console.log(role);
  console.log(role);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: '#f8f8f8'},
        }}
        initialRouteName={
          userID ? (role === 'Admin' ? 'Orders' : 'BottomTabs') : 'SignUp'
        }>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Add Form" component={AddForm} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="BottomTabs" component={BottomTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
