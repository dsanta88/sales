import React,{useState,useRef,useEffect} from 'react'
import { StyleSheet, Text, View,Alert,TouchableOpacity,ScrollView } from 'react-native'
import {Input, Button,Icon,Avatar,AirbnbRating} from 'react-native-elements'
import {map,size,filter,isEmpty} from 'lodash'
import {useNavigation} from '@react-navigation/native'
import Loading from '../../Componentes/Loading'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {loadImageFromGallery} from '../../Utils/Helpers'
import {uploadImage,getRegistroXid,updateRegistro} from '../../Utils/Acciones'
import uuid from "random-uuid-v4"

export default function EditProducto(props) {

    const { route } = props;
    const { id } = route.params;

     const [titulo, setTitulo] = useState("")
     const [descripcion, setDescripcion] = useState("")
     const [precio, setPrecio] = useState(0.00)
     const [imagenes, setImagenes] = useState([])
     const [categoria, setCategoria] = useState("")
     const [rating, setRating] = useState(5)
     const [loading, setLoading] = useState(false)
     const [errores, setErrores] = useState({})
     const btnRef=useRef()
     const navigation=useNavigation()
  
     useEffect(() => {
      (async () => {
        const result = await getRegistroXid("productos", id);
       
        const { data } = result;
        setTitulo(data.titulo);
        setDescripcion(data.descripcion);
        setPrecio(data.precio);
        setImagenes(data.imagenes);
        setRating(data.rating);
        setCategoria(data.categoria);
      })();
    }, []);


     const imagenesUrl = [];

     const editarProducto=async()=>{
      console.log("ENTRO EN 1")
       setErrores({})

       if(isEmpty(titulo)){
         setErrores({titulo:"El campo titulo es obligatorio"})
       }
       else if(isEmpty(descripcion)){
        setErrores({descripcion:"El campo descripción es obligatorio"})
      }
      else if(!parseFloat(precio)>0){
        setErrores({precio:"Introduzca el precio para el producto"})
      }
      else if(isEmpty(categoria)){
        console.log("ENTRO EN 2")
       Alert.alert(
        "Seleccionar categoria",
         "Favor seleccione una categoria para el producto o servicio",
       [
         {
          style:"cancel",
          text:"Entendido",
         }
       ]
       )
      }
      else if(isEmpty(imagenes)){
        console.log("ENTRO EN 3")
        Alert.alert(
          "Seleccionar Imagenes",
          "Favor seleccionar minimo una imagen para su producto o servicio",
        [
          {
           style:"cancel",
           text:"Entendido",
          }
        ]
        )
      }
      else{
        console.log("ENTRO EN 4")
        setLoading(true)

        // if(imagenes.length>0)
        // {
        //   await Promise.all(
        //     map(imagenes,async(image)=>{
        //         const response=await uploadImage(image,"ImagenesProductos",uuid())     
        //         if(response.statusResponse){
        //           imagenesUrl.push(response.url);
        //         }
        //     })
        //  )
        // }
   
 

        const producto={
          titulo,
          descripcion,
          precio,
          usuarioId:getUsuario().uid,
          imagenes:imagenesUrl,
          status:1,
          fechaRegistro:new Date(),
          rating,
          categoria
        }
        
     
        const updateProduct= await updateRegistro("productos",id,producto)
     
        if(updateProduct.statusResponse){
          setLoading(false)
          Alert.alert(
            "Actulización exitosa",
            "El registro se ha actualizado de forma correcta",
            [
              {
                style:"cancel",
                text:"Aceptar",
                onPress:()=>navigation.navigate("mi-tienda")
              }
            ]
          )
        }else{
          setLoading(false)
          Alert.alert(
            "Actualización fallida",
            "Ha ocurrido un error al actualizar el producto",
            [
              {
                style:"cancel",
                text:"Aceptar",
              }
            ]
          )
        }
      }
     }



    return (
        <KeyboardAwareScrollView style={styles.container}>
            <View
             style={{
                 borderBottomColor:"#166ab3",
                 borderBottomWidth:2,
                 width:100,
                 marginTop:20,
                 alignSelf:"center"
             }}
            />

            <Input
              placeholder="Titulo"
              onChangeText={(text)=>setTitulo(text)}
              inputStyle={styles.input}
              errorMessage={errores.titulo}
              value={titulo}
             />

             
            <Input
              placeholder="Descripción"
              onChangeText={(text)=>setDescripcion(text)}
              inputStyle={styles.textarea}
              errorMessage={errores.descripcion}
              multiline={true}
              value={descripcion}
             />

             
            <Input
              placeholder="Precio"
              onChangeText={(text)=>setPrecio(parseFloat(text))}
              inputStyle={styles.input}
              errorMessage={errores.precio}
              keyboardType="name-phone-pad"
              value={precio.toFixed(2)}
             />
            <Text style={styles.txtLabel}>Calidad del producto o servicio</Text>
            
            <AirbnbRating
             count={5}
             reviews={["Baja","Deficiente","Normal","Muy bueno","Excelente"]}
             defaultRating={5}
             size={35}
             onFinishRating={(value)=>{setRating(value)}}
            />
          <Text style={styles.txtLabel}>Cargar Imagenes</Text>
          <SubirImagenes
           imagenes={imagenes}
           setImagenes={setImagenes}
          />
          <Text style={styles.txtLabel}>Asignar categorias</Text>
           <Botonera categoria={categoria} setCategoria={setCategoria}/> 
          <Button
            title="Editar producto"
            buttonStyle={styles.btnNew}
            ref={btnRef}
            onPress={editarProducto}
          />
          <Loading  isVisible={loading} text="Favor espere"/>
        </KeyboardAwareScrollView>
    )
}


function SubirImagenes(props) {
    const { imagenes, setImagenes } = props;
  
    const removerImagen = (imagen) => {
      Alert.alert(
        "Eliminar Imagen",
        "¿Estás Seguro de que quieres eliminar la imagen ?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Eliminar",
            onPress: () => {
                setImagenes(filter(imagenes, (imagenURL) => imagenURL !== imagen));
            },
          },
        ]
      );
    };
  
    return (
      <ScrollView
        style={styles.viewImages}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {size(imagenes) < 5 && (
          <Icon
            type="material-community"
            name="plus"
            color="#7a7a7a"
            containerStyle={styles.containerIcon}
            onPress={async () => {
              const result = await loadImageFromGallery([1, 1]);
              if (result.status) {
                setImagenes([...imagenes, result.image]);
              }
            }}
          />
        )}
  
        {map(imagenes, (item, index) => (
          <Avatar
            key={index}
            style={styles.miniatura}
            source={{ uri: item }}
            onPress={() => {
                removerImagen(item);
            }}
          />
        ))}
      </ScrollView>
    );
  }
  

  function Botonera(props){
    const {categoria, setCategoria} = props

  return(<View style={styles.botonera}>

    <TouchableOpacity 
     style={styles.btnCategoria}
     onPress={()=>{
       setCategoria("libros")
     }}
    >
      <Icon
         type="material-community"
         name="book-open"
         size={24}
         color={categoria==="libros" ? "#128c7e":"#757575"}
         reverse
      />
      <Text>Libros</Text>
    </TouchableOpacity>

    <TouchableOpacity 
     style={styles.btnCategoria}
     onPress={()=>{
       setCategoria("ideas")
     }}
    >
      <Icon
         type="material-community"
         name="lightbulb-on-outline"
         size={24}
         color={categoria==="ideas" ? "#128c7e":"#757575"}
         reverse
      />
      <Text>Ideas</Text>
    </TouchableOpacity>

    <TouchableOpacity 
     style={styles.btnCategoria}
     onPress={()=>{
       setCategoria("articulos")
     }}
    >
      <Icon
         type="material-community"
         name="cart-arrow-down"
         size={24}
         color={categoria==="articulos" ? "#128c7e":"#757575"}
         reverse
      />
      <Text>Articulos</Text>
    </TouchableOpacity>

    <TouchableOpacity 
     style={styles.btnCategoria}
     onPress={()=>{
       setCategoria("servicios")
     }}
    >
      <Icon
         type="material-community"
         name="account"
         size={24}
         color={categoria==="servicios" ? "#128c7e":"#757575"}
         reverse
      />
      <Text>Servicios</Text>
    </TouchableOpacity>
  </View>
)
  }
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        borderRadius:50,
        margin:5,
        padding: 5,
        elevation:3
    },
    titulo:{
        borderRadius:"90%",
        borderRadius:10,
        borderColor:"#166cb3",
        marginTop:20,
        paddingHorizontal:20,
        height:50
    },
    textarea:{
        height:150
    },
    txtLabel:{
        fontSize:20,
        fontFamily: "Roboto",
        textAlign:"center",
        fontWeight:"bold",
        color:"#176bb4"
    },
    btnNew:{
        backgroundColor:"#176bb4",
        marginTop:20,
        marginBottom:40,
        marginHorizontal:20
    },
    viewImages:{
        flexDirection:"row",
        marginHorizontal:20,
        marginTop:30,
        marginBottom:10
    },
    containerIcon:{
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        height:150,
        width:150,
        backgroundColor:"#e3e3e3",
        padding: 10,
    },
    miniatura:{
        width:100,
        height:150,
        marginRight:10
    },
    botonera:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-around"
    },
    btnCategoria:{
      justifyContent:"center",
      alignItems:"center"
    }
   
})
