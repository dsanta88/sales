
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View ,LogBox} from 'react-native';
import Loading from './src/Componentes/Loading';
import RutasNoAutenticadas from './src/Navegacion/RutasNoAutenticadas'
import {isUserLogged} from './src/Utils/Acciones'
import SwitchNavigator from './src/Navegacion/SwitchNavigator'


export default function App() {

   const [user,setUser]=useState(false)
   const [loading, setLoading] = useState(false)

   useEffect(() => {
    setLoading(true)
    if(isUserLogged){
      setUser(true)
    }
    setLoading(false)
   },[])
   
   if(loading){
     return <Loading isVisible={loading} text="Cargando.."/>
   }

  return user ?  <SwitchNavigator/>:<RutasNoAutenticadas/>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});