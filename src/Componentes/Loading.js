import React from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native'
import {Overlay} from 'react-native-elements'
import {Chase} from 'react-native-animated-spinkit'

export default function Loading(props) {
    const {isVisible, text}=props
    return (
        <Overlay
         isVisible={isVisible}
         overlayStyle={styles.overlay}
        >
           <View style={styles.view}>
               <Chase 
                 size={48}
                 color="#166cb3"
               />
               {text && <Text style={styles.text}>{text}</Text>}
           </View> 
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay:{
        backgroundColor:"rgba(0,0,0,0.6)",
        borderColor:"#166cb3",
        borderRadius:20,
        width:"90%",
        height:Dimensions.get("window").height/2
    },
    view:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        color:"#166cb3",
        marginTop:20,
        fontWeight:"bold",
        fontSize:24,
        textTransform:"uppercase",
        textAlign:"center"
    }
})