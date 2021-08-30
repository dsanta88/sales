import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView,Alert } from "react-native";
import { Avatar, Icon, Input, Button, Rating } from "react-native-elements";
import { interpolate } from "react-native-reanimated";
import { getRegistroXid, getUsuario, setMensajeNotificacion, sendPushNotification, addRegistro } from "../../Utils/Acciones";
import { size } from "lodash";
import Loading from "../../Componentes/Loading";
import Carousel from "../../Componentes/Carousel";
import Modal from "../../Componentes/Modal"
import {sendWhatsapp} from"../../Utils/Helpers"

export default function Detalle(props) {
  const { route } = props;
  const { id, titulo } = route.params;

  const [producto, setProducto] = useState({});
  const [expopushtoken, setExpopushtoken] = useState("");
  const [nombreVendedor, setNombreVendedor] = useState("Nombre");
  const [photoVendedor, setPhotoVendedor] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const usuarioActual = getUsuario();

  useEffect(() => {
    (async () => {
      setProducto((await getRegistroXid("productos", id)).data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (size(producto) > 0) {

        const result = (await getRegistroXid("usuarios", producto.usuario))
          .data;
    
          setExpopushtoken(result.token)
          setNombreVendedor(result.displayName)
          setPhotoVendedor(result.photoURL)
          setPhoneNumber(result.phoneNumber)
      }
    })();
  }, [producto]);

  if (producto.lenght !== 0) {
    return (
      <ScrollView style={styles.container}>
        <Carousel
          imagenes={producto.imagenes}
          height={400}
          width={Dimensions.get("window").width}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
        />
        <View style={styles.boxsuperior}>
          <View
            style={{
              borderBottomColor: "#25D366",
              borderBottomWidth: 2,
              width: 100,
              alignSelf: "center",
            }}
          />
            <Text style={styles.titulos}>{producto.titulo}</Text>
            <Text style={styles.precio}>
              {parseFloat(producto.precio).toFixed(2)}
            </Text>

            <View>
              <Text style={styles.descripcion}>{producto.descripcion}</Text>
              <Rating imageSize={20} startingValue={producto.rating} readonly />
            </View>

            <Text style={styles.titulos}>Contactar al Anunciante</Text>
            <View style={styles.avatarbox}>
            <Avatar
              source={
                photoVendedor
                  ? { uri: photoVendedor }
                  : require("../../../assets/avatar.jpg")
              }
              style={styles.avatar}
              rounded
              size="large"
            />
            <View>
            <Text style={styles.displayname}>
                {nombreVendedor ? nombreVendedor : "Anónimo"}
              </Text>
              <View style={styles.boxinternoavatar}>
                <Icon
                  type="material-community"
                  name="message-text-outline"
                  color="#25d366"
                  size={40}
                  onPress={() => {
                    setIsVisible(true);
                  }}
                />
                <Icon
                  type="material-community"
                  name="whatsapp"
                  color="#25d366"
                  size={40}
                  onPress={() => {
                    const mensajewhatsapp = `Estimado ${nombreVendedor}, mi nombre es ${usuarioActual.displayName}  me interesa el producto ${producto.titulo} que está en la aplicación Sales.`;     
                    sendWhatsapp(phoneNumber, mensajewhatsapp);
                  }}
                />
              </View>
            </View>
            </View>
            <EnviarMensaje
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            nombreVendedor={nombreVendedor}
            avatarVendedor={photoVendedor}
            mensaje={mensaje}
            setMensaje={setMensaje}
            receiver={producto.usuario}
            sender={usuarioActual.uid}
            token={expopushtoken}
            producto={producto}
            setLoading={setLoading}
            nombreCliente={usuarioActual.displayName}
          />
        </View>
      </ScrollView>
    );
  }
}



function EnviarMensaje(props) {

  const {
    isVisible,
    setIsVisible,
    nombreVendedor,
    avatarVendedor,
    mensaje,
    setMensaje,
    receiver,
    sender,
    token,
    producto,
    setLoading,
    nombreCliente,
  } = props;

  const enviarNotificacion = async () => {
    if (!mensaje) {
      console.log("ENTRO 1");
      Alert.alert("Validación", "Favor introduce ubn texto para el mensaje", [
        {
          style: "default",
          text: "Entendido",
        },
      ]);
    } else {
      console.log("ENTRO 2");
      setLoading(true);
      console.log("SENDER:",sender);
      const notificacion = {
        sender: sender,
        receiver: receiver,
        mensaje,
        fechacreacion: new Date(),
        productoid: producto.id,
        productotitulo: producto.titulo,
        visto: 0,
      };

      const resultado = await addRegistro("notificaciones", notificacion);
      if (resultado.statusResponse) {

         const mensajeNotificacion = setMensajeNotificacion(
          token,
          `Cliente Interesado - ${producto.titulo}`,
          `${nombreCliente}, te ha enviado un mensaje`,
          { data: mensaje }
        );

        console.log("mensajeNotificacion",mensajeNotificacion);
        const respuesta = await sendPushNotification(mensajeNotificacion);
        setLoading(false);

        if (respuesta) {
          Alert.alert(
            "Acción realizada correctamente",
            "Se ha enviado el mensaje correctamente",
            [
              {
                style: "cancel",
                text: "Entendido",
                onPress: () => setIsVisible(false),
              },
            ]
          );
          setMensaje("");
        } else {
          Alert.alert(
            "Error",
            "Se ha producido un error al enviar mensaje, favor intentelo nuevamente  ",
            [
              {
                style: "cancel",
                text: "Entendido",
              },
            ]
          );
          setLoading(false);
        }
      }
    }
  };



  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontSize: 16,
          borderRadius: 20,
        }}
      >
        <Avatar
          source={
            avatarVendedor
              ? { uri: avatarVendedor }
              : require("../../../assets/avatar.jpg")
          }
          style={styles.photovendor}
        />

        <Text style={{ color: "#075e54", fontSize: 16, fontWeight: "bold" }}>
          Envíale un mensaje a {nombreVendedor}
        </Text>

        <Input
          placeholder="Escribe un mensaje"
          multiline={true}
          inputStyle={styles.textArea}
          onChangeText={(text) => {
            setMensaje(text);
          }}
          value={mensaje}
        />
        <Button
          title="Enviar mensaje"
          buttonStyle={styles.btnsend}
          containerStyle={{ width: "90%" }}
          onPress={enviarNotificacion}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  boxsuperior: {
    backgroundColor: "#fff",
    marginTop: -50,
    paddingTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
  },
  titulos: {
    color: "#075e54",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  precio: {
    fontSize: 18,
    color: "#128c7e",
    fontWeight: "bold",
    paddingLeft: 10,
  },
  descripcion: {
    fontWeight: "300",
    fontSize: 16,
    alignSelf: "center",
    paddingHorizontal: 10,
    marginVertical: 10,
    color: "#757575",
    textAlign: "center",
  },
  avatarbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
  },

  boxinternoavatar: {
    justifyContent: "center",
    flexDirection: "row",
  },
  displayname: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#075E54",
  },
  photovendor: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  textArea: {
    height: 150,
  },
  btnsend: {
    backgroundColor: "#075e54",
  },
});
