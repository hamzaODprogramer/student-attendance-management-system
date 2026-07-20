import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from "./screens/Login";
import Reset from "./screens/Reset";
import Screens from "./screens/Screens";
import ClasseStatic from "./screens/ClasseStatics";
import Students from "./screens/Students";
import CameraScreen from "./screens/CameraScreen";
import Result from "./screens/Result";
import { ToastProvider } from "react-native-toast-notifications";

const Stack = createNativeStackNavigator();

export default function App() {
  return <>
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="Login" component={Login} /> 
          <Stack.Screen name="Reset" component={Reset}  options={{headerTitle:"Récupération du compte",headerTintColor:"navy"}}/>
          <Stack.Screen options={{headerShown:false}} name="Screens" component={Screens}/>
          <Stack.Screen name="ClasseStatic" component={ClasseStatic} options={{headerTitle:"Statistique de classe",headerTintColor:"navy"}}/>
          <Stack.Screen name="Students" component={Students} options={{headerTitle:"Liste des étudiant",headerTintColor:"navy"}}/>
          <Stack.Screen name="CameraScreen" component={CameraScreen} options={{headerTitle:"Prendre une photo",headerTintColor:"navy"}}/>
          <Stack.Screen name="Result" component={Result} options={{headerTitle:"Liste d'absence",headerTintColor:"navy"}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  </>
}


