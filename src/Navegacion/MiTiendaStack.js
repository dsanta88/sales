import React from "react"
import {createStackNavigator} from '@react-navigation/stack'

import MiTienda from '../Pantallas/MiTienda/MiTienda'
import EditProducto from '../Pantallas/MiTienda/EditProducto'

const Stack=createStackNavigator()

export default function MiTiendaStack(){
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle:{backgroundColor: "#156cb4"},
                headerTintColor:"#3cb44c"
            }}
         >
            <Stack.Screen
              component={MiTienda}
              name="mi-tienda"
              options={{
                  title:"Mi tienda"
              }}
            />

            <Stack.Screen
              component={EditProducto}
              name="edit-producto"
              options={{
                  title:"Editar producto"
              }}
            />
        </Stack.Navigator>
    )
}


