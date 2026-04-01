//Aquí vamos a crear la card para cada uno de los ejercicios
import React, { useEffect, useState,useRef} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Button from './Button';
import { getEjerciciosDeRutina } from '../services/services';
import { registrarSesionHistorial } from '../services/services';
//Vamos con la lógica de registrar la sesión y con la lógica de tiempo_descanso


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
        const [Fase,setFase]=useState('ejercicio');//Definimos el estado de la fase de cada uno de lños ejercicios,que después se utilizará para definir el tiempo de descanso y el tiempo de ejercicio,ya que cada uno de los ejercicios tiene un tiempo de ejercicio y un tiempo de descanso,por lo tanto,es importante definir la fase de cada uno de los ejercicios para poder mostrar el tiempo restante de cada uno de los ejercicios correctamente

        const ref=useRef(null);
        //Definimos los hooks,que definiran tiempo,ejecución e intervalo de tiempo de cada uno de los ejercicios
       useEffect(()=>{
            if(ejecutando){
                 ref.current=setInterval(()=>{
                      setTiempo((prevTiempo)=>{
                         if(prevTiempo<=1){
                                clearInterval(ref.current);setEjecutando(false); return 0;
                                //En el casode que el intervalko sea menor a 0,limpiamos el intervalo y pasará a ser "0",ya que el tiempo negativo no existe
                                  
                                }
                                return prevTiempo-1;
                                //Y vamos restando el tiempo cada segundo,para mostrar el tiempo restante de cada uno de los ejercicios



                                

                           
                         }
                       
                      );
                 },1000);
            }
            else{
                 clearInterval(ref.current);
            }
            return()=>{
                 clearInterval(ref.current);
            }
         },[ejecutando])
         //Vamos a usar otro useEffect para definr la lógica del tiempo de descanso,la vamos a definir en diferentes fases
         useEffect(()=>{
                if(tiempo===0 ){
                        //Vamos a limpiar el intervalo de tiempo,para que no siga restando el tiempo,cuando sea igual a 0
                                clearInterval(ref.current);
                                if(Fase==='ejercicio'){
                                        setFase('descanso');
                                        setTiempo(item.duracion_descanso);
                                        setTimeout(()=>setEjecutando(true),1000);
                                        //El tiempo de descanso descendera después de 1 segundo

                                        //En el caso de que el tiempo sea igual a 0 y la fase sea "ejercicio",pasaremos a la fase de descanso,definiremos el tiempo de descanso y empezaremos a ejecutar el intervalo de tiempo para mostrar el tiempo restante de cada uno de los ejercicios
                                }
                                else if(Fase==='descanso'){
                                        setFase('Finalizado el tiempo de descanso')
                        //En el caso de que el tiempo sea igual a 0 y la fase sea "descanso",pasaremos a la fase de ejercicio,definiremos el tiempo de ejercicio y empezaremos a ejecutar el intervalo de tiempo para mostrar el tiempo restante de cada uno de los ejercicios
                 }

                 
                }
         },[tiempo,Fase])
         const formatoTiempo=(tiempo)=>{
             //definimos el formato de tiempo que va a ser de minutos
             const minutos=Math.floor(tiempo/60);//Aquí vamos a definir el formato en minutos
             const segundos=tiempo%60;
                return `${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2,'0')}`;
                //Definimos el formato de tiempo que va a ser de minutos y segundos,para que se muestre correctamente el tiempo restante de cada uno de los ejercicios
         }
         //Una vez que hayamos definido el formato de tiempo,lo podemos mostrar en el card sin problema,ya que el formato de tiempo se va a ir actualizando cada segundo,para mostrar el tiempo restante de cada uno de los ejercicios
         return(
                <View style={styles.card}>
      <YoutubePlayer height={200} play={false} videoId={getYoutubeId(item.ejercicios.url_video)} />
      <Text style={styles.nombre}>{item.ejercicios.nombre}</Text>
      <Text style={[styles.info,{
          //Ahora vamos a definir el color de los bordes de la categorría,dependiendo de que categoría sea
             borderColor: item.ejercicios.categoria === 'Fuerza' ? '#f80404' : item.ejercicios.categoria === 'Cardio' ? '#04f84c' : item.ejercicios.categoria === 'Saco' ? '#049ef8' : '#ffffff',
             borderWidth: 1,
             padding: 5,
             borderRadius: 5,
             alignSelf: 'flex-start',
             color: item.ejercicios.categoria === 'Fuerza' ? '#f80404' : item.ejercicios.categoria === 'Cardio' ? '#04f84c' : item.ejercicios.categoria === 'Saco' ? '#049ef8' : '#ffffff',
             boxShadow:item.ejercicios.categoria === 'Fuerza' ? '0 0 3px #f80404' : item.ejercicios.categoria === 'Cardio' ? '0 0 3px #04f84c' : item.ejercicios.categoria === 'Saco' ? '0 0 3px #049ef8' : '0 0 3px #ffffff',
             fontWeight: 'bold',
             marginBottom: 10,
      }]}>{item.ejercicios.categoria}</Text>
         {Fase === 'ejercicio' && tiempo > 0 &&
         <Button title={ejecutando ? `Detener ${formatoTiempo(tiempo)}` : `Iniciar  ${formatoTiempo(item.duracion_ejercicio)}`} onPress={() => setEjecutando(!ejecutando)}
          />
         }
     
         {Fase === 'descanso' && tiempo > 0 ? ( 
                <Text style={styles.CronometroDesanso}>Tiempo de descanso: {formatoTiempo(tiempo)}</Text>
      
         ) : null}
         {Fase === 'Finalizado el tiempo de descanso' ? (               
                <Text style={styles.message}>¡Tiempo de descanso finalizado! Prepárate para el siguiente ejercicio.</Text>
         ) : null}
        
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
                backgroundColor:'#2d2828',
                borderRadius:10,
                padding:10,
                marginBottom:20,
                shadowColor:'rgba(0,0,0,0.5)',
                shadowOffset:{width:0,height:2},
                shadowOpacity:0.5,
                shadowRadius:10,
                elevation:5,
                borderColor:'#393131',
                borderWidth:1,
                letterSpacing:1,
                boxShadow:'0 0 10px rgba(115, 112, 112, 0.5)',
                shadowColor:'rgba(123, 121, 121, 0.5)',
                shadowOffset:{width:0,height:2},
                shadowOpacity:0.5,
                shadowRadius:10,
                elevation:5,
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
                 color:'#ffffff',
        },
        info:{
                fontSize:14,
                marginBottom:5,
                letterSpacing:1,
                color:'#ffffff',
        },
        message:{
               fontSize: 16,
  fontWeight: 'bold',
  color: '#04f84c',
  borderColor: '#04f84c',
  borderWidth: 1,
  padding: 10,
  borderRadius: 8,
  textAlign: 'center',
  marginTop: 10,
  letterSpacing: 1,
        },
        CronometroDesanso:{
              fontSize: 16,
  fontWeight: 'bold',
  color: '#44aaff',
  textAlign: 'center',
  letterSpacing: 4,
  marginVertical: 10,
        },
        timer:{
                fontSize:16,
                fontWeight:'bold',
                marginBottom:10,
                letterSpacing:2,
                color:'#ffffff',

        }
})
export default EjercicioCard;