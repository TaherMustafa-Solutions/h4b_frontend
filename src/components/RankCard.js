import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import client from '../client';

const RankCard = ({index, rank}) => {
  const [imgUri, setImgUri] = useState(
    'https://res.cloudinary.com/dsxcazh94/image/upload/v1688945408/users/kyu8aezxo4hgsmdnqwbj.png',
  );

  async function getUserImg() {
    try {
      const {data: res} = await client.get(
        `https://dotcomsolutions.biz/api/getH4bProfile.php`,
        {params: {email: rank.email}},
      );

      setImgUri(res);
    } catch (err) {
      setImgUri(
        'https://res.cloudinary.com/dsxcazh94/image/upload/v1688945408/users/kyu8aezxo4hgsmdnqwbj.png',
      );

      console.log(err);
    }
  }

  useEffect(() => {
    getUserImg();
  }, []);

  return (
    <Card
      style={{
        marginVertical: '1.5%',
        marginHorizontal: '2%',
        paddingVertical: 6,
      }}>
      <Card.Title
        title={rank.name}
        titleStyle={{fontWeight: 700, fontSize: 17}}
        subtitle={rank.recycled_weight + ' kgs'}
        subtitleStyle={{marginRight: '10%', fontWeight: 700, fontSize: 15}}
        left={props => (
          <Image source={{uri: imgUri}} style={{width: 50, height: 50}} />
        )}
        right={props => (
          <Text style={{marginRight: '5%', fontWeight: 700, fontSize: 35}}>
            {index == 0 ? '🥇' : index == 1 ? '🥈' : index == 2 ? '🥉' : ''}
          </Text>
        )}
      />
    </Card>
  );
};

export default RankCard;

const styles = StyleSheet.create({});
