import {firebaseApp} from './Firebase'
import * as firebase from 'firebase'


const db= firebase.firestore(firebaseApp)

export const  isUserLogged=()=>{
    let isLogged=false
    firebaseApp.auth().onAuthStateChanged((user)=>{
      user!==null && (isLogged=true)
    }) 
    return isLogged
}

export const getCurrentUser= ()=>{
  return firebase.auth().currentUser
}

export const cerrarSesion=()=>{
  firebase.auth().signOut().then(() => {
     return true
  }).catch((error) => {
     return false
  });
}

export const registrarUsuario=async(email,password)=>{
  const result={statusResponse:true, error:null}
  try{
    await firebase.auth().createUserWithEmailAndPassword(email,password)
  }
  catch(error){
    result.statusResponse=false
   result.error="Este correo ya ha sido registrado."
  }

  return result
}

export const login=async(email,password)=>{
  const result={statusResponse:true, error:null}
  try{
    await firebase.auth().signInWithEmailAndPassword(email,password)
  }
  catch(error){
    result.statusResponse=false
   result.error="Usuario o contraseña no validos."
  }
  return result
}



export const  validarPhone=(setPhoneAut)=>{
  firebaseApp
  .auth()
  .onAuthStateChanged((user)=>{
    if(user.phoneNumber){
      setPhoneAut(true)
    }
  }) 

}




