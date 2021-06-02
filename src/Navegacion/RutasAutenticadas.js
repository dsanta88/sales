import React from 'react'


import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {createDrawerNavigator} from "@react-navigation/drawer"
import {Icon} from "react-native-elements"

import TiendaStack  from './TiendaStack'
import PerfilStack  from './PerfilStack'
import MiTiendaStack  from './MiTiendaStack'


const Tab =createBottomTabNavigator()
const Drawer=createDrawerNavigator()


const TabBar=()=>{
    return(
        <Tab.Navigator
          initialRouteName="tienda"
          tabBarOptions={{
            inactiveTintColor:"#fff",
            activeTintColor:"#fff",
            style:{
                borderTopLeftRadius:60,
                borderTopRightRadius:60,
                alignItems:"center",
                backgroundColor: "#156cb4",
                paddingBottom:5,
            }
          }}

          screenOptions={({route})=>({
            tabBarIcon:({color})=>mostrarIcono(route,color),
         })}

         >
             <Tab.Screen
              component={TiendaStack}
              name="tienda"
              options={{title:"Tienda"}}
            /> 
         
         <Tab.Screen
              component={MiTiendaStack}
              name="mi-tienda"
              options={{title:"M tienda"}}
            /> 
            
           <Tab.Screen
              component={PerfilStack} 
              name="perfil"
              options={{title:"Perfil"}}
            />  
        </Tab.Navigator>
    )
}

function mostrarIcono(route,color){

  let iconName=""

  switch (route.name) {
    case "tienda":
      iconName="cart-outline"
      break;
      case "mi-tienda":
        iconName="cart-outline"
        break;
      case "perfil":
          iconName="account-circle-outline"
      break;
  }

  return (
    <Icon type="material-community" name={iconName} size={24} color={color}/>
  )
}

export default function RutasAutenticadas(){
  return(
    <NavigationContainer>
           <TabBar/>
    </NavigationContainer>
  )
}