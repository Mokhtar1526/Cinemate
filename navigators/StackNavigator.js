import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Favourites from "../screens/Favourites";
import DrawerNavigator from "./DrawerNavigator";
import MovieDetail from "../components/movieDetails/movieDetail";

const Stack = createNativeStackNavigator();

function StackNavigator(){
    return(
        <Stack.Navigator >
            <Stack.Screen name="drawer" component={DrawerNavigator} options={{headerShown: false}} />
            <Stack.Screen name="Home" component={Home} options={
            {title:"Movies",headerStyle:{backgroundColor:"black"}}
            } />
            <Stack.Screen name="Favourites" component={Favourites} />
            <Stack.Screen name="movieDetail" component={MovieDetail} options={{headerTintColor:"red",headerStyle:{backgroundColor:"black"}}}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default StackNavigator;