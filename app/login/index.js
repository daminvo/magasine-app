import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { useAuth } from "../../hooks/AuthProvider";
import { StyleSheet, TextInput, View, SafeAreaView } from 'react-native';
import { Stack } from "expo-router";
import AppButton from '../../components/AppButton'


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    // const [formMessage, setFormMessage] = useState('');
  
    const auth = useAuth();
  
  
    const handleFormSubmit = async () => {
        
        // if (username)
        //     setFormMessage('Please provide a valid username');
        // else if (password)
        //     setFormMessage('Please provide a valid password');
        // else {
            const dataForm = {
                username,
                password
            }
            auth.attemptLogin(dataForm).then(() => console.log(auth.token));

        // }
  
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <View style={styles.inputsContainer}>
              <TextInput onChangeText={(text) => setUsername(text)} style={styles.inputs} placeholder="Username" />
              <TextInput onChangeText={(text) => setPassword(text)} style={styles.inputs} placeholder="Password" />
            </View>
            <AppButton onPress={handleFormSubmit} children="Login" color="#fff" textStyles={styles.appButtonText} buttonStyles={styles.appButton} ></AppButton>
            <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },

    container: {
      flex: 1,
      backgroundColor: '#f3f4f6',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
    },
    
    inputsContainer: {
      width: '100%'
    },

    appButton: {
        borderWidth: 1,
        borderColor: '#052E16',
        borderRadius: 15,
        paddingHorizontal: 40,
        marginTop: 20,
    },

    appButtonText: {
        padding: 3,
        color: '#000',
        fontSize: 20
    },
  
    inputs: {
      width: '70%',
      backgroundColor: '#fff',
      padding: 15,
      marginVertical: 10,
      marginHorizontal: 'auto',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: '#cccccc'
    }
});
 

export default Login;