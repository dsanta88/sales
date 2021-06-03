import {firebaseApp} from './Firebase'
import * as firebase from 'firebase'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {Platform} from 'react-native';
import "firebase/firestore"
import { fileToBlob } from './Helpers'

const db= firebase.firestore(firebaseApp)

Notifications.setNotificationHandler({
  handleNotification: async()=>({
    shouldShowAlert:true,
    shouldPlaySound:false,
    shouldSetBadge:false
  })
})


export const validarSesion = (setUser) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(true);
    } else {
      setUser(false);
    }
  });
};



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

  try{
     db.collection("usuarios")
     .doc(getUsuario().uid)
     .onSnapshot((snapshot)=>{
         setPhoneAut(snapshot.exists)
     })
  }
  catch(error){

  }
}


export const autenticationWithPhone=async(numero,recaptcha)=>{
  const result={statusResponse:true,verificationId:null, error:null}
  try{
    

    
    await 
      firebase
      .auth()
      .signInWithPhoneNumber(numero,recaptcha.current)
      .then((response)=>{
        result.verificationId=response.verificationId
      })
      .catch((ex)=>{
         result.error=ex
      })
  }
  catch(error){
    result.statusResponse=false
    result.error=error
  }
  return result
}


export const verificarCodigo=async(verificationId,codigo)=>{


  const result={statusResponse:true, error:null}
  try{
    const credenciales = firebase.auth.PhoneAuthProvider.credential( verificationId,codigo);
    
    await firebase
    .auth()
    .currentUser.linkWithCredential(credenciales)
    .then((response) => (result.statusResponse = true))
    .catch((ex)=>{
        result.statusResponse=false
        result.error=ex
    })
 
  }
  catch(ex){
    result.statusResponse=false
    result.error=ex
  }
  
  return result
}

export const getToken = async () => {

  let token=""

  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
       alert('Must use physical device for Push Notifications');
    }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token
  };


  export const getUsuario=()=>{
    return firebase.auth().currentUser
  }

  export const addDocument=async(collection,doc,data)=>{
    const result={statusResponse:true, error:null, data:null }
  
    try{
       await 
          db.collection(collection)
          .doc(doc)
          .set(data)
          .catch((ex)=>{
            result.error=ex
          })
    }
    catch(ex){
      result.error=ex
    }
  
    return result
  }


  
export const uploadImage=async(image,path,name)=>{

  const result={statusResponse:false, error:null, url:null}
  const ref=firebase.storage().ref(path).child(name)
  const blob=await fileToBlob(image)
  
  try{
   await ref.put(blob)
   const url=await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
   result.statusResponse=true
   result.url=url
  }
  catch(error){
    result.error=error
  }
  return result
}