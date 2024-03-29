import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { Avatar, Icon } from "react-native-elements";

import { sendWhatsapp } from "../../Utils/Helpers";

export default function Contacto(props) {
  console.log("ENTRO EN 111")
  console.log(props)

  
  const { route } = props;
  const { displayName, phoneNumber, photoURL, email } = route.params;

  const mensaje = `Hola, ${displayName}. Te escribo de la aplicación Sales, me dejaste un mensaje. `;
  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <Avatar
          size="large"
          source={
            photoURL ? { uri: photoURL } : require("../../../assets/avatar.jpg")
          }
          rounded
          style={styles.avatar}
        />
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.text}>{displayName}</Text>
          <Text style={styles.text}>{email}</Text>
        </View>
      </View>

      <View style={styles.rowicon}>
        <Icon
          type="material-community"
          name="whatsapp"
          reverse
          size={30}
          color="#25d366"
          onPress={() => sendWhatsapp(phoneNumber, mensaje)}
        />
        <Icon
          type="material-community"
          name="phone-in-talk"
          reverse
          size={30}
          color="#25d366"
          onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  avatar: { width: 50, height: 50 },
  panel: {
    backgroundColor: "#075e54",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 20,
    borderRadius: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#fff",
  },
  rowicon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
