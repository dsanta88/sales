import React from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native'


export default function InputEdit(props) {

    const {id,label,getValor,placeholder,onChangeInput }=props

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.row}>
                <TextInput
                   key={id}
                   placeholder={placeholder}
                   value={getValor(id)}
                   onChangeText={(text)=>{
                       onChangeInput(id,text)
                   }}
                   style={styles.textInput}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingBottom: 10
    },
    label:{
        fontWeight:"bold",
        marginBottom:10,
        color:"#166cb3",
        fontSize:16
    },
    textInput:{
        fontSize:20,
        width:"80%"
    },
    container:{
        borderBottomColor:"#166cb3",
        borderBottomWidth:1,
        width:"90%",
        marginBottom:10,
        paddingHorizontal:10
    }
})
