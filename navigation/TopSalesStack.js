import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'

const Stack=createStackNavigator()

import TopSales from '../screens/TopSales'

export default function TopSalesStack() {
    return (
      <Stack.Navigator>
          <Stack.Screen
            name="top-sales"
            component={TopSales}
            options={{title:"Top"}}
          />
      </Stack.Navigator>
    )
}
