import React,{useState} from 'react'
import { Icon,Button } from 'react-native-elements'
import { StyleSheet, Text, View ,Image,Alert} from 'react-native'
import CodeInput from 'react-native-code-input'
import Loading from '../../Componentes/Loading'
import {useNavigation} from '@react-navigation/native'
import {verificarCodigo,getToken,getUsuario,addDocument} from '../../Utils/Acciones'
import {encode,decode} from 'base-64'


if(!global.btoa){
  global.btoa=encode
}


if(!global.atob){
  global.atob=decode
}


export default function ConfirmarNumero(props) {

     const {route}=props
     const {verificationId}=route.params
     const [loading, setLoading] = useState(false)

     const verificarCodigoSms=async(code)=>{
          setLoading(true)
          const result =await verificarCodigo(verificationId,code)
          console.log(result)
          if(result.statusResponse){
            const token= await getToken() 
            
            const {uid, displayName, photoURL, email,phoneNumber}=getUsuario()

            const registro= await addDocument("usuarios",uid,{
              token,
              displayName,
              photoURL,
              email,
              phoneNumber,
              dateRegister: new Date()
            })  
            setLoading(false)   
          }
          else{
            Alert.alert("Error","Favor válidar el código ingreado",[{
               style:"default",
               text:"Entendido",
            }])
            setLoading(false)
          }
         
          
     }


    return (
      <View style={styles.container}>
           <Image
              source={require("../../../assets/logo.jpg")}
              style={styles.imglogo}
            />
            <Text style={styles.titulo}>Favor revise su SMS e introduzca los codigos de confimarción</Text>
            <CodeInput
              activeColor="#fff"
              inactiveColor="#fff"
              autoFocus={true}
              inputPosition="center"
              size={50}
              codeLength={6}
              containerStyle={{marginTop:30}}
              codeInputStyle={{borderWidth:1.5}}
              onFulfill={(code)=>verificarCodigoSms(code)}
              secureTextEntry
            />
            <Loading isVisible={loading} text="Por favor espere"/>
      </View>
    )
}


const styles = StyleSheet.create({
   container:{
       flex:1,
       justifyContent:"center",
       alignItems:"center",
       backgroundColor:"#166cb3",
       paddingHorizontal: 20
   },
   imglogo:{
    width:240,
    height:110,
    marginVertical:40,
    alignSelf:"center" ,
    marginTop:20
   },
   titulo:{
    fontSize:20,
    textAlign:"center",
    color: "#fff",
    fontWeight:"bold" ,
    marginVertical:20
   }
})