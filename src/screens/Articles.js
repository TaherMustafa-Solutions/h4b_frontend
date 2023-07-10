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
      title: 'Awareness of Plastic Recycling',
      content:
        'Plastic recycling is crucial for the well-being of our planet. By recycling plastic, we can reduce the environmental impact of this versatile material. Plastic pollution has become a global crisis, and it is essential to raise awareness about the importance of recycling.',
      date,
      imgs: [
        'https://img.freepik.com/free-photo/group-volunteers-collecting-garbage_23-2147807241.jpg?t=st=1688986454~exp=1688987054~hmac=1574857c9581b8deb05a1216f5e00aee6a0bdb9fe3c804998a9b8f8eb01c604d',
        'https://img.freepik.com/free-photo/high-angle-plastic-bottle-white-table_23-2149449775.jpg?t=st=1688986454~exp=1688987054~hmac=a6bb8e96bf43fb173d9e459aa81af372e7af3e4c6019e7f0bc6b37a17770a4bb',
        'https://img.freepik.com/free-photo/woman-collecting-garbage-black-bag_1150-23963.jpg?w=1380&t=st=1688986771~exp=1688987371~hmac=1db8c6f308c9b64b0ce704956f3b8ea5dd28de47ab37c6bec8c8df761cc60942',
      ],
    },
    {
      title: 'Environmental Impacts of Waste',
      content:
        'Waste can have detrimental environmental impacts, including pollution of air, soil, and water. Improper waste disposal leads to the release of greenhouse gases like methane from landfills. Hazardous waste can contaminate ecosystems and pose risks to human and animal health. Land degradation and deforestation occur due to the expansion of landfill sites. ',
      date,
      imgs: [
        'https://img.freepik.com/free-photo/wheel-loader-transporting-municipal-waste-waste-treatment-plant_181624-57005.jpg?w=996&t=st=1688986871~exp=1688987471~hmac=1b400b238e4bebd11d24c8f78de05179a8cf8478974db161e291dc3f3a5a999a',
        'https://img.freepik.com/free-photo/janschwalde-power-plant-germany_181624-50198.jpg?w=996&t=st=1688986909~exp=1688987509~hmac=c24a40402e9130ee872116deb3c0acc33d57d5a1add5215818c0165d26e81f6a',
        'https://img.freepik.com/free-photo/ocean-pollution-campaign-with-plastic-bags-used-bottles-floating_53876-104850.jpg?w=996&t=st=1688986951~exp=1688987551~hmac=b70c3942694128e3c62d9749f7a4514f26a195bf8fdf69408abf51a0162c122c',
      ],
    },
    {
      title: 'Community-Based Recycling Programs',
      content:
        'Community-based recycling waste programs play a vital role in promoting sustainable waste management practices at the local level. These initiatives involve active participation from community members, organizations, and local authorities to reduce waste generation, encourage recycling, and foster a culture of environmental responsibility',
      date,
      imgs: [
        'https://img.freepik.com/free-photo/group-volunteers-collecting-trash-beach-with-teamwork-concept_23-2147827058.jpg?w=996&t=st=1688987086~exp=1688987686~hmac=9709cc2629b1f637ef90ae33127a8212ded057c993251df854eab06b606109af',
        'https://img.freepik.com/free-photo/men-women-help-each-other-collect-garbage_1150-23935.jpg?w=996&t=st=1688987103~exp=1688987703~hmac=ec229371f5984aed06a2a6a951b9a9b49499d1baf7011184fcb19d8723e0d009',
        'https://img.freepik.com/free-photo/group-people-holding-recycling-sign-concept_53876-137723.jpg?w=996&t=st=1688987118~exp=1688987718~hmac=266f35d78fd4ae8b163aaf25f61decb8af547058a4ed6d35245ecba295fd8121',
      ],
    },
    {
      title: 'Ways of Disposing Hazardous Waste',
      content:
        'Hazardous waste can be disposed of through methods such as incineration, landfilling, deep-well injection, recycling and reclamation, chemical treatment, and bioremediation. Incineration involves high-temperature burning of waste, while landfilling uses specialized landfills with containment systems.',
      date,
      imgs: [
        'https://img.freepik.com/free-photo/researcher-protective-suit-collecting-plastic-garbage-into-black-waste-bag-outdoors-sunny-day_651396-2180.jpg?w=996&t=st=1688987277~exp=1688987877~hmac=e3ce0995ad78dc5732d5887fb5ff260f87a0a8f56657043ab2b725116d224048',
        'https://img.freepik.com/free-photo/old-rusty-junk-garbage-steel-rubber_1150-10991.jpg?size=626&ext=jpg&uid=R90103064&ga=GA1.2.239811628.1682412071&semt=ais',
        'https://img.freepik.com/free-photo/ecologist-taking-samples-water-with-test-tube-from-city-river-determine-level-contamination-pollution_342744-952.jpg?t=st=1688987273~exp=1688987873~hmac=693061b5b0e40137ad2b52442c214a0f560b513fd4367ad1fa76096f3df842d4',
      ],
    },
  ];

  return (
    <View style={styles.container(theme)}>
      <FlatList
        data={articles}
        renderItem={({item}) => <ArticleCard key={item.id} article={item} />}
        showsVerticalScrollIndicator={true}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={getArticles} />
        // }
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
