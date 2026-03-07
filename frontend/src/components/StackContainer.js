//Aquí vamos a crear cada uno de los contendores del main dem Home,dónde se indica la racha,los puntos_ranking
import React from "react";
import {Text,View,StyleSheet} from "react-native";
import { getGamificaciones } from "../services/services";
import {useState,useEffect} from "react";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
//Tenemos todo lo necesario,para crear el contenedor

const StackContainer=()=>{
         const [gamificaciones,setGamificaciones]=useState(null);//Traemos las gamificaciones
         const [laoding,setLoading]=useState(true);//Definimos el estado de carga
        

         useEffect(()=>{
             setLoading(true);
             //Ahora vamos a obtener las gamificaciones,para mostrar la racha y los puntos_ranking
              const SetTimeout=setTimeout(async()=>{
                //Definimos el tiempo de carga,para simular la carga de datos,ya que cada vez que se registre una sesión en el historial,tenemos que actualizar las gamificaciones,por lo tanto,es importante simular la carga de datos,para ver si se actualizan correctamente
                  setLoading(false);
                  const data=await getGamificaciones();
                    setGamificaciones(data);
                    //Con esto vamos a atener todas las gamificaciones,para mostrar la racha y los puntos_ranking

              },2000);
                return()=>clearTimeout(SetTimeout);
         },[]);
         
         if(laoding){
               return(
                      <View>
                           <Text>Cargando...</Text>
                      </View>
               )
         }
         else{
               return(
                     <View style={style.Container}>
                            <View style={style.StackConatiner}>
                                <View>
                                    <Text style={style.Subtitle}>Racha:</Text>
                                        <Text style={style.Text}>  {`${gamificaciones?.gamificaciones?.racha_dias} dias`}</Text>
                                </View>
                                <View>
                                    <Ionicons name="flame" size={24} color="#ff4500" style={style.Icon}/>
                                    
                                </View>
                            </View>
                            <View style={style.StackConatiner}>
                                <View>
                                        <Text style={style.Subtitle}>Puntos :</Text>
                                        <Text style={style.Text}>  {`${gamificaciones?.gamificaciones?.puntos_ranking} puntos`}</Text>
                                </View>
                                <View>
                                        <FontAwesome name="star" size={24} color="#fee500" style={style.Icon}/>
                                </View>
                                  
                            </View>
                     </View>
               )
         }
}
const style=StyleSheet.create({
    Container:{
         flex:1,
         justifyContent:'center',
         alignItems:'center',
         backgroundColor:'#080808',
         flexDirection:'row',
         flexWrap:'wrap',
         gap:20,
         

    },
    StackConatiner:{
            flexDirection:'column',
            justifyContent:'space-around',
            alignItems:'center',
             
             width:'100%',
             backgroundColor:'#1e1b1b',
             marginBottom:20,
                padding:10,
                height:160,
                borderRadius:10,
                width:160,
                borderColor:'#484141',
                borderWidth:1,
                shadowColor:'#000',
                shadowOffset:{width:0,height:2},
                shadowOpacity:0.8,
                shadowRadius:2,
                elevation:5,
                
    },
    Text:{
         color:'#ffff',
         fontSize:16,
            fontWeight:'bold',
            textAlign:'center',
            fontFamily:'helvetica',
            marginBottom:0,
           textTransform:'uppercase',
           letterSpacing:1,
            margin:0,

    },
    Icon:{
         fontSize:20
    },
    Subtitle:{
         fontFamily:'helvetica',
         color:'#ffff',
         fontSize:9,
         textAlign:'center',
         marginTop:5,
            textTransform:'uppercase',
            letterSpacing:1,
          bottom:30,
          right:40,
    }
})
export default StackContainer;//Exportamos el componente para usarlo en la pantalla de inicio,para mostrar la racha y los puntos_ranking