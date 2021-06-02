import React,{useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LoginForm from '../../Componentes/LoginForm'
import Toast from 'react-native-easy-toast'
import { StatusBar } from 'react-native'
import { Image } from 'react-native'
import {useNavigation} from '@react-navigation/native'

export default function Login() {

   const toastRef=useRef()


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#176bb4"/>
            <Image
              source={require("../../../assets/logo.jpg")}
              style={styles.imglogo}
            />
            <Text style={styles.textobaner}>!Bienvenido</Text>
            <LoginForm  toastRef={toastRef}/>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor: "#176bb4"
    },
    imglogo:{
       width:240,
       height:110,
       marginTop:40,
       alignSelf:"center" 
    },
    textobaner:{
        fontFamily:"Roboto",
        fontWeight:"bold",
        fontSize:30,
        color:"#fff",
        alignSelf:"center"
    }
})
