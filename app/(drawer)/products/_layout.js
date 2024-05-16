import { Stack, Tabs } from "expo-router";

const Layout = () => {

    return (
            <Stack screenOptions={{headerShown: false}} />
            // <Tabs>
            //     <Tabs.Screen
            //             name='home'
            //         options={{
            //             headerLeft: () => <ScreenHeaderBtn iconUrl={icons.chevronLeft} dimension="80%" handlePress={() => router.back()} ></ScreenHeaderBtn>,
            //             headerTitle: ""
            //         }}
            //     ></Tabs.Screen>
            // </Tabs>
    )
}

export default Layout;