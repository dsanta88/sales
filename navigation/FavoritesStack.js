import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'

const Stack=createStackNavigator()

import Favorites from '../screens/Favorites'

export default function FavoritesStack() {
    return (
      <Stack.Navigator>
          <Stack.Screen
            name="favorites"
            component={Favorites}
            options={{title:"Favoritos"}}
          />
      </Stack.Navigator>
    )
}
