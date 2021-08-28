import React,{useEffect,useState} from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    StatusBar,
    FlatList,
    Dimensions,
    TouchableOpacity 
} from 'react-native'

import {Icon,Avatar,Image,Rating,Badge} from 'react-native-elements'
import {useNavigation,useFocusEffect} from '@react-navigation/native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {size} from  'lodash'
import {listProducts, getUsuario} from '../../Utils/Acciones'
import Busqueda from '../../Componentes/Busqueda'


export default function Tienda() {

    const navigation=useNavigation();
    const [productList, setProductList] = useState([])
    const [search, setSearch] = useState("")
    const [mensajes, setMensajes] = useState("Cargando...")
    const [notificaciones, setNotificaciones] = useState(0)
    const {photoURL}=getUsuario()
    
    useEffect(() => {
      (async()=>{
        console.log("ENTRO EN 1")
        setProductList=await listProducts();
      })()
    }, [])
    
    
    return (
        <View style={styles.frame}>
            <StatusBar backgroundColor="#128c7e"/>
            <View style={styles.header}>
                <KeyboardAwareScrollView>
                  <View style={styles.menu}>
                    <Avatar
                     rounded
                     size="medium"
                     source={
                         photoURL ? {uri:photoURL}
                        :require("../../../assets/avatar.jpg")
                    }
                    /> 
                    <Image
                     source={require("../../../assets/logo.jpg")}
                     style={styles.logo}
                     
                    />

                   <View>
                     <Icon
                       type="material-community"
                       name="bell-outline"
                       color="#fff"
                       size={30}
                     />
                     <Badge
                      status="error"
                      containerStyle={{position:"absolute", top:-4, right:-4}}
                      value={2}
                     />
                   </View>
                  </View>
                  <Busqueda/>
                </KeyboardAwareScrollView>
            </View>
           
           {size(productList)>0 ? 
           (
             <FlatList
             data={productList}
             renderItem={(prod)=>(
               <Producto
                producto={prod}
               />
             )}
             keyExtractor={(item,index)=>index.toString()}
             />
           )
           :
           (
             <Text>{mensajes}</Text>
           )
          }
        </View>
    )
}


function Producto(props){
  const {producto,navigation}=props
  
  const {
    titulo,
    descripcion,
    precio,
    imagenes,
    rating,
    id, 
    usuarioId
  }=producto.item;

  return (
  <TouchableOpacity style={styles.card}
   onPress={()=>{
     navigation.navigate("detalle",{id,titulo})
    }}
  >
  <Image
   source={{uri:imagenes[0]}}
   style={styles.imgProducto}
  />
  <View style={styles.infobox}>
   <Text style={styles.titulo}>{titulo}</Text>
   <Text>{descripcion.substring(0,50)}</Text>
  </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
   frame:{
       flex:1,
       backgroundColor:"#fff"
   },
   header:{
     height:"20%",
     width:"100%",
     backgroundColor:"#128c7e"  
   },
   menu:{
    marginTop:20,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center"
   },
   logo:{
     width:50,
     height:50
   },
   card:{
     width:"100%",
     paddingVertical:20,
     flex:1,
     paddingHorizontal:10,
     marginHorizontal:5,
     borderBottomColor:"#128c7e",
     borderBottomWidth:1,
     alignItems:"center",
     justifyContent:"center",
     flexDirection:"row"
   },
   imgProducto:{
     width:120,
     height:200,
     borderRadius: 10
   },
   infobox:{
     paddingLeft:10,
     alignItems:"center",
     flex:1
   },
   titulo:{
     marginTop:10,
     fontSize:18,
     fontWeight:"700",
     textAlign:"center",
     color:"#075e54"
   }
})
