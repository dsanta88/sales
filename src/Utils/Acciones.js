import {firebaseApp} from './Firebase'
import * as firebase from 'firebase'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import {Platform} from 'react-native'
import "firebase/firestore"
import { fileToBlob } from './Helpers'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { cos } from 'react-native-reanimated'
import { FireSQL } from 'firesql'


const db= firebase.firestore(firebaseApp)
const fireSQL=new FireSQL(firebase.firestore(),{includeId:"id"});

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


export const getCurrentUser= ()=>{
  return firebase.auth().currentUser
}

export const getUsuario=()=>{
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
      //.currentUser.reauthenticateWithPhoneNumber(numero,recaptcha.current)
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



  export const addDocument=async(collection,doc,data)=>{
    const result={statusResponse:true, error:null, data:null }
  
    try{
       await 
          db.collection(collection)
          .doc(doc)
          .set(data,{merge:true})
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



export const updateProfile=async(data)=>{
  const result={statusResponse:true, error:null }

  try{
     await 
     firebase
     .auth().currentUser
     .updateProfile(data)
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


export const reautenticar=async(verificationId,code)=>{
  const result={statusResponse:true, error:null }
  try{
 
  const credenciales = new firebase.auth.PhoneAuthProvider.credential( verificationId,code)

  await firebase
    .auth()
    .currentUser.reauthenticateWithCredential(credenciales)
    .catch((ex) => {
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


export const updateEmailFirebase=async(email)=>{
  const result={statusResponse:true, error:null }
  try{

  await firebase
    .auth()
    .currentUser.updateEmail(email)
    .catch((ex) => {
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



export const updatePhoneNumber=async(verificationId,code)=>{
  const result={statusResponse:true, error:null }
  try{

    const credenciales = new firebase.auth.PhoneAuthProvider.credential(verificationId,code)

    await firebase
      .auth()
      .currentUser.updatePhoneNumber(credenciales)
      .catch((ex) => {
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



export const addRegistro=async(colecion,data)=>{
  const result={statusResponse:true, error:null }
  
  try{
    await db
     .collection(colecion)
     .add(data)
     .catch((ex) => {
      result.statusResponse=false
      result.error=ex
     });

  }
  catch(ex){
    result.statusResponse=false
    result.error=ex
  }
  return result
}


export const getListMyProductos=async ()=>{
  const result={statusResponse:true, error:null, data:[] }
  let productos=[]
  try{
    await db
     .collection("productos")
     .where("usuario","==",getUsuario().uid)
     .where("status","==",1)
     .get()
     .then((response)=>{
       response.forEach((doc)=>{
          const producto=doc.data()
          producto.id=doc.id
          productos.push(producto)
       })

       result.data=productos
     })
     .catch((ex) => {
      result.statusResponse=false
      result.error=ex
     });

  }
  catch(ex){
    result.statusResponse=false
    result.error=ex
  }
  return result
}


export const updateRegistro=async(colleccion,documento,data)=>{

  const result={statusResponse:true, error:null }
  try{
    await db
     .collection(colleccion)
     .doc(documento)
     .update(data)
     .catch((ex) => {
      result.statusResponse=false
      result.error=ex
     });

  }
  catch(ex){
    result.statusResponse=false
    result.error=ex
  }
return result
}

export const deleteRegistro=async(colleccion,documento)=>{
  const result={statusResponse:true, error:null }

  try{
    await db
     .collection(colleccion)
     .doc(documento)
     .delete()
     .catch((ex) => {
      result.statusResponse=false
      result.error=ex
     });

  }
  catch(ex){
    result.statusResponse=false
    result.error=ex
  }
  
return result
}

export const getRegistroXid=async (collecion,documento)=>{
  const result={statusResponse:true, error:null, data:[] }

  try{
    await db
     .collection(collecion)
     .doc(documento)
     .get()
     .then((response) => {
      const producto = response.data();
      producto.id = response.id;

      result.data = producto;
    })
     .catch((ex) => {
      result.statusResponse=false
      result.error=ex
     });

  }
  catch(ex){
    result.statusResponse=false
    result.error=ex
  }

  return result
}


export const listProducts=async()=>{

  const productList = [];
  let index = 0;
  
  await db
  .collection("productos")
  .where("usuario", "==", getUsuario().uid)
  .where("status", "==", 1)
  .get()
  .then(response =>{

      response.forEach((doc)=>{
      const product=doc.data();
      product.id=doc.id;
      productList.push(product);
      
    })
  })
  .catch((err)=>console.log(err))

  for (const registro of productList) {
    const usuario = await getRegistroXid("usuarios", registro.usuario);
    productList[index].usuario = usuario.data;
    index++;
  }


  return productList;

}


export const listProductsXcategoria=async(categoria)=>{

  const productList = [];
  let index = 0;
  
  await db
  .collection("productos")
  .where("usuario", "==", getUsuario().uid)
  .where("categoria", "==", categoria)
  .get()
  .then(response =>{

      response.forEach((doc)=>{
      const product=doc.data();
      product.id=doc.id;
      productList.push(product);
      
    })
  })
  .catch((err)=>console.log(err))

  for (const registro of productList) {
    const usuario = await getRegistroXid("usuarios", registro.usuario);
    productList[index].usuario = usuario.data;
    index++;
  }

  return productList;

}




export const Buscar = async (search) => {
  let productos = [];

  await fireSQL
    .query(`SELECT * FROM productos WHERE titulo LIKE '${search}%' `)
    .then((response) => {
      productos = response;
    });

  return productos;
};

// export const iniciarnotificaciones = (
//   notificationListener,
//   responseListener
// ) => {
//   notificationListener.current = Notifications.addNotificationReceivedListener(
//     (notification) => {
//       console.log(notification);
//     }
//   );

//   responseListener.current = Notifications.addNotificationResponseReceivedListener(
//     (response) => {
//       console.log(response);
//     }
//   );

//   return () => {
//     Notifications.removeNotificationSubscription(notificationListener);
//     Notifications.removeNotificationSubscription(responseListener);
//   };
// };

// export const sendPushNotification = async (mensaje) => {
//   let respuesta = false;
//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Accept-encoding": "gzip, deflate",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(mensaje),
//   }).then((response) => {
//     respuesta = true;
//   });

//   return respuesta;
// };

// export const setMensajeNotificacion = (token, titulo, body, data) => {
//   const message = {
//     to: token,
//     sound: "default",
//     title: titulo,
//     body: body,
//     data: data,
//   };

//   return message;
// };

// export const ListarNotificaciones = async () => {
//   let respuesta = { statusresponse: false, data: [] };

//   let index = 0;

//   await db
//     .collection("Notificaciones")
//     .where("receiver", "==", ObtenerUsuario().uid)
//     .where("visto", "==", 0)
//     .get()
//     .then((response) => {
//       let datos;

//       response.forEach((doc) => {
//         datos = doc.data();
//         datos.id = doc.id;
//         respuesta.data.push(datos);
//       });
//       respuesta.statusresponse = true;
//     });

//   for (const notificacion of respuesta.data) {
//     const usuario = await obternerRegistroxID("Usuarios", notificacion.sender);
//     respuesta.data[index].sender = usuario.data;
//     index++;
//   }

//   return respuesta;
// };





