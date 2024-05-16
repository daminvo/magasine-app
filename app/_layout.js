import { Stack } from "expo-router";
import AuthProvider from "../hooks/AuthProvider";
import { StatusBar } from 'expo-status-bar';

const Layout = () => {

    return (
        <AuthProvider>
            <StatusBar style="dark" />
            <Stack screenOptions={{headerShown: false}} />
        </AuthProvider>
    )
}

export default Layout;