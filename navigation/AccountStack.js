import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'

const Stack=createStackNavigator()

import Account from '../screens/Account'

export default function AccountStack() {
    return (
      <Stack.Navigator>
          <Stack.Screen
            name="account"
            component={Account}
            options={{title:"Cuenta"}}
          />
      </Stack.Navigator>
    )
}
