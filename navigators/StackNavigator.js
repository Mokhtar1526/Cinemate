import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Favourites from "../screens/Favourites";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

function StackNavigator(){
    return(
        <Stack.Navigator >
            <Stack.Screen name="drawer" component={DrawerNavigator} options={{headerShown: false}} />
            <Stack.Screen name="Home" component={Home} options={
            {title:"Movies"}
            } />
            <Stack.Screen name="Favourites" component={Favourites} />
        </Stack.Navigator>
    )
}

export default StackNavigator;