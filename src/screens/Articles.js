import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from 'react-native-paper';
import ArticleCard from '../components/ArticleCard';

const Articles = () => {
  const [refreshing, setRefreshing] = useState(false);

  const theme = useTheme();
  const date = new Date();

  const articles = [
    {
      title: 'Hey',
      content: 'My name is xcs and i am participating in h4b',
      date,
      imgs: [
        'https://img.freepik.com/free-photo/outdoor-background-with-sustainable-park-watercolor_53876-105305.jpg?w=996&t=st=1688901045~exp=1688901645~hmac=bc130c58cb79b27f77244385d5776804b885bc0f13763150384e6bc64341ee6f',
        'https://img.freepik.com/free-photo/outdoor-background-with-sustainable-park-watercolor_53876-105305.jpg?w=996&t=st=1688901045~exp=1688901645~hmac=bc130c58cb79b27f77244385d5776804b885bc0f13763150384e6bc64341ee6f',
        'https://img.freepik.com/free-photo/outdoor-background-with-sustainable-park-watercolor_53876-105305.jpg?w=996&t=st=1688901045~exp=1688901645~hmac=bc130c58cb79b27f77244385d5776804b885bc0f13763150384e6bc64341ee6f',
      ],
    },
    {
      title: 'Hey',
      content: 'My name is xcs and i am participating in h4b',
      date,
      imgs: [
        'https://img.freepik.com/free-photo/outdoor-background-with-sustainable-park-watercolor_53876-105305.jpg?w=996&t=st=1688901045~exp=1688901645~hmac=bc130c58cb79b27f77244385d5776804b885bc0f13763150384e6bc64341ee6f',
        'https://img.freepik.com/free-photo/outdoor-background-with-sustainable-park-watercolor_53876-105305.jpg?w=996&t=st=1688901045~exp=1688901645~hmac=bc130c58cb79b27f77244385d5776804b885bc0f13763150384e6bc64341ee6f',
        'https://img.freepik.com/free-photo/outdoor-background-with-sustainable-park-watercolor_53876-105305.jpg?w=996&t=st=1688901045~exp=1688901645~hmac=bc130c58cb79b27f77244385d5776804b885bc0f13763150384e6bc64341ee6f',
      ],
    },
    {
      title: 'Hey',
      content: 'My name is xcs and i am participating in h4b',
      date,
      imgs: [
        'https://img.freepik.com/free-photo/outdoor-background-with-sustainable-park-watercolor_53876-105305.jpg?w=996&t=st=1688901045~exp=1688901645~hmac=bc130c58cb79b27f77244385d5776804b885bc0f13763150384e6bc64341ee6f',
        'https://img.freepik.com/free-photo/outdoor-background-with-sustainable-park-watercolor_53876-105305.jpg?w=996&t=st=1688901045~exp=1688901645~hmac=bc130c58cb79b27f77244385d5776804b885bc0f13763150384e6bc64341ee6f',
        'https://img.freepik.com/free-photo/outdoor-background-with-sustainable-park-watercolor_53876-105305.jpg?w=996&t=st=1688901045~exp=1688901645~hmac=bc130c58cb79b27f77244385d5776804b885bc0f13763150384e6bc64341ee6f',
      ],
    },
    {
      title: 'Hey',
      content: 'My name is xcs and i am participating in h4b',
      date,
      imgs: [
        'https://img.freepik.com/free-photo/outdoor-background-with-sustainable-park-watercolor_53876-105305.jpg?w=996&t=st=1688901045~exp=1688901645~hmac=bc130c58cb79b27f77244385d5776804b885bc0f13763150384e6bc64341ee6f',
        'https://img.freepik.com/free-photo/outdoor-background-with-sustainable-park-watercolor_53876-105305.jpg?w=996&t=st=1688901045~exp=1688901645~hmac=bc130c58cb79b27f77244385d5776804b885bc0f13763150384e6bc64341ee6f',
        'https://img.freepik.com/free-photo/outdoor-background-with-sustainable-park-watercolor_53876-105305.jpg?w=996&t=st=1688901045~exp=1688901645~hmac=bc130c58cb79b27f77244385d5776804b885bc0f13763150384e6bc64341ee6f',
      ],
    },
  ];

  return (
    <View style={styles.container(theme)}>
      <FlatList
        data={articles}
        renderItem={({item}) => <ArticleCard key={item.id} article={item} />}
        showsVerticalScrollIndicator={true}
        //   refreshControl={
        //     <RefreshControl refreshing={refreshing} onRefresh={getArticles} />
        //   }
        bouncesZoom
        bounces
      />
    </View>
  );
};

export default Articles;

const styles = StyleSheet.create({
  container: theme => ({
    backgroundColor: theme.colors.secondary,
    paddingBottom: '30%',
  }),
});
