
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  RutasNoAutenticadas from './src/Navegacion/RutasNoAutenticadas'

export default function App() {
  return (
   <RutasNoAutenticadas/>
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
