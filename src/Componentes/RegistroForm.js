import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Icon,Input,Button} from "react-native-elements"
import {useNavigation} from "@react-navigation/native"
import {validarEmail} from '../Utils/Helpers'
import {registrarUsuario} from '../Utils/Acciones'
import { size,isEmpty } from 'lodash'

import Loading from '../Componentes/Loading'


export default function RegistroForm(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repetirPassword, setRepetirPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showRepetirPassword, setRepetirShowPassword] = useState(false)
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation =useNavigation()


    const crearCuenta= async()=>{
      if(!validarDatos()){
        return;
      }
      
      setLoading(true)
      const result=await registrarUsuario(email,password)
      setLoading(false)
      if(!result.statusResponse){
         setErrorEmail(result.error)
         return
      }
 
      navigation.navigate("mi-tienda")
    }
 

    const validarDatos=()=>{
      setErrorEmail("")
      setErrorPassword("")
      setErrorConfirm("")
 
      let isValid=true
 
      if(!validarEmail(email)){
       setErrorEmail("Debes ingresar un email válido")
        isValid=false
      }
 
      else if(size(password)<6){
       setErrorPassword("Debes ingresar una contraseña de almenos 6 aracteres.")
       isValid=false
      }
      else if(isEmpty(password) && isEmpty(repetirPassword)){
        setErrorPassword("Ingresar contraseña")
        setErrorConfirm("Ingresar confirmación")
        isValid=false
      }
      else if(size(repetirPassword)<6){
       setErrorConfirm("Debes ingresar una confirmación de almenos 6 aracteres.")
       isValid=false
      }
 
      else if(password!==repetirPassword){
       setErrorPassword("La contraseña y la confirmación no son iguales")
       setErrorConfirm("La contraseña y la confirmación no son iguales")
       isValid=false
      }
      return isValid
    }


    return (
        <View style={styles.container}>
            <View style={styles.view}/>

            <Input 
              placeholder="Email"
              containerStyle={styles.input}
              leftIcon={{
                type:"material-community",
                name:"account-circle-outline",
                color:"#176bb4"
              }}
              onChangeText={(text)=>{
                setEmail(text)
              }}
              errorMessage={errorEmail}
              defaultValue={email}
              />
            <Input
              placeholder="Password"
              containerStyle={styles.input}
               leftIcon={{
                type:"material-community",
                name:"lock",
                color:"#176bb4"
               }}
               rightIcon={{
                type:"material-community",
                name: showPassword ? "eye-off-outline":"eye-outline",
                color:"#176bb4",
                onPress:()=>setShowPassword(!showPassword)
              }}
              onChangeText={(text)=>{
                setPassword(text)
              }}
              secureTextEntry={!showPassword}
              value={password}
              errorMessage={errorPassword}
              defaultValue={password}
            />

            <Input
              placeholder="Repetir password"
              containerStyle={styles.input}
               leftIcon={{
                type:"material-community",
                name:"lock",
                color:"#176bb4"
               }}
               rightIcon={{
                type:"material-community",
                name: showRepetirPassword ? "eye-off-outline":"eye-outline",
                color:"#176bb4",
                onPress:()=>setRepetirShowPassword(!showRepetirPassword)
              }}
              onChangeText={(text)=>{
                setRepetirPassword(text)
              }}
              secureTextEntry={!showRepetirPassword}
              value={repetirPassword}
              errorMessage={errorConfirm}
              defaultValue={repetirPassword}
            />

            <Button  
              title="Crear cuenta"
               containerStyle={styles.btn}
               buttonStyle={{backgroundColor: "#176bb4"}}
               onPress={()=>crearCuenta()}
              />

             <Button  
               title="Iniciar sesión"
               containerStyle={styles.btn}
               buttonStyle={{backgroundColor: "#a0b07b"}}
               onPress={()=>navigation.goBack()}
              />

              <Loading isVisible={loading} text="Favor espere"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#f5f6f8",
        flex:1,
        marginTop:20,
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        alignItems:"center",
        paddingTop:20
    },
    view:{
        borderBottomColor:"#25d366",
        borderBottomWidth:2,
        width:100
    },
    input:{
        width:"90%",
        marginTop:20,
        height:50
    },
    btn:{
        width:"90%",
        marginTop:20
    }
})
