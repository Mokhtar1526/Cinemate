import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Favourites from "../screens/Favourites";
import { Icon } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

function DrawerNavigator(){
    return(
        <Drawer.Navigator screenOptions={
            {headerStyle:{backgroundColor:"#030104"},headerTintColor:"red",drawerStyle:{backgroundColor:"black",paddingVertical:20},drawerLabelStyle:{color:"red"}}
            }>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Favourites" component={Favourites}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;