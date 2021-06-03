import React,{useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import {Icon,Input,Button,Divider} from "react-native-elements"
import {useNavigation} from "@react-navigation/native"
import {validarEmail} from '../Utils/Helpers'
import {isEmpty} from 'lodash'

import Loading from '../Componentes/Loading.js'
import {login} from '../Utils/Acciones'



export default function LoginForm(props) {
   
    const {toastRef} =props;
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(true)
    const [loading, setLoading] = useState(false)
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")


    const navigation =useNavigation()
     
     const iniciarSesion=async()=>{
      if(!validarDatos()){
        return;
      }   
  
      setLoading(true)
      const result=await login(email,password)
      setLoading(false)
      if(!result.statusResponse){
         setErrorEmail(result.error)
         return
      }
       
      console.log("USUARIO LOGUEADO")
     }

    const validarDatos=()=>{
      setErrorEmail("")
      setErrorPassword("")
      let isValid=true
  
      if(!validarEmail(email)){
       setErrorEmail("Debes ingresar un email válido.")
        isValid=false
      }
  
      if(isEmpty(password))
      {
        setErrorPassword("Debes ingresar la contraseña.")
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
              keyboardType="email-address"
              errorMessage={errorEmail}
              defaultValue={email}
              leftIcon={{
                type:"material-community",
                name:"account-circle-outline",
                color:"#176bb4"
              }}
              onChangeText={(text)=>{
                setEmail(text)
              }}
              />
            <Input
              placeholder="Password"
              containerStyle={styles.input}
              errorMessage={errorPassword}
              leftIcon={{
                type:"material-community",
                name:"lock",
                color:"#176bb4"
               }}
               rightIcon={{
                 type:"material-community",
                 name: show ? "eye-off-outline":"eye-outline",
                color:"#176bb4",
                onPress:()=>setShow(!show)
              }}
              onChangeText={(text)=>{
                setPassword(text)
              }}
              secureTextEntry={show}
              value={password}
              />
            <Button  
              title="Ingresar"
               containerStyle={styles.btn}
               buttonStyle={{backgroundColor: "#176bb4"}}
               onPress={()=>iniciarSesion()}
              />
             <Text  style={styles.txtRegistro}> 
                No tienes cuenta? 
                <Text 
                 style={styles.txtCuenta}
                 onPress={()=>navigation.navigate("registro")}
                 >
                   Registro
             </Text>
            </Text>

            <Divider
               style={{
                   backgroundColor: "#156cb4",
                   height:1,
                   width:"90%",
                   marginTop:20
               }}
            />

            <Text style={styles.txto}>O</Text>
            <View style={styles.viewLogin}>
                <TouchableOpacity style={styles.btnLoginSocial}>
                  <Icon
                     size={24}
                     type="material-community"
                     name="google"
                     color="#fff"
                     backgroundColor= "transparent"
                    >
                  </Icon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnLoginSocial}>
                  <Icon
                     size={24}
                     type="material-community"
                     name="facebook"
                     color="#fff"
                     backgroundColor= "transparent"
                    >
                  </Icon>
                </TouchableOpacity>

            </View>
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
    },
    txtRegistro:{
      marginTop:20,
    },
    txtCuenta:{
      color:"#176bb4",
      fontFamily:"Roboto",
      fontSize:15
    },
    txto:{

      fontWeight:"bold",
      fontSize:20,
      marginTop:20,
      color:"#176bb4"
    },
    viewLogin:{
      flexDirection:"row",
      justifyContent:"space-around",
      width:"100%"
    },
    btnLoginSocial:{
      backgroundColor: "#176bb4",
      paddingHorizontal: 40,
      paddingVertical: 10,
      borderRadius:5
    }
})
