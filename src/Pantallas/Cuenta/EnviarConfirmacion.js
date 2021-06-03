import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useRef} from 'react'
import { StyleSheet, Text, View,TextInput,Image } from 'react-native'
import {Button,Icon} from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import {useNavigation} from '@react-navigation/native'
import {isEmpty} from 'lodash'

export default function EnviarConfirmacion() {
    
  const [country, setCountry] = useState("CO")
  const [callingCode, setCallingCode] = useState("57")
  const [phone, setPhone] = useState("")

    return (
        <View>
            <Text>EnviarConfirmacion</Text>
        <View style={styles.container}>
             <Image
              source={require("../../../assets/logo.jpg")}
              style={styles.imglogo}
        />
        <View style={styles.panel}>
           <View 
            style={{
                borderBottomColor:"#176bb4",
                borderBottomWidth:2,
                width:"80%"
            }}
            />
            <View style={styles.panelInterno}>
              <Icon 
                 name="whatsapp"
                 type="material-community"
                 size={100}
                 color= "#3eb64a"
               />
              <Text style={styles.titulo}>Ingrese número de whatpsapp</Text>
              <View style={styles.viewTelefono}>
                  <CountryPicker
                     withFlag
                     withCallingCode
                     withFilter
                     withCallingCodeButton
                     countryCode={country}
                     onSelect={(country)=>{
                         setCountry(country.cca2)
                         setCallingCode(...country.callingCode)
                     }}
                  />

                  <Text style={{color:"#fff"}}> | </Text>
                  <TextInput
                   placeholder="Número whatsapp"
                   style={styles.input}
                   placeholderTextColor="#fff"
                   onChangeText={(text)=>setPhone(text)}
                   value={phone}
                  />
              </View>
              <Button
               title="Confirmar número"
               buttonStyle={{backgroundColor:"#1c5c97", marginHorizontal:20}}
               containerStyle={{marginVertical:20}}
              />
            </View>
        </View>
     </View>
   </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#176bb4",
      },
    imglogo:{
        width:240,
        height:110,
        marginVertical:40,
        alignSelf:"center" ,
     },
     panel:{
        flex:1,
        backgroundColor: "#fff",
        paddingTop:20,
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        alignItems:"center"
     },
     panelInterno:{
         flex:1,
         justifyContent:"space-around",
         marginHorizontal:20
     },
     titulo:{
         fontSize:16,
         textAlign:"center",
         color: "#479b67",
         fontWeight:"bold" 
     },
     viewTelefono:{
         flexDirection:"row",
         alignItems:"center",
         borderRadius:10,
         height:50,
         marginHorizontal:20,
         paddingHorizontal: 20,
         backgroundColor:"#1c5c97"
     },
     input:{
         width:"80%",
         height:50,
         marginLeft:5,
     },
})