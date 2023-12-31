import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import client from '../client';
import {useTheme} from 'react-native-paper';
import RankCard from '../components/RankCard';

const Leaderboard = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [ranks, setRanks] = useState([]);

  const theme = useTheme();

  const getRanks = async () => {
    setLoading(true);
    try {
      const {data: res} = await client.get('leaderboard');

      if (res.result === true) {
        setRanks(res.data);
        console.log(res.data);
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
    getRanks();
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
        data={ranks}
        renderItem={({item, index}) => (
          <RankCard key={index} index={index} rank={item} />
        )}
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getRanks} />
        }
        bouncesZoom
        bounces
        style={{backgroundColor: theme.colors.secondary}}
      />
    </View>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({});
