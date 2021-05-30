import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'

const Stack=createStackNavigator()

import Sales from '../screens/Sales'

export default function SalesStack() {
    return (
      <Stack.Navigator>
          <Stack.Screen
            name="sales"
            component={Sales}
            options={{title:"Ofertas"}}
          />
      </Stack.Navigator>
    )
}
