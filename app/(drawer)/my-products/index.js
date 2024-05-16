import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import ScreenHeaderBtn from '../../../components/ScreenHeaderBtn';
import { useAuth } from '../../../hooks/AuthProvider';
import { COLORS, SIZES, icons } from "../../../constants";
import { useRouter } from 'expo-router';


const ProductCard = ({ item, onPressed, onDelete }) => {
  return (
    <TouchableOpacity onPress={onPressed}>
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.title}</Text>
        {/* <Text style={styles.productDescription}>{item.description}</Text> */}
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      <View style={styles.productAmount}>
        <ScreenHeaderBtn iconUrl={icons.delet} dimension="60%" handlePress={() => onDelete(item.id)}></ScreenHeaderBtn>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const MyProducts = () => {
  const [products, setProducts] = useState();

  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    const getProducts =async () => {
        await auth.checkToken();
        const response = await fetch('https://fakestoreapi.com/products').then(res => res.json());
        setProducts(response);
        
    }
    getProducts()
}, [])

const handleDelete = async (id) => {
    const headers = {
        method: "DELETE"
    }
    try {
        const response = await fetch('https://fakestoreapi.com/products/' + id, headers)
        console.log(response);
        if (response.ok) { 
            setProducts(products.filter(p => p.id != id ))
        }else
            console.log("something went wrong");
    } catch (error) {
        throw new Error(error)
    }
    
}

  const renderProductItem = ({ item }) => (
    <ProductCard item={item} onPressed={() => router.push('/my-products/edit/' + item.id)} onDelete={handleDelete} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        style={styles.productList}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
      />
      <TouchableOpacity style={styles.continueButton} onPress={() => router.push('/my-products/add')} >
        <Text style={styles.continueButtonText}>Add New Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop:40,
  },
  productList: {
    flex: 1,
    paddingTop: 16,
  },
  productCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
    marginRight: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  productPriceText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#666',
  },
  productAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#4caf50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyProducts;