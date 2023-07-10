import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Snackbar, useTheme} from 'react-native-paper';
import NumericInput from 'react-native-numeric-input';
import {useDispatch} from 'react-redux';
import {setBag} from '../store/userSlice';

const AddForm = ({route}) => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  const {logo_uri, text, navigateText, rate} = route.params;

  const theme = useTheme();
  const dispatch = useDispatch();

  const success = '../assets/icons/checked.png';
  const failed = '../assets/icons/error.png';

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.secondary}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          marginBottom: '10%',
        }}>
        <Image
          source={logo_uri}
          resizeMode="contain"
          style={{
            width: '40%',
            height: '20%',
          }}
        />
        <Text style={{fontWeight: 700, fontSize: 22}}>{text}</Text>
        <Text
          style={{
            fontWeight: 700,
            fontSize: 18,
            marginTop: '3%',
            marginBottom: '7%',
          }}>
          (&#x20B9;{rate} / KG )
        </Text>
        <NumericInput
          value={value}
          onChange={value => setValue(value)}
          editable
          minValue={0}
          valueType="real"
          step={0.5}
          rounded
          iconStyle={{color: theme.colors.secondary}}
          borderColor={theme.colors.primary}
          rightButtonBackgroundColor={theme.colors.primary}
          leftButtonBackgroundColor={theme.colors.primary}
          totalWidth={190}
          totalHeight={50}
        />
        <Text
          style={{
            fontWeight: 500,
            fontSize: 16,
            marginTop: '3%',
          }}>
          Enter Weight in KGs
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
          // setValue(0);
          dispatch(
            setBag({item: navigateText, weight: value, icon: logo_uri, rate}),
          );
        }}
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.primary,
          width: '80%',
          bottom: '8%',
          position: 'absolute',
          paddingVertical: '4%',
          borderRadius: 25,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: theme.colors.secondary,
            fontWeight: 600,
          }}>
          Add To Bag
        </Text>
      </TouchableOpacity>
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
        <Text style={{color: error ? '#880808' : '#006400'}}>Added To Bag</Text>
      </Snackbar>
    </View>
  );
};

export default AddForm;

const styles = StyleSheet.create({
  snackbar: error => ({
    margin: 0,
    padding: 0,
    borderRadius: 0,
    backgroundColor: error ? '#F88379' : '#a6f1a6',
  }),
});
