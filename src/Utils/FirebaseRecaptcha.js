import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha'

import Constants from 'expo-constants';


export default function FirebaseRecaptcha(props) {
    const {referencia}=props
    return (
       <FirebaseRecaptchaVerifierModal
          ref={referencia}
          title="CONFIRMA QUE NO ERES UN ROBOT"
          cancelLabel="X"
          firebaseConfig={Constants.manifest.extra.firebase} //Se agrego una variable extra llamada "firebase" en el archivo app.json
       />
    )
}

