import React from "react"
import {createStackNavigator} from '@react-navigation/stack'

import Tienda from '../Pantallas/Tienda/Tienda'


const Stack=createStackNavigator()

export default function TiendaStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
              component={Tienda}
              name="tienda"
              options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}

