import React,{useState,useEffect,useRef} from 'react';
import { StyleSheet,LogBox} from 'react-native';
import Loading from './src/Componentes/Loading';
import RutasNoAutenticadas from './src/Navegacion/RutasNoAutenticadas'
import {validarSesion,iniciarNotificaciones} from './src/Utils/Acciones'
import SwitchNavigator from './src/Navegacion/SwitchNavigator'


LogBox.ignoreAllLogs()

export default function App() {

   const [user,setUser]=useState(false)
   const [loading, setLoading] = useState(false)
   const notificationListener = useRef()
   const responseListener = useRef()


   useEffect(() => {
     setLoading(true)
     validarSesion(setUser);
     iniciarNotificaciones(notificationListener,responseListener)
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