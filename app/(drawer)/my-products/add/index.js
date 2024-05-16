import { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AppButton from '../../../../components/AppButton';

const UpdateComponentForm = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  const [imageData, setImageData] = useState();

  const route = useRouter();

  const [categories, setCategories] = useState()
  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    fetchCategories()
}, [])

  const handleImagePicker = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'Please allow access to your photo library to pick an image.');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!pickerResult.assets[0].canceled) {
        setImage(pickerResult.assets[0].uri);
        setImageData(pickerResult.assets[0].fileName)
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleFormSubmit = async () => {
    
    if (checkFields())
        console.log('You cannot leave empty fields');
    else {

        const reqHeaders = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                description,
                price,
                category,
                image
            })
        }

        const response = await fetch('https://fakestoreapi.com/products', reqHeaders)
        
        if (response.ok) {
          setTitle('');
          setDescription('');
          setPrice('');
          setCategory('');
          setImage(null); 
          return route.push('/my-products')
        }
        else 
            console.log(response);

    }
  };
  const checkFields = () => (title == "" || description == "" || price == "" || image == "" || category == "" );

  return (
    <View style={styles.container}>
      <Text style={styles.labels} >Title:</Text>
      <TextInput
        style={styles.inputs}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />
      <Text style={styles.labels}>Description:</Text>
      <TextInput
        style={styles.inputs}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />
      <Text style={styles.labels}>Price:</Text>
      <TextInput
        style={styles.inputs}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter price"
        keyboardType="numeric"
      />
      <Text style={styles.labels}>Category:</Text>
      <TextInput
        style={styles.inputs}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter category"
      />
      <Text style={styles.labels}>Image: </Text>
      <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 10 }} />}
        { imageData ? <Text>{imageData}</Text> : ''}
      </View>
      <AppButton textStyles={{marginVertical: 10 }} buttonStyles={{width: 200}} children="Choose Image" onPress={handleImagePicker} />
      <AppButton textStyles={{marginVertical: 10 }} buttonStyles={{width: 200, marginTop: 10}} children="Add Product" onPress={handleFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  inputs: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 'auto',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#cccccc'
  },
  labels: {
    marginLeft: "6%",
    fontSize: 22,
    fontWeight: 'lighter'
  },
})

export default UpdateComponentForm;
