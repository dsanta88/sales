import React, {useEffect} from 'react'
import { StyleSheet } from 'react-native'
import {SearchBar} from 'react-native-elements'
import { Buscar } from '../Utils/Acciones'

export default function Busqueda(props) {

  const {setProductList,updateProducts,search,setSearch,setMensajes}=props;

  useEffect(() => {
     
    let result=[];
    if(search){
      (async()=>{
        result=await Buscar(search)
        setProductList(result)
        if(result.length===0){
          setMensajes("No se encontraro datos para la busqueda" + search)
        }
      })
      ()
    }
  }, [search])

    return (
      <SearchBar
        placeholder="¿Qu estas buscando?"
        containerStyle={{
          backgroundColor:"transparent",
          borderTopColor: "transparent",
          borderBottomColor:"transparent"
        }}
        inputContainerStyle={{
          backgroundColor:"#fff",
          alignItems:"center"
        }}
        inputStyle={{
          fontFamily:"Roboto",
          fontSize:20
        }}
        onChangeText={
           (text)=>{setSearch(text)
          }}
        value={search}
        onClear={()=>{
          setSearch("")
          setProductList([])
          updateProducts()
        }}
      />
    )
}

