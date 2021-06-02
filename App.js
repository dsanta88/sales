
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  RutasAutenticadas from './src/Navegacion/RutasAutenticadas'

export default function App() {
  return (
   <RutasAutenticadas/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
