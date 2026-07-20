import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from './Home';
import Account from './Account';
import Statics from './Statics';
const Tab = createMaterialBottomTabNavigator();

export default function Screens() {
  return (
    <Tab.Navigator initialRouteName='Accueil' inactiveColor='black' activeColor='navy' activeIndicatorStyle={{backgroundColor:'rgba(10,10,119,0.1)'}}>
      <Tab.Screen name="Accueil" component={Home}  options={{tabBarIcon:'home'}}/>
      <Tab.Screen name="Statistiques" component={Statics} options={{tabBarIcon:'chart-box'}}/>
      <Tab.Screen name="Compte" component={Account} options={{tabBarIcon:'account'}} />
    </Tab.Navigator>
  );
}
