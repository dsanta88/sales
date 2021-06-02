import {firebaseApp} from './Firebase'
import * as firebase from 'firebase'

export const validarSesion=()=>{

  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      console.log("Logueado")
    }else{
       console.log("No logueado")
    }
})


}