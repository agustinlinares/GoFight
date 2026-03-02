import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//Vamos a probar la conexión a la base de datos desde el frontend,para eso vamos a usar el useEffect
import {useEffect} from 'react';
//El useEffect es un hook de react que nos permite ejecutar una función cada vez que el cpmponente se renderiza o cada vez que cambia,ideal para hacer conexiones con  APIds


export default function App() {
  useEffect(()=>{
    //Vamos a hacer la conexión a la base de datos
      const Connection=async()=>{
        const url='http://192.168.0.22:3000';
        try{
           const response=await fetch(url);
            const data=await response.text();
            console.log(data);
        }catch(error){
            console.error('Error al conectar con la base de datos:', error);
        }
      }
      Connection();
  },[])
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
