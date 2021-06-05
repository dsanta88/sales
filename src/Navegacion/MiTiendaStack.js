import React from "react"
import {createStackNavigator} from '@react-navigation/stack'

import MiTienda from '../Pantallas/MiTienda/MiTienda'
import EditProducto from '../Pantallas/MiTienda/EditProducto'
import AddProducto from '../Pantallas/MiTienda/AddProducto'

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
              component={AddProducto}
              name="add-producto"
              options={{
                  title:"Agregar nuevo producto",
                  headerStyle:{backgroundColor:"#166cb3"},
                  headerTintColor:"#fff"
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


