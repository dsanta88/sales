import React,{useState,useRef} from 'react'
import { StyleSheet, Text, View,Alert,TouchableOpacity,ScrollView } from 'react-native'
import {Input, Image, Button,Icon,Avatar,AirbnbRating} from 'react-native-elements'
import {map,size,filter,isEmpty} from 'lodash'
import {useNavigation} from '@react-navigation/native'
import Loading from '../../Componentes/Loading'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {loadImageFromGallery} from '../../Utils/Helpers'

export default function AddProducto() {
     const [titulo, setTitulo] = useState("")
     const [descripcion, setDescripcion] = useState("")
     const [precio, setPrecio] = useState(0.00)
     const [imagenes, setImagenes] = useState([])
     const [categoria, setCategoria] = useState("")
     const [errores, setErrores] = useState({})
     const btnRef=useRef()
     const navigation=useNavigation()
     const [rating, setRating] = useState(5)
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
             />

             
            <Input
              placeholder="Descripción"
              onChangeText={(text)=>setDescripcion(text)}
              inputStyle={styles.textarea}
              errorMessage={errores.descripcion}
              multiline={true}
             />

             
            <Input
              placeholder="Precio"
              onChangeText={(text)=>setPrecio(parseFloat(text))}
              inputStyle={styles.input}
              errorMessage={errores.precio}
              keyboardType="name-phone-pad"
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
          <Button
            title="Agregar nuevo producto"
            buttonStyle={styles.btnNew}
            ref={btnRef}
          />
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
              console.log("result",result)
              if (result.status) {
                setImagenes([...imagenes, result.image]);
                console.log("imagenes",imagenes)
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
        fontFamily:"roboto",
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
    }
   
})
