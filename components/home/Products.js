import React from 'react';
import { FlatList, Image, Text, View, Pressable, Dimensions } from 'react-native';
import { useRouter } from "expo-router";



const ProductsList= ({ products }) => {
  const router = useRouter();
  const dimension = Dimensions.get('window');
  // console.log(dimension);
  const imageWidth = Math.floor(dimension.width / Math.floor(dimension.width/350));
  console.log(imageWidth);

  const renderProduct = ({ item }) => {
    return (
      <Pressable style={{width: imageWidth }} onPress={() => router.push('/products/' + item.id)}>
        <View style={styles.product}>
          <Image  style={styles.image} source={{ uri: item.image }} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      numColumns={Math.floor(dimension.width/350)}
      keyExtractor={item => item.id}
    />
  );
};

const styles = {
  product: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  info: {
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#999',
  },
};

export default ProductsList;