import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './navigators/StackNavigator';
import { Provider } from 'react-redux';
import store from './redux/store/store';

export default function App() {
  return (
    <Provider store={store}>

    <NavigationContainer>
      <StackNavigator></StackNavigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});