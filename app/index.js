import { useAuth } from "../hooks/AuthProvider";
import { Redirect } from "expo-router";
import * as SplashScreen from 'expo-splash-screen'


 const App = () => {
    const auth = useAuth();
    return (
                <Redirect href="/products" />
    );
}

export default App;

