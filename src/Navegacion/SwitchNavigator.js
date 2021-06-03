import React,{useState,useEffect} from 'react'
import Loading from '../Componentes/Loading'
import RutasAutenticadas from './RutasAutenticadas'
import CuentaStack from './CuentaStack'
import {validarPhone} from '../Utils/Acciones'


export default function SwitchNavigator(){
 const [phoneAuth, setPhoneAuth] = useState(false)
 const [loading, setLoading] = useState(true) 

  useEffect(() => {
   validarPhone(setPhoneAuth)
    setTimeout(()=>{
        setLoading(false)
    },5000)
  }, [])
 
 if(loading){
    return <Loading  isVisible={loading} text="Cargando configuracion"/>
 }else{
     return phoneAuth ? <RutasAutenticadas/> : <CuentaStack/>
 }
}
