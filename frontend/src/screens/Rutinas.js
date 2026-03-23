//Aquí vamos a simular la carga de cada una de las rutinas,para mostrar la pantalla de carga,antes de mostrar la pantalla de rutinas,ya que cada vez que se registre una sesión en el historial,tenemos que actualizar las gamificaciones,por lo tanto,es importante probarlo en la pantalla de inicio,para ver si se actualizan correctamente
import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ActivityIndicator,SafeAreaView,ScrollView,Platform,StatusBar} from 'react-native';
import Header from '../components/HeaderComponent';
import Footer from '../components/Footer';

const Rutinas=()=>{
        const [loading,setLoading]=useState(true);
        useEffect(()=>{
                setTimeout(()=>{
                        setLoading(false);
                },2000);
        },[]);
        if(loading){
                return( 
                        <View style={styles.ActivityIndicatorStyle}>
                                <ActivityIndicator size="large" color="#ff0000"/>
                        </View>
                )

        }
        else{
                return(
                        <SafeAreaView style={styles.Container}>
                                <Header/>
                                <ScrollView>
                                        <Text style={styles.TextStyle}>Aquí van a ir las rutinas</Text>
                                </ScrollView>
                                <Footer/>
                        </SafeAreaView>
                )
        }
}
const styles=StyleSheet.create({
        Container:{
                flex:1,
                backgroundColor:'#000000',
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
                

        },
        ActivityIndicatorStyle:{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#080808'
        },
        TextStyle:{
                fontSize:20,
                fontWeight:'bold',
                textAlign:'center',
                marginTop:20,
        }
})
export default Rutinas;
