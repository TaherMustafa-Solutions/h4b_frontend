import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Card, Divider, IconButton, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {resetBag, setBag, setNewBag} from '../store/userSlice';
import client from '../client';

const Bag = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const theme = useTheme();
  const bag = useSelector(state => state.user.bag);
  const userID = useSelector(state => state.user.id);
  const dispatch = useDispatch();

  const handleRemoveItem = index => {
    const newBag = [...bag.slice(0, index), ...bag.slice(index + 1)];
    dispatch(setNewBag(newBag));
  };

  async function sendData() {
    const result = await bag.reduce((obj, {item, weight}) => {
      obj[item] = weight;
      return obj;
    }, {});
    try {
      const {data: res} = await client.post(`order/${userID}`, result);

      if (res.result === true) {
        console.log('Done');
      } else {
        console.log('Not Done');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {showConfirm && bag.length < 1 && (
        <View style={{backgroundColor: theme.colors.secondary}}>
          <Image
            source={require('../assets/photos/confirm_3.png')}
            style={{
              width: '100%',
              resizeMode: 'contain',
              alignSelf: 'center',
              backgroundColor: theme.colors.secondary,
            }}
          />
          <Text
            style={{
              backgroundColor: theme.colors.secondary,
              fontWeight: 700,
              alignSelf: 'center',
              fontSize: 24,
            }}>
            Pickup Confirmed!
          </Text>
        </View>
      )}
      <ScrollView style={{backgroundColor: theme.colors.secondary}}>
        {bag.length < 1 && (
          <Image
            source={require('../assets/photos/empty_bag_last.png')}
            style={{
              width: '90%',
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: '40%',
            }}
          />
        )}
        {bag.map((item, index) => (
          <View key={index}>
            <Card.Title
              title={`${item.weight} KG`}
              // subtitle={item.weight}
              titleStyle={{
                color: theme.colors.primary,
                marginTop: 10,
                fontWeight: 700,
                fontSize: 18,
                marginBottom: 7,
                maxWidth: '70%',
                marginLeft: '4%',
              }}
              titleNumberOfLines={100}
              left={props => (
                <Image
                  source={item.icon}
                  style={{width: '150%', resizeMode: 'contain'}}
                />
              )}
              right={props => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginHorizontal: '3%',
                  }}>
                  <Text style={{fontWeight: 700, fontSize: 18}}>
                    &#x20B9;{item.rate * item.weight}
                  </Text>
                  <IconButton
                    {...props}
                    icon="close"
                    onPress={() => handleRemoveItem(index)}
                  />
                </View>
              )}
            />
            <Divider theme={{colors: {primary: theme.colors.primary}}} />
          </View>
        ))}
      </ScrollView>

      {bag.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            sendData();
            setShowConfirm(true);
            dispatch(resetBag());
            setTimeout(() => {
              setShowConfirm(false);
            }, 10000);
          }}
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.primary,
            width: '50%',
            bottom: '20%',
            position: 'absolute',
            paddingVertical: '6%',
            borderRadius: 25,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: theme.colors.secondary,
              fontWeight: 600,
            }}>
            Confirm Pickup
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Bag;

const styles = StyleSheet.create({});
