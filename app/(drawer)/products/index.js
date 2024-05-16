import { StyleSheet, SafeAreaView, ScrollView, View, TouchableOpacity, FlatList, Text } from 'react-native';
import Search from '../../../components/home/Search';
import ProductsList from '../../../components/home/Products';
import { useState, useEffect } from "react";
import { COLORS, SIZES } from "../../../constants";

const Products = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([])
    const [categories, setCategories] = useState(['All']);
    const [cat, setCat] = useState('All');


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products/categories');
                const data = await response.json();
                setCategories(["All", ...data]);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories()
    }, [])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = cat == 'All' ? 'https://fakestoreapi.com/products' : `https://fakestoreapi.com/products/category/${cat}`
                const response = await fetch(url);
                const data = await response.json();
                
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [cat]);

    const search = () => {
        if (searchTerm) {
            setFilteredProducts(products.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase())))
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleClick={search}
            ></Search>

            <View style={styles.tabsContainer}>
                <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    style={styles.tab(cat, item)}
                    onPress={() => setCat(item)}
                    >
                    <Text style={styles.tabText(cat, item)}>{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
                contentContainerStyle={{ columnGap: SIZES.small }}
                horizontal
                />
            </View>

            <ProductsList products={filteredProducts}></ProductsList>
            <ScrollView showsVerticalScrollIndicator={false} ></ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        margin: 10,
    },
    tabsContainer: {
        width: "100%",
        marginTop: SIZES.medium,
    },
    tab: (cat, item) => ({
        paddingVertical: SIZES.small / 2,
        paddingHorizontal: SIZES.small,
        borderRadius: SIZES.medium,
        borderWidth: 1,
        borderColor: cat === item ? COLORS.secondary : COLORS.gray2,
    }),
      tabText: (cat, item) => ({
        color: cat === item ? COLORS.secondary : COLORS.gray2,
    }),
})

export default Products;