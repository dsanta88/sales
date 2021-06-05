import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,Image,FlatList } from 'react-native'
import {Icon} from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'

export default function MiTienda() {
    const navigation=useNavigation()
    return (
        <View style={styles.view}> 
            <Text>MiTienda</Text>
            <Icon
              name="plus"
              type="material-community"
              color="#176bb4"
              containerStyle={styles.btnContainer}
              onPress={()=>{
                  navigation.navigate("add-producto")
                }}
              reverse
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
       flex:1,
       justifyContent:"center"
    },
    btnContainer:{
        position:"absolute",
        bottom:10,
        right:10,
        shadowColor:"#fa9f1c",
        shadowOffset:{width:2,height:2},
        shadowOpacity:0.2
    }
})
