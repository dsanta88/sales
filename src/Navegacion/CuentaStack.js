import React from "react"
import {NavigationContainer}  from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import ConfirmarNumero from '../Pantallas/Cuenta/ConfirmarNumero'
import EnviarConfirmacion from '../Pantallas/Cuenta/EnviarConfirmacion'

const Stack=createStackNavigator()

export default function CuentaStack(){
    return (
     <NavigationContainer>
        <Stack.Navigator>

       
       
          <Stack.Screen
              component={EnviarConfirmacion}
              name="enviar-confirmacion"
              options={{
                  name:"Enviar  confirmación",
                  headerStyle:{backgroundColor: "156cb4"},
                  headerTintColor:"#3cb44c"
              }}
            />

           <Stack.Screen
              component={ConfirmarNumero}
              name="confirmar-numero"
              options={{
                  name:"Confirmar tu número de teléfono",
                  headerStyle:{backgroundColor: "156cb4"},
                  headerTintColor:"#3cb44c"
              }}
            />
    

        </Stack.Navigator>
     </NavigationContainer>
    )
}


