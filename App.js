import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from '../appProjeto/src/screens/Login/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuTabs from '../appProjeto/src/screens/MenuTabs/menutabs';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Sigin from './src/screens/Sigin/Sigin'

export default function App() {
  const [user, setUser] = useState({});

  function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }

  function changeStatus(){

  }

  const Stack = createNativeStackNavigator();
  
  //verifica se existe um usuário logado, se não houver chama a
//tela de login
 if(!user){
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="login">
        {(props) => <Login setUser={(e) => setUser(e)} {...props} />}
      </Stack.Screen>

      <Stack.Screen name="sigin">
        {(props) => <Sigin {...props} />}
      </Stack.Screen>

      <Stack.Screen name="menutabs">
        {(props) => <MenuTabs {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
  )
 }else{
  return <MenuTabs />
 }
}


