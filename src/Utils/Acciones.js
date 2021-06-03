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
  firebase
  .auth()
  .signOut()
  .then(() => {
     return true
  }).catch((error) => {
     return false
  });
}

export const registrarUsuario=async(email,password)=>{
  const result={statusResponse:true, error:null}
  try{
    await 
    firebase
    .auth()
    .createUserWithEmailAndPassword(email,password)
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
    await 
    firebase
    .auth()
    .signInWithEmailAndPassword(email,password)
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


// export const autenticationWithPhone=async(numero,recaptcha)=>{
//   const result={statusResponse:true,verificationId:null, error:null}
//   try{

//     await 
//       firebase
//       .auth()
//       .reathenticateWithPhoneNumber(numero,recaptcha.current)
//       .then((response)=>{
//         verificationId=response.verificationId
//       })
//   }
//   catch(error){
//     result.statusResponse=false
//     result.error="Error al momento de verificar con número de téfono."
//   }

//   return result
// }


// export const confirmarCodigo=async(verificationId,codigo)=>{
//   const result={statusResponse:true, error:null}
//   try{
//     const credenciales= await firebase.auth().PhoneAuthProvider.credentia(verificationId,codigo)
    
//     await
//     firebase
//     .auth()
//     .currentUser.linkWithCredential(credenciales)
//     .catch((err)=>{
//         result.statusResponse=false
//         result.error=err
//     })
 
//   }
//   catch(error){
//     result.statusResponse=false
//     result.error="Error al momento de verificar con número de téfono."
//   }

//   return result
// }

