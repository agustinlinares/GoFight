//Vamos a crear una barra de progreso para mostrar la evolución del usuario teniendo en cuenta las calorias quemadas
import React, { useRef } from "react";
import {View,Text,StyleSheet,Animated,ActivityIndicator} from 'react-native';//Importamos Animated para crear la animación de la barra de progreso
import { useState,useEffect } from "react";
import {Ionicons} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const BarraProgreso=({caloriasActuales,caloriasObjetivo})=>{
      //Vamos a crear una barra de progreso para mostrar la evolución del usuario teniendo en cuenta las calorias quemadas,para esto vamos a usar el hook de useRef para crear una animación de la barra de progreso,que se va a actualizar cada vez que se registre una sesión en el historial,ya que cada vez que se registre una sesión en el historial,tenemos que actualizar las gamificaciones,por lo tanto,es importante probarlo en la pantalla de inicio,para ver si se actualizan correctamente
       
        const [loading,setLoading]=useState(true);
        const progresoAnimado=useRef(new Animated.Value(0));//Creamos una animación de la barra de progreso,que se va a actualizar cada vez que se registre una sesión en el historial,ya que cada vez que se registre una sesión en el historial,tenemos que actualizar las gamificaciones,por lo tanto,es importante probarlo en la pantalla de inicio,para ver si se actualizan correctamente
        //Tenemos que calcular el procentaje de calorias quemadas,para eso vamos a usar el Math.min,para tener en cuenta un porcentaje que no sobrepase el 100%
        const porcentajeCaloriasQuemadas=
         caloriasObjetivo>0?Math.min((caloriasActuales/caloriasObjetivo)*100,100):0;
         //Utilizamos un condicional en el caso de que el objetivo sea nulo,para evitar incosistencias

        useEffect(()=>{
               //Aquí vamos a simular la carga de las calorias quemadas,para mostrar la barra de progreso,antes de mostrar la barra de progreso,ya que cada vez que se registre una sesión en el historial,tenemos que actualizar las gamificaciones,por lo tanto,es importante probarlo en la pantalla de inicio,para ver si se actualizan correctamente
                 const timer=setTimeout(()=>{
        
                      
                       Animated.timing(progresoAnimado.current,{
                             toValue:porcentajeCaloriasQuemadas,
                               duration:1000,
                              useNativeDriver:false

                       }).start();
                        setLoading(false);
                 },1500);
                 return()=>clearTimeout(timer);
        },[caloriasActuales,porcentajeCaloriasQuemadas]);
         const width=progresoAnimado.current.interpolate({
              inputRange:[0,100],
              outputRange:['0%','100%'],
              

         })
        if(loading){
              return(
                   <ActivityIndicator size="large" color="#ff0000" />
              )
        }
        else{
            return(
                   <View>
                        <View style={styles.TextContainer}>
                           <View style={styles.RowStyle}>
                             <Text style={styles.TextStyle}>calorias quemadas:{caloriasActuales}</Text>
                            <Ionicons name="flame" size={20} color="#ffae00" />
                           </View>
                           <View style={styles.RowStyle}>
                                <Text style={styles.TextStyle}>Objetivo:{caloriasObjetivo}</Text>
                                <MaterialCommunityIcons name="target" size={20} color="#fb0404" />
                           </View>
                          
                        </View>
                        <View style={styles.barraProgresoContainer}>
                              <Animated.View  style={[styles.barraProgreso,{width}]} />
                              
                        </View>
                         <View style={styles.SubtitleStyleContainer}>
                             <Text style={styles.SubtitleStyle}>Progreso:{porcentajeCaloriasQuemadas.toFixed(2)}/100%</Text>
                                    
                           </View>
                   </View>
                   
            )
               
        }

}
const styles=StyleSheet.create({
    barraProgresoContainer:{
        width:'90%',
        height:7,
        backgroundColor:'#333333',

   
        borderRadius:10,
        marginTop:10,
        overflow:'hidden',
        borderColor:'rgba(255,0,0,0.5)',
        borderWidth:2,
        shadowColor:'#ff0000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.8,
        shadowRadius:4,
         elevation:5,
         alignItems:'center',
            justifyContent:'center',
            alignSelf:'center',


    },
        barraProgreso:{
                height:7,
                backgroundColor:'#ff0000',
                borderRadius:10,
                marginTop:10,
                alignItems:'center',
                justifyContent:'center',
                borderColor:'rgba(255,0,0,0.5)',
                borderWidth:2,
                shadowColor:'#fa0000',
                shadowOffset:{width:0,height:2},
                shadowOpacity:0.8,
                shadowRadius:4,
                 elevation:5,
                 marginTop:0,
                 alignItems:'center',
                 justifyContent:'center',

        
                



        },
        TextStyle:{
            fontSize:14,
            fontWeight:'bold',
            color:'#ffffff',
            marginBottom:5,
            letterSpacing:1,
            
            fontFamily:'Helvetica',
         



        },
        RowStyle:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            gap:5,
            underlayColor:'rgba(255,0,0,0.1)',
                padding:5,
                borderRadius:5,
        
        },
        TextContainer:{
                alignItems:'center',
                    justifyContent:'center',
                    borderColor:'rgba(48, 44, 44, 0.8)',
                    borderWidth:1,
                    padding:10,
                    borderRadius:5,
                    backgroundColor:'#1a1a1a',
                    shadowColor:'rgba(255, 82, 82, 0.5)',
                    shadowOffset:{width:0,height:2},
                    shadowOpacity:0.8,
                    shadowRadius:4,
                    elevation:5,
                    width:'90%',
                    alignSelf:'center',
                
        },
        SubtitleStyleContainer:{
            flexDirection:'row',
            alignItems:'flex-start',
            justifyContent:'flex-start',
           
           
            marginTop:5,
            gap:5,
            padding:5,
            width:'90%',
            alignSelf:'center',
            borderColor:'rgba(255, 0, 0, 0.5)',
            borderWidth:1,
        },
        SubtitleStyle:{
            fontSize:8,
           fontFamily:'Helvetica',
            color:'#ffffff',
            letterSpacing:1,
            fontWeight:'bold',


        }

})
export default BarraProgreso;
