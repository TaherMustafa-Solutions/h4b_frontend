import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Works from '../screens/Works';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Add from '../screens/Add';
// import client from '../client';
import {useEffect, useState} from 'react';
import Leaderboard from '../screens/Leaderboard';
import Articles from '../screens/Articles';
import Profile from '../screens/Profile';
import Feedback from '../screens/Feedback';
// import {useSelector} from 'react-redux';

// const dotIcon = require('../assets/3dots.png');

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -30,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#388E3C',
        ...styles.shadow,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

export default function BottomTabNavigation() {
  const [photo, setPhoto] = useState(null);

  //   const logUser = useSelector(state => state.works.user.username);

  const getProfilePic = async () => {
    try {
      const {data: res, status} = await client.get('retrieveProfilePic.php', {
        params: {log_user: logUser},
      });

      if (status === 200) {
        var uri = res.data[0].Uri;

        if (
          uri === 'https://dotcomsolutions.biz/api/uploads/team/placeholder.jpg'
        ) {
          setPhoto(null);
        } else {
          setPhoto(uri);
        }
      } else {
        setPhoto(null);
      }
    } catch (err) {
      console.log(err);
      setPhoto(null);
      Alert.alert('Error', 'There were some error in fetching data :/');
    }
  };

  //   useEffect(() => {
  //     getProfilePic();
  //   }, []);

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#E8F5E9',
          borderRadius: 15,
          height: '10.5%',
          ...styles.shadow,
        },
      }}
      initialRouteName="Add">
      <Tab.Screen
        name="Articles"
        component={Articles}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/icons/articles.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#388E3C' : 'black',
                }}
              />
              <Text
                style={{
                  fontWeight: focused ? 700 : 400,
                  color: focused ? '#388E3C' : 'black',
                  fontSize: 13,
                }}>
                Articles
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/icons/leaderboard.png')}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
                  tintColor: focused ? '#388E3C' : 'black',
                }}
              />
              <Text
                style={{
                  fontWeight: focused ? 700 : 400,
                  color: focused ? '#388E3C' : 'black',
                  fontSize: 13,
                }}>
                Leader
              </Text>
              <Text
                style={{
                  fontWeight: focused ? 700 : 400,
                  color: focused ? '#388E3C' : 'black',
                  fontSize: 13,
                }}>
                Board
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/icons/recycle.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: 'white',
              }}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Feedback"
        component={Feedback}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/icons/feedback_2.png')}
                resizeMode="contain"
                style={{
                  width: 32,
                  height: 32,
                  tintColor: focused ? '#388E3C' : 'black',
                }}
              />

              <Text
                style={{
                  fontWeight: focused ? 700 : 400,
                  color: focused ? '#388E3C' : 'black',
                  fontSize: 13,
                }}>
                Feedback
              </Text>
            </View>
          ),
          tabBarActiveBackgroundColor: () => <Image source={dotIcon} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/icons/profile.png')}
                resizeMode="contain"
                style={{
                  width: 32,
                  height: 32,
                  tintColor: focused ? '#388E3C' : 'black',
                }}
              />
              {/* {photo ? (
                <Image
                  source={{
                    uri: `${photo}?random=${Math.random()
                      .toString(36)
                      .substring(7)}`,
                  }}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    borderColor: focused ? 'black' : null,
                    borderWidth: focused ? 1 : null,
                  }}
                />
              ) : (
                <Image
                  source={require('../assets/profile.png')}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? 'black' : 'gray',
                  }}
                />
              )} */}
              <Text
                style={{
                  fontWeight: focused ? 700 : 400,
                  color: focused ? '#388E3C' : 'black',
                  fontSize: 13,
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
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
});
