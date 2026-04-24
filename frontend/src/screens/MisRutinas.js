//Aquí vamos la pantalla,dónde se mnostrará todas las rutinas del usuario,para eso vamos a crear un nuevo componente llamado MisRutinas.js,que se va a encargar de mostrar todas las rutinas del usuario,para eso vamos a usar el servicio de getRutinas,que se encuentra en services.js,para obtener todas las rutinas del usuario,para eso necesitamos el id del usuario,que lo obtenemos del perfil del usuario,que lo obtenemos mediante el servicio de getUserProfile,que se encuentra en services.js
import React from "react";
import {Text,View,StyleSheet,TextInput} from "react-native";
import { getRutinas } from "../services/services";
import { getUserProfile } from "../services/services";
import { getCatalogoEjercicios } from "../services/services";
import { useState,useEffect } from "react";
import Button from "../components/Button.js";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

//Una vez que hayamos conseguido todas las importaciones necesarias,procedemos a crear el componente de MisRutinas,que se va a encargar de mostrar todas las rutinas del usuario,para eso vamos a usar el servicio de getRutinas,que se encuentra en services.js,para obtener todas las rutinas del usuario,para eso necesitamos el id del usuario,que lo obtenemos del perfil del usuario,que lo obtenemos mediante el servicio de getUserProfile,que se encuentra en services.js
const MisRutinas=()=>{
    const [rutinas,setRutinas]=useState([]);//Definimos el estado de las rutinas,que va a ser un array vacío,ya que al principio no tenemos ninguna rutina
    const [modalVisible,setModalVisible]=useState(false);//Definimos el estado del modal,que va a ser un booleano,ya que al principio el modal no se va a mostrar
    const [ejercicios,setEjercicios]=useState([]);//Definimos el estado de los ejercicios,que va a ser un array vacío,ya que al principio no tenemos ningún ejercicio
    const navigation = useNavigation();
    useEffect(()=>{ 
        //Aquí vamos a obtener todas las rutinas del usuario,para eso vamos a usar el servicios de getRutinas,que se encuentra en services.js,para obtener todas las rutinas del usuario,para eso necesitamos el id del usuario,que lo obtenemos del perfil del usuario,que lo obtenemos mediante el servicio de getUserProfile,que se encuentra en services.js
        const fetchRutinas=async()=>{
            try{
                const perfil=await getUserProfile();
                const userId=perfil?.perfilUsuario?.id_usuario;
                const rutinasData=await getRutinas();
                const rutinasUsuario=rutinasData?.rutinas?.filter(rutina => rutina.id_usuario === userId) || [];
                const ejerciciosData= await getCatalogoEjercicios();
                console.log('Obteniendo todos los ejercicios:', ejerciciosData); // Obtenemos los ejercicios de la primera rutina del usuario,puedes cambiar el índice para obtener los ejercicios de otra rutina
               
            }catch(error){
                console.error("Error al obtener las rutinas del usuario:",error);

            }
        }
        fetchRutinas();
    }, []);
    return(
        <SafeAreaView style={styles.container}> 
          <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={()=>setModalVisible(false)}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                <View style={{width:300,padding:20,backgroundColor:'#fff',borderRadius:10}}>
                    

                    <Text style={{fontSize:18,fontWeight:'bold',marginBottom:10}}>¿Cual va a ser el nombre de la rutina?</Text>
                    <TextInput style={{borderWidth:1,borderColor:'#ccc',padding:10,borderRadius:5,marginBottom:10}} placeholder="Nombre de la rutina"></TextInput>  
                    
                    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                        <Button title="Cancelar" onPress={()=>setModalVisible(false)}></Button>
                        <Button title="Eliminar" onPress={()=>{}}></Button>
                    </View>
                </View>
            </View>
          </Modal>
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
                        <Text style={[
                            styles.rutinaDificultad,
                            rutina.dificultad === 'Fácil' ? { borderColor: '#4CAF50', color: '#fff' 
                             
                            } :
                            rutina.dificultad === 'Intermedio' ? { borderColor: '#FFC107', color: '#fff'

                             } :
                            rutina.dificultad === 'Avanzado' ? { borderColor: '#F44336', color: '#fff' } :
                            { borderColor: '#888', color: '#fff' }
                        ]
                        }>Dificultad: {rutina.dificultad}</Text>
                      

                        
                    </View>

                ))
            )}
            <Button title="Crear nueva rutina" onPress={() => setModalVisible(true)}></Button>
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
        fontSize: 16,
  color: '#d30a0a',
  borderWidth: 1,
   
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 6,
  alignSelf: 'flex-start',
  letterSpacing: 1,
  textTransform: 'uppercase',
  marginBottom: 6,
    },
    rutinaDificultad:{
 fontSize: 8,
  color: '#d30a0a',
  borderWidth: 1,
  borderColor: '#d30a0a',
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 6,
  alignSelf: 'flex-start',
  letterSpacing: 1,
  textTransform: 'uppercase',
  marginBottom: 6,

    },
});
export default MisRutinas;