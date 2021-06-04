import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, StatusBar,Alert } from "react-native";
import { Icon, Avatar, Input } from "react-native-elements";
import {loadImageFromGallery} from '../../Utils/Helpers'
import {uploadImage,updateProfile,addDocument, getUsuario} from '../../Utils/Acciones'
import uuid from "random-uuid-v4"
import Loading from '../../Componentes/Loading'
import InputEdit from '../../Componentes/InputEdit'

export default function Perfil(){
    const user = getUsuario()
    const [displayName,setDisplayName]=useState("")
    const [phoneNumber,setPhoneNumber]=useState("")
    const [email,setEmail]=useState("")

    const [editName,setEditName]=useState(false)
    const [editEmail,setEditEmail]=useState(false)
    const [editPhone,setEditPhone]=useState(false)

    useEffect(() => {
         const {displayName,phoneNumber,email}=user
         setDisplayName(displayName)
         setPhoneNumber(phoneNumber)
         setEmail(email)
    }, [])

    const onChangeInput=(input,valor)=>{
        
        switch(input){
             case"displayName":
                setDisplayName(valor)
                break
             case"phoneNumber":
                setPhoneNumber(valor)
                break
              case"email":
                 setEmail(valor)
                 break
        }
    }
   
    const getValor=(input,valor)=>{
        
        switch(input){
             case"displayName":
                return displayName
                break
             case"phoneNumber":
                 return phoneNumber
                break
              case"email":
                 return email
                 break
        }
    }

    return (
        <View>
            <StatusBar  backgroundColor="#166cb3"/>
            <Header/>
            <HeaderAvatar
              user={user}
            />
            <FormDatos 
             onChangeInput={onChangeInput}
             getValor={getValor}
             editName={editName}
             setEditName={setEditName}
             editEmail={editEmail}
             setEditEmail={setEditEmail}
             editPhone={editPhone}
             setEditPhone={setEditPhone}
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



function FormDatos(props){
 const {onChangeInput,getValor,editName,editEmail,editPhone,setEditName,setEditEmail,setEditPhone}=props
  return(
      <View>
       <InputEdit
         id="displayName"
         label="Nombre"
         getValor={getValor}
         placeholder="Nombre"
         onChangeInput={onChangeInput}
         editable={editName}
         setEditable={setEditName}
       />
      <InputEdit
         id="email"
         label="Email"
         getValor={getValor}
         placeholder="ejemplo@gmail.com"
         onChangeInput={onChangeInput}
         editable={editEmail}
         setEditable={setEditEmail}
       />
       <InputEdit
         id="phoneNumber"
         label="Teléfono"
         getValor={getValor}
         placeholder="+000000000"
         onChangeInput={onChangeInput}
         editable={editPhone}
         setEditable={setEditPhone}
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
        width:100,
        height:100
    }
})
