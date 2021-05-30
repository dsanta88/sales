import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'


import SalesStack from './SalesStack'
import FavoritesStack from './FavoritesStack'
import TopSalesStack from './TopSalesStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'

const Tab=createBottomTabNavigator()

export default function Navigation() {
    return (
       <NavigationContainer>
         <Tab.Navigator>
            <Tab.Screen
               name="sales"
               component={SalesStack}
               options={{title:"Ofertas"}}
            />
              <Tab.Screen
               name="favorites"
               component={FavoritesStack}
               options={{title:"Favoritos"}}
            />
              <Tab.Screen
               name="top-sales"
               component={TopSalesStack}
               options={{title:"Top"}}
            />
              <Tab.Screen
               name="search"
               component={SearchStack}
               options={{title:"Buscar"}}
            />
              <Tab.Screen
               name="account"
               component={AccountStack}
               title="Cuenta"
               options={{title:"Cuenta"}}
            />
         </Tab.Navigator>
       </NavigationContainer>
    )
}
