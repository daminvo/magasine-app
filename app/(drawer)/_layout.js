import { Drawer } from "expo-router/drawer";

const Layout = () => {
    // const auth = useAuth();

    return (
        <Drawer>
      <Drawer.Screen
        name="products"
        options={{
          drawerLabel: "Products",
          title: "",
        }}
      />
      <Drawer.Screen
        name="my-products" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "my products",
          title: "",
        }}
      />
      <Drawer.Screen
        name="logout" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Log out",
          title: "",
        }}
      />
        </Drawer>
    )
}

export default Layout;