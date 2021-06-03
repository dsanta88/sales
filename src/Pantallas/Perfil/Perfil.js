import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, StatusBar,Alert } from "react-native";
import { Icon, Avatar, Input } from "react-native-elements";
import {loadImageFromGallery} from '../../Utils/Helpers'
import {uploadImage} from '../../Utils/Acciones'

export default function Perfil(){

    return (
        <View>
            <StatusBar  backgroundColor="#166cb3"/>
            <Header/>
            <HeaderAvatar/>
        </View>
    )
}

function Header(){
      return (
          <View>
              <View style={styles.bg}>
                 <Text style={styles.textNombre}>
                     Nombre
                 </Text>
              </View>
          </View>
      )
}

function HeaderAvatar(){


    const changePhoto = async() => {
        const result=await loadImageFromGallery([1,1]) 
        
        if(!result.status){
           return
         }
    
         const resultUploadImage=await uploadImage(result.image,"avatars", "123test")

         if(!resultUploadImage.statusResponse){
            Alert.alert("Ha ocurrido un error cargando la imagen de perfil.")
            return
         }
      }


  return(
      <View style={styles.avatarLine}>
          <Avatar
            source={require('../../../assets/avatar.jpg')}
            style={styles.avatar}
            size="large"
            rounded
            showAccessory={true}
            onPress={changePhoto}
          />
      </View>
  )
}



const styles = StyleSheet.create({
    bg:{
        width:"100%",
        height:200,
        borderBottomLeftRadius:200,
        borderBottomRightRadius:200,
        backgroundColor:"#166cb3",
        justifyContent:"center",
        alignItems:"center"
    },
    textNombre:{
        color:"#fff",
        fontSize:18,
        fontWeight:"bold"
    },
    avatarLine:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:-70
    },
    avatar:{
        width:80,
        height:80
    }
})
