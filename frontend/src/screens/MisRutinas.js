//Aquí vamos la pantalla,dónde se mnostrará todas las rutinas del usuario,para eso vamos a crear un nuevo componente llamado MisRutinas.js,que se va a encargar de mostrar todas las rutinas del usuario,para eso vamos a usar el servicio de getRutinas,que se encuentra en services.js,para obtener todas las rutinas del usuario,para eso necesitamos el id del usuario,que lo obtenemos del perfil del usuario,que lo obtenemos mediante el servicio de getUserProfile,que se encuentra en services.js
import React from "react";
import {Text,View,StyleSheet} from "react-native";
import { getRutinas } from "../services/services";
import { getUserProfile } from "../services/services";
import { useState,useEffect } from "react";
import Button from "../components/Button.js";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
//Una vez que hayamos conseguido todas las importaciones necesarias,procedemos a crear el componente de MisRutinas,que se va a encargar de mostrar todas las rutinas del usuario,para eso vamos a usar el servicio de getRutinas,que se encuentra en services.js,para obtener todas las rutinas del usuario,para eso necesitamos el id del usuario,que lo obtenemos del perfil del usuario,que lo obtenemos mediante el servicio de getUserProfile,que se encuentra en services.js
const MisRutinas=()=>{
    const [rutinas,setRutinas]=useState([]);//Definimos el estado de las rutinas,que va a ser un array vacío,ya que al principio no tenemos ninguna rutina
    const navigation = useNavigation();
    useEffect(()=>{ 
        //Aquí vamos a obtener todas las rutinas del usuario,para eso vamos a usar el servicios de getRutinas,que se encuentra en services.js,para obtener todas las rutinas del usuario,para eso necesitamos el id del usuario,que lo obtenemos del perfil del usuario,que lo obtenemos mediante el servicio de getUserProfile,que se encuentra en services.js
        const fetchRutinas=async()=>{
            try{
                const perfil=await getUserProfile();
                const userId=perfil?.perfilUsuario?.id_usuario;
                const rutinasData=await getRutinas();
                const rutinasUsuario=rutinasData?.rutinas?.filter(rutina => rutina.id_usuario === userId) || [];
                setRutinas(rutinasUsuario);
            }catch(error){
                console.error("Error al obtener las rutinas del usuario:",error);

            }
        }
        fetchRutinas();
    }, []);
    return(
        <SafeAreaView style={styles.container}> 
            <Text style={styles.title}>Mis Rutinas</Text>
            {rutinas.length === 0 ? (
                 <View style={styles.MessageContainer}>
                    <Text style={styles.noRutinas}>No tienes rutinas creadas.</Text>
                    <Button title="Crear nueva rutina" onPress={() => navigation.navigate('CrearRutina')}></Button>
                 </View>
            ) : (
                rutinas.map((rutina) => (
                    <View key={rutina.id_rutina} style={styles.rutinaContainer}>
                        <Text style={styles.rutinaNombre}>{rutina.nombre_rutina}</Text>
                        <Text style={styles.rutinaDificultad}>Dificultad: {rutina.dificultad}</Text>
                        
                    </View>
                ))
            )}
        </SafeAreaView>
    );

}
const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:'#060606',
    },
    title:{ 
        fontSize:24,
        fontWeight:'bold',
        marginBottom:20,
        color:'#d30a0a',
        alignContent:'center',
         textAlign:'center',


    },
    MessageContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    noRutinas:{
        fontSize:18,
        color:'#888',
        textAlign:'center',
    },
    rutinaContainer:{
        marginBottom:15,
        padding:15,
        backgroundColor:'#1e1b1b',
        borderRadius:10,
    },
    rutinaNombre:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff',
    },
    rutinaDificultad:{
        fontSize:16,
        color:'#ffffff',   
        textAlign:'center',

    },
});
export default MisRutinas;