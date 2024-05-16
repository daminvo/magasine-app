import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native'
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import ScreenHeaderBtn from '../../../../components/ScreenHeaderBtn';
import { icons } from "../../../../constants";


export default ProductDetail = () => {
    const [product, setProduct] = useState({});
    const router = useRouter()

    const params = useLocalSearchParams();
    useEffect(() => {
        const fetchProduct =async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products/' + params.id ).then( res => res.json());
                setProduct(response);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }

        fetchProduct();
    }, [])
    if (product) {
        return (
          <SafeAreaView style={{flex: 1}}>
            <Stack.Screen
                options={{
                    headerStyle:{backgroundColor: '#fff',},
                    headerShadowVisible: false,
                    headerLeft: () => <ScreenHeaderBtn iconUrl={icons.chevronLeft} dimension="80%" handlePress={() => router.back()} ></ScreenHeaderBtn>,
                    headerTitle: ""
                }}
            ></Stack.Screen>
            <View style={styles.container}>
              <ScrollView>
                <View style={{flex: 1, alignItems: 'center', marginHorizontal: 30 }}>
                  <Image
                    style={styles.productImg}
                    source={{ uri: product.image }}
                  />
                  <Text style={styles.name}>{product.title}</Text>
                  <Text style={styles.price}>$ {product.price}</Text>
                  <Text style={styles.description}>{product.description}</Text>
                </View>
        
                <View style={styles.separator}></View>
                <View style={styles.addToCarContainer}>
                  <TouchableOpacity style={styles.shareButton}>
                    <Text style={styles.shareButtonText}>Order Now</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  productImg: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: 'bold',
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: '#696969',
    marginTop: 60,
  },
  separator: {
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 20,
    marginHorizontal: 30,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30,
  },
})
