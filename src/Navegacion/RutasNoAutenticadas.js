import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'

import Login  from '../Pantallas/Cuenta/Login'
import Registro  from '../Pantallas/Cuenta/Registro'
import RestaurarPassword  from '../Pantallas/Cuenta/RestaurarPassword'

const Stack=createStackNavigator()

export default function RutasNoAutenticadas()
{
 return(
     <NavigationContainer>
         <Stack.Navigator
           initialRouteName="login"
           screenOptions={{
               headerShown:false
           }}
          >

             <Stack.Screen
                name="login"
                component={Login}           
             />

             <Stack.Screen
                name="registro"
                component={Registro}         
             />

             <Stack.Screen
                 name="restaurar-password"
                component={RestaurarPassword}
             />
         </Stack.Navigator>
     </NavigationContainer>

    )
}