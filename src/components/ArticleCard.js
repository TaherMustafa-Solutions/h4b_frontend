import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {Card, useTheme} from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import TimeAgo from 'react-native-timeago';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const ArticleCard = ({article}) => {
  const [index, setIndex] = useState(0);

  //Remove

  const theme = useTheme();
  // const date = new Date(article.date);
  const width = Dimensions.get('window').width - 13;

  return (
    <GestureHandlerRootView>
      <Card mode="elevated" elevation={3} style={styles.container(theme)}>
        <Carousel
          loop={article.imgs.length > 1 ? true : false}
          width={width}
          height={250}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          data={article.imgs}
          autoPlay={article.imgs.length > 1 ? true : false}
          autoPlayInterval={5000}
          scrollAnimationDuration={400}
          onSnapToItem={index => setIndex(index)}
          renderItem={({index}) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Image
                source={{
                  uri: `${article.imgs[index]}`,
                }}
                style={{
                  width: width + 0.4,
                  height: '100%',
                  borderTopRightRadius: 11,
                  borderTopLeftRadius: 11,
                }}
              />
            </View>
          )}
        />
        <View style={{height: 10, alignItems: 'center', paddingTop: 15}}>
          <AnimatedDotsCarousel
            length={article.imgs.length}
            currentIndex={index}
            maxIndicators={article.imgs.length > 1 ? article.imgs.length : 0}
            interpolateOpacityAndColor={true}
            activeIndicatorConfig={{
              color: theme.colors.secondary,
              margin: 3,
              opacity: 1,
              size: 8,
            }}
            inactiveIndicatorConfig={{
              color: theme.colors.secondary,
              margin: 3,
              opacity: 0.5,
              size: 8,
            }}
            decreasingDots={[
              {
                config: {color: 'white', margin: 3, opacity: 0.5, size: 6},
                quantity: 1,
              },
              {
                config: {color: 'white', margin: 3, opacity: 0.5, size: 4},
                quantity: 1,
              },
            ]}
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{article.title}</Text>
          <TimeAgo time={article.date} interval={10000} style={styles.date} />
        </View>

        <Card.Content>
          <Text variant="bodyLarge" style={styles.content}>
            {article.content}
          </Text>
        </Card.Content>
      </Card>
    </GestureHandlerRootView>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  container: theme => ({
    margin: 8,
    alignSelf: 'center',
    marginVertical: 17,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: theme.colors.primary,
  }),

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5%',
  },

  title: {
    fontSize: 21,
    color: '#fff',
    fontWeight: '700',
    maxWidth: '75%',
  },

  date: {
    fontStyle: 'italic',
    color: '#ddd',
  },

  content: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 20,
    textAlign: 'justify',
  },
});
