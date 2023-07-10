import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Avatar, Button, Card, IconButton, Text} from 'react-native-paper';

const OrderCard = () => {
  return (
    <Card>
      <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={props => <Avatar.Icon {...props} icon="folder" />}
      />
      <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

export default OrderCard;

const styles = StyleSheet.create({});
