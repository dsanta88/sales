import React,{useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import {Icon,Input,Button,Divider} from "react-native-elements"
import {useNavigation} from "@react-navigation/native"
import {validarEmail} from '../Utils/Utils'
import {isEmpty} from 'lodash'
import {validarSesion} from '../Utils/Acciones'

export default function LoginForm(props) {
    
    const {toastRef} =props;
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    validarSesion()

    
     const iniciarSesion=()=>{
       if(isEmpty(email) && isEmpty(password)){
          toastRef.current.show("Debe ingresar el email y el password.")
       }
       else if(!validarEmail(email)){
        toastRef.current.show("Debe ingresar un email valido.")
       }
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
                name:"eye-outline",
                color:"#176bb4"
              }}
              onChangeText={(text)=>{
                setPassword(text)
              }}
              />
            <Button  
              title="Ingresar"
               containerStyle={styles.btn}
               buttonStyle={{backgroundColor: "#176bb4"}}
               onPress={()=>iniciarSesion()}
              />
            <Text  style={styles.txtRegistro}> 
                No tienes cuenta? <Text style={styles.txtCuenta}>Registro</Text>
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
