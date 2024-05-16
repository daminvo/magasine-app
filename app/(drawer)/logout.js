import { useAuth } from "../../hooks/AuthProvider";
import { Redirect } from "expo-router";
import { useEffect } from "react";

 const App = () => {
    const auth = useAuth();
    useEffect(() => {
        const logout = async () => auth.logOut();
        logout();
    }, [])
    return (
        // <Redirect href="/login" />
        <></>
    );
}

export default App;