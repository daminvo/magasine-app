import { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'


export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkToken()
  }, []);

  const checkToken = async () => {
    SplashScreen.preventAutoHideAsync()
    setIsLoading(true);
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) 
        setToken(storedToken);
    else
        router.push('/login')

    setIsLoading(false);
    await SplashScreen.hideAsync();  
  }

  const attemptLogin =async (data) => {
    try {
      const requestHeader = {
        method:'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": data.username,
            "password": data.password
        })
      }
      const res = await fetch('https://fakestoreapi.com/auth/login', requestHeader).then(res=>res.json());
      if (res && res.token != null) {
        setToken(res.token);
        await AsyncStorage.setItem('token', res.token);
        router.push('/products')
      }
      else {
        throw new Error(res.message);
      }
    } catch (e) {
      console.log(e);
      
    }
  }

  const logOut = async () => {
    setToken(null);
    await AsyncStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <AuthContext.Provider value={{attemptLogin, logOut, token, checkToken, isLoading}}>
      {children}
    </AuthContext.Provider>
    )
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

