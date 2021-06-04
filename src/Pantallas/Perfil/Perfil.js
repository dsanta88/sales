import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, StatusBar,Alert } from "react-native";
import { Icon, Avatar, Input } from "react-native-elements";
import {loadImageFromGallery} from '../../Utils/Helpers'
import {uploadImage,updateProfile,addDocument, getUsuario,autenticationWithPhone, reautenticar, verificarCodigo,updateEmailFirebase,updatePhoneNumber} from '../../Utils/Acciones'
import {validarEmail} from '../../Utils/Helpers'
import Loading from '../../Componentes/Loading'
import InputEdit from '../../Componentes/InputEdit'
import Modal from '../../Componentes/Modal'
import CodeInput from "react-native-code-input";
import FirebaseRecaptcha from '../../Utils/FirebaseRecaptcha'


export default function Perfil(){
    const user = getUsuario()
    const [displayName,setDisplayName]=useState("")
    const [phoneNumber,setPhoneNumber]=useState("")
    const [email,setEmail]=useState("")

    const [editName,setEditName]=useState(false)
    const [editEmail,setEditEmail]=useState(false)
    const [editPhone,setEditPhone]=useState(false)

     const [verificationId, setVerificationId] = useState("")
     const [isVisible, setIsVisible] = useState(false)
     const [loading, setLoading] = useState(false)
     const [updatePhone, setUpdatephone] = useState(false)

     const recaptcha=useRef()

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


    const updateData= async (input,valor)=>{
          
        switch(input){
            case"displayName":
               updateProfile({displayName:valor})
               addDocument("usuarios",user.uid,{displayName:valor})
               console.log("USUARIO",user)
               break
            case"email":
                if(valor!=user.email){
                    if(validarEmail(valor)){
                        const result=await autenticationWithPhone(phoneNumber,recaptcha)
                        if(result.statusResponse){
                            setVerificationId(result.verificationId)
                            setIsVisible(true)
                        }
                        else
                        {
                            Alert.alert("Ha ocurrido un error en la autenticación.")
                            setEmail(user.email)
                        }
                    }
                }
            break
            case"phoneNumber":
            if(valor!=user.phoneNumber){
                    const result=await autenticationWithPhone(phoneNumber,recaptcha)
                    if(result.statusResponse){
                        setVerificationId(result.verificationId)
                        setUpdatephone(true)
                        setIsVisible(true)
                    }
                    else
                    {
                        Alert.alert("Ha ocurrido un error en la verificación.")
                        setEmail(user.email)
                    }
            }
               break
            
       }
    }

    const verificarCodigo= async(verificationId,code)=>{
      setLoading(true)
      if(updatePhone){
          const resultUpdPhone=await updatePhoneNumber(verificationId,code)
          const resultUpdDocumen=await addDocument("usuarios",user.uid,{phoneNumber:phoneNumber})
          setUpdatephone(false)
          console.log("resultUpdPhone",resultUpdPhone)
          console.log("resultUpdDocumen",resultUpdDocumen)
      }
      else
      {
        const result=await reautenticar(verificationId,code)
 
        if(result.statusResponse){
            const resultUpdEmail=await updateEmailFirebase(email)
            const updateProfile=await  addDocument("usuarios",user.uid,{email:email})
            setLoading(false)
            setIsVisible(false)
  
        }else{
          Alert.alert("Ha ocurrido un error al actualizar el correo")  
        }
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
             updateData={updateData}
            />

            <ModalVerification
              isVisibleModal={isVisible}
              setIsVisibleModal={setIsVisible}
             verificationId={verificationId}
             verificarCodigo={verificarCodigo}
           />
           <FirebaseRecaptcha referencia={recaptcha}/>
         <Loading isVisible={loading} text="Favor espere" /> 
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
 const {onChangeInput,getValor,editName,editEmail,editPhone,setEditName,setEditEmail,setEditPhone,updateData}=props
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
         updateData={updateData}
       />
      <InputEdit
         id="email"
         label="Email"
         getValor={getValor}
         placeholder="ejemplo@gmail.com"
         onChangeInput={onChangeInput}
         editable={editEmail}
         setEditable={setEditEmail}
         updateData={updateData}
       />
       <InputEdit
         id="phoneNumber"
         label="Teléfono"
         getValor={getValor}
         placeholder="+000000000"
         onChangeInput={onChangeInput}
         editable={editPhone}
         setEditable={setEditPhone}
         updateData={updateData}
       />
      </View>
  )
}

 function ModalVerification(props){
   const {isVisibleModal,setIsVisibleModal,verificationId,verificarCodigo}=props
  
   return(
    <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
       <View style={styles.confirmacion}>
            <Text style={styles.titleModal}>Confirmar código</Text>
           <Text style={styles.detalle}>Se ha enviado un código de confirmación a su número de tel'efono</Text>
          
           <CodeInput
            secureTextEntry
            activeColor="#166cb3"
            inactiveColor="#166cb3"
            autoFocus={false}
            inputPosition="center"
            size={40}
            containerStyle={{ marginTop: 30 }}
            codeInputStyle={{ borderWidth: 1.5 }}
            codeLength={6}
            onFulfill={(code)=>{
                verificarCodigo(verificationId,code)
            }}
           />
       </View>
   </Modal>
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
    },
    confirmacion:{
        height:200,
        width:"100%",
        alignItems:"center"
    },
    titleModal:{
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 20,
    },
    detalle:{
        marginTop: 20,
        fontSize: 14,
        textAlign: "center",
    }
})
