import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dialog, Portal, useTheme} from 'react-native-paper';
import client from '../client';
import OrderCard from '../components/OrderCard';

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [orders, setOrders] = useState([]);

  const theme = useTheme();

  const getOrders = async () => {
    setLoading(true);
    try {
      const {data: res} = await client.get('orderPending');

      if (res.result === true) {
        setOrders(res.data);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.secondary}}>
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

      <FlatList
        data={orders}
        renderItem={({item, index}) => <OrderCard key={index} order={item} />}
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getOrders} />
        }
        bouncesZoom
        bounces
        style={{backgroundColor: theme.colors.secondary}}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  title: theme => ({
    textAlign: 'center',
    color: theme.colors.secondary,
  }),

  button_text: theme => ({
    color: theme.colors.primary,
    fontSize: 18,
  }),

  modal_text: theme => ({
    color: theme.colors.secondary,
    fontWeight: 700,
    fontSize: 15,
  }),

  modal_btn: {
    marginRight: 10,
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
});
