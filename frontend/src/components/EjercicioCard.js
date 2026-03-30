//Aquí vamos a crear la card para cada uno de los ejercicios
import React, { useEffect, useState,useRef} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Button from './Button';
import { getEjerciciosDeRutina } from '../services/services';


const getYoutubeId=(url)=>{
    //Esta función es para obtener el id del video de youtube para poder mostrar el video en el card sin problema
    const match=url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
    //Vale en el caso de que el video exista nos lo devolverá,si no existe nos devolverá null
}
//Una vez que hayamos obtenido el id del video,lo podemos mostrar en el card sin problema,ya que el componente de youtube player necesita el id del video para mostrarlo correctamente
const EjercicioCard=({item})=>{
        const [tiempo,setTiempo]=useState(item.duracion_ejercicio);//Definimos el estado de tiempo de cada uno de los ejercicios,que después lo pasaremos a un intervalo de tiempo
        const [ejecutando,setEjecutando]=useState(false);
        const ref=useRef(null);
        //Definimos los hooks,que definiran tiempo,ejecución e intervalo de tiempo de cada uno de los ejercicios
       useEffect(()=>{
            if(ejecutando){
                 ref.current=setInterval(()=>{
                      setTiempo((prevTiempo)=>{
                         if(prevTiempo<=1){
                                clearInterval(ref.current);setEjecutando(false);

                                return 0; 
                         }
                         return prevTiempo - 1;
                      });
                 },1000);
            }
            else{
                 clearInterval(ref.current);
            }
            return()=>{
                 clearInterval(ref.current);
            }
         },[ejecutando])
         const formatoTiempo=(tiempo)=>{
             //definimos el formato de tiempo que va a ser de minutos
             const minutos=Math.floor(tiempo/60);
             const segundos=tiempo%60;
                return `${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2,'0')}`;
                //Definimos el formato de tiempo que va a ser de minutos y segundos,para que se muestre correctamente el tiempo restante de cada uno de los ejercicios
         }
         //Una vez que hayamos definido el formato de tiempo,lo podemos mostrar en el card sin problema,ya que el formato de tiempo se va a ir actualizando cada segundo,para mostrar el tiempo restante de cada uno de los ejercicios
         return(
                <View style={styles.card}>
      <YoutubePlayer height={200} play={false} videoId={getYoutubeId(item.ejercicios.url_video)} />
      <Text style={styles.nombre}>{item.ejercicios.nombre}</Text>
      <Text style={styles.info}>{item.ejercicios.categoria}</Text>
      <Text style={styles.timer}>{formatoTiempo(tiempo)}</Text>
      <Button title={ejecutando ? "Detener" : "Empezar"} onPress={() => setEjecutando(p => !p)} />
    </View>
         )
}

const styles=StyleSheet.create({
        EjercicioTitle:{
                fontSize:20,
                fontWeight:'bold',
                marginBottom:10,
        },
        EjercicioDescription:{
                fontSize:16,
                marginBottom:10,
        },
        card:{
                backgroundColor:'#f0f0f0',
                borderRadius:10,
                padding:10,
                marginBottom:20,
                shadowColor:'rgba(0,0,0,0.5)',
                shadowOffset:{width:0,height:2},
                shadowOpacity:0.5,
                shadowRadius:10,
                elevation:5,
                letterSpacing:1,
        },
         video:{
                width:'100%',
                height:200,
                borderRadius:10,
                marginBottom:10,

        },
        nombre:{
                fontSize:18,
                fontWeight:'bold',
                marginBottom:5,
                letterSpacing:1,
        },
        info:{
                fontSize:14,
                marginBottom:5,
                letterSpacing:1,
        },
        timer:{
                fontSize:16,
                fontWeight:'bold',
                marginBottom:10,
                letterSpacing:2,

        }
})
export default EjercicioCard;