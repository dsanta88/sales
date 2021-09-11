import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { Icon, Avatar, Image, Rating, Badge } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { size } from "lodash";
import { listProducts, getUsuario ,listProductsXcategoria,ListarNotificaciones} from "../../Utils/Acciones";
import Busqueda from "../../Componentes/Busqueda";

export default function Tienda() {
  const navigation = useNavigation();
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");
  const [mensajes, setMensajes] = useState("Cargando...");
  const [notificaciones, setNotificaciones] = useState(0);
  const { photoURL } = getUsuario();
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    (async () => {
      setNotificaciones(0)
      setProductList(await listProducts());

      const consulta=await ListarNotificaciones();
      if(consulta.statusResponse){
        setNotificaciones(size(consulta.data))
      }
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setNotificaciones(0)
        const consulta=await ListarNotificaciones();
        
        if(consulta.statusResponse){
          setNotificaciones(size(consulta.data))
        }

        setProductList(await listProducts());    
      })();
    }, [])
  );

  const cargarFiltroXcategoria= async(categoria)=>{
    const lst=await listProductsXcategoria(categoria)
    setProductList(lst)
    if(lst.length===0){
      setMensajes("No se encontraro datos para la categoría " + categoria)
    }
  }


  const updateProducts=async()=>{
    setProductList(await listProducts())
  }

  return (
    <View style={styles.frame}>
      <StatusBar backgroundColor="#128c7e" />
      <View style={styles.header}>
        <KeyboardAwareScrollView>
          <View style={styles.menu}>
          <Avatar
              rounded
              size="medium"
              source={
                photoURL
                  ? { uri: photoURL }
                  : require("../../../assets/avatar.jpg")
              }
              onPress={() => navigation.toggleDrawer()}
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
                onPress={()=>{
                  navigation.navigate("mensajes")
                }}
              />
              {
                notificaciones>0 &&(
                  <Badge
                  status="error"
                  containerStyle={{ position: "absolute", top: -4, right: -4 }}
                  value={notificaciones}
                />
                )
              }
            
            </View>
          </View>
          <Busqueda 
           setProductList={setProductList}
           updateProducts={updateProducts}
           search={search}
           setSearch={setSearch}
           setMensajes={setMensajes}
          />
        </KeyboardAwareScrollView>
      </View>

      <View style={styles.categoraView}>
        <View style={styles.categoriaTitulo}>
          <Text style={styles.categoriaText}>- CATEGORIAS -</Text>
          {categoria.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setCategoria("");
                updateProducts();
              }}
            >
              <Icon
                type="material-community"
                color="red"
                name="close"
                reverse
                size={10}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.categoriaList}>
          <BotonCategoria
            categoriaBoton="libros"
            categoria={categoria}
            icon="book-open-outline"
            texto="Libros"
            setCategoria={setCategoria}
            cargarFiltroXcategoria={cargarFiltroXcategoria}
          />

          <BotonCategoria
            categoriaBoton="ideas"
            categoria={categoria}
            icon="lightbulb-on-outline"
            texto="Ideas"
            setCategoria={setCategoria}
            cargarFiltroXcategoria={cargarFiltroXcategoria}
          />

          <BotonCategoria
            categoriaBoton="articulos"
            categoria={categoria}
            icon="cart-arrow-down"
            texto="Articulos"
            setCategoria={setCategoria}
            cargarFiltroXcategoria={cargarFiltroXcategoria}
          />


          <BotonCategoria
            categoriaBoton="servicios"
            categoria={categoria}
            icon="account-outline"
            texto="Servicios"
            setCategoria={setCategoria}
            cargarFiltroXcategoria={cargarFiltroXcategoria}
          />
        </View>
      </View>

      {size(productList) > 0 ? (
        <FlatList
          data={productList}
          renderItem={(producto) => 
          <Producto producto={producto}  navigation={navigation}/>}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>{mensajes}</Text>
      )}
    </View>
  );
}

function Producto(props) {

  const { producto, navigation } = props;

  const { titulo, descripcion, precio, imagenes, rating, id, usuario } =
    producto.item;

  const { displayName, photoURL } = usuario;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate("detalle", { id, titulo });
      }}
    >
      <Image source={{ uri: imagenes[0] }} style={styles.imgProducto} />
      <View style={styles.infobox}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text>{descripcion.substring(0, 50)}</Text>
        <Text style={styles.vendidopor}>Vendido por</Text>
        <View style={styles.avatarbox}>
          <Avatar
            source={
              photoURL
                ? { uri: photoURL }
                : require("../../../assets/avatar.jpg")
            }
            rounded
            size="large"
            style={styles.avatar}
          />
          <Text style={styles.displayName}>{displayName}</Text>
        </View>
        <Rating
          imageSize={15}
          startingValue={rating}
          style={{ paddingLeft: 40 }}
          readonly
        />
        <Text style={styles.precio}>{precio.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

function BotonCategoria(props) {

  const { categoriaBoton, categoria, icon, texto, setCategoria,cargarFiltroXcategoria } = props;

  return (
    <TouchableOpacity
      style={
        categoria === categoriaBoton
          ? styles.categoriaHover
          : styles.categoriaBtn
      }
      onPress={() => {
        setCategoria(categoriaBoton);
        cargarFiltroXcategoria(categoriaBoton)
      }}
    >
      <Icon
        type="material-community"
        name={icon}
        size={30}
        color={categoria === categoriaBoton ? "#fff" : "#128c7e"}
      />
      <Text
        style={
          categoria === categoriaBoton ? styles.cattxtHover : styles.cattxt
        }
      >
        {texto}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: "20%",
    width: "100%",
    backgroundColor: "#128c7e",
  },
  menu: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  card: {
    width: "100%",
    paddingVertical: 20,
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderBottomColor: "#128c7e",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  imgProducto: {
    width: 120,
    height: 200,
    borderRadius: 10,
  },
  infobox: {
    paddingLeft: 10,
    alignItems: "center",
    flex: 1,
  },
  titulo: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#075e54",
  },
  vendidopor: {
    fontSize: 16,
    marginTop: 5,
    color: "#075e54",
    fontWeight: "700",
  },
  avatarbox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  avatar: {
    height: 30,
    width: 30,
  },
  displayName: {},
  precio: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#128c7e",
    alignSelf: "center",
  },
  categoriaHover: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 7.0,
      height: -8.0,
    },
    shadowOpacity: 0.5,
    shadowColor: "#000",
    backgroundColor: "#25d366",
    borderRadius: 40,
    elevation: 1,
  },
  categoriaBtn: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 7.0,
      height: -8.0,
    },
    shadowOpacity: 0.5,
    shadowColor: "#000",
    backgroundColor: "#fff",
    borderRadius: 40,
    elevation: 1,
  },
  cattxtHover: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#fff",
  },
  cattxt: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#128C7E",
  },
  categoraView: {
    marginTop: 10,
  },
  categoriaTitulo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  categoriaText: {
    color: "#128c7e",
    fontSize: 14,
    fontWeight: "bold",
  },
  categoriaList: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 5,
  },
});
