import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, StatusBar,Alert } from "react-native";
import { Icon, Avatar, Input } from "react-native-elements";
import {loadImageFromGallery} from '../../Utils/Helpers'
import {uploadImage,updateProfile,addDocument, getUsuario} from '../../Utils/Acciones'
import uuid from "random-uuid-v4"
import Loading from '../../Componentes/Loading'

export default function Perfil(){
    const user = getUsuario()

    return (
        <View>
            <StatusBar  backgroundColor="#166cb3"/>
            <Header/>
            <HeaderAvatar
              user={user}
            />
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

function HeaderAvatar(props){
    const {user}=props
    const {uid}=user
    const [photoUrl, setPhotoUrl]= useState(user.photoURL)  
    const [loading, setLoading] = useState(false)

    const changePhoto = async() => {
        setLoading(true)
        const result=await loadImageFromGallery([1,1]) 
        if(!result.status){
           return
        } 
         const resultUploadImage=await uploadImage(result.image,"avatars", uid)

         if(!resultUploadImage.statusResponse){
            Alert.alert("Ha ocurrido un error cargando la imagen de perfil.")
            return
         }

         const resultUpdateProfile=await updateProfile({photoURL:resultUploadImage.url})
         if(resultUpdateProfile.statusResponse){
             setPhotoUrl(resultUploadImage.url)
             const resultMerge= await addDocument("usuarios",uid,{photoURL:resultUploadImage.url})
          }
          else{
              Alert.alert("Ha ocurrido un error al actualizar la foto de perfil.")
          }

          setLoading(false)
      }


  return(
      <View style={styles.avatarLine}>
          <Avatar
            source={
                photoUrl
                ? 
                {uri:photoUrl}
                : require("../../../assets/avatar.jpg")
            }
            style={styles.avatar}
            size="large"
            rounded
            showAccessory={true}
            onPress={changePhoto}
          />
         <Loading isVisible={loading} text="Por favor espere"/>
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
        width:100,
        height:100
    }
})
