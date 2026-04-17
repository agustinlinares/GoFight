//Aquí vamos a meter el ranking de los juegadores con sus puntos y demás, para que puedan ver su posición en el ranking mundial
import React, { useEffect, useState } from 'react';
import { getRanking } from '../services/services';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputComponent from '../components/TextInput';
const Ranking=()=>{
    const [ranking,setRanking]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [searchUser,setSearchUser]=useState('');
    //Estado para poder encontrar a un usuario en el ranking,para eso vamos a implementar un buscador,que va a ser un input de texto,que va a filtrar el ranking por el nombre del usuario,para poder encontrarlo más fácilmente,ya que si hay muchos usuarios en el ranking,puede ser difícil encontrarlo,por lo tanto,es importante implementar un buscador para poder encontrarlo más fácilmente
    //Tocará crear un servicio para obtener el ranking,que se va a basar en los puntos_ranking de cada usuario,que se van a actualizar cada vez que se registre una sesión en el historial,ya que cada vez que se registre una sesión en el historial,tenemos que actualizar las gamificaciones,por lo tanto,es importante actualizar el ranking cada vez que se registre una sesión en el historial,para ver si se actualiza correctamente
    useEffect(()=>{
        const fetchRanking=async()=>{
            try{
                const rankingData=await getRanking();
                setRanking(rankingData);
            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }
        fetchRanking();
    }, []);
    const UsuarioFiltrado=ranking.filter(jugador=>jugador.usuarios.nombre.toLowerCase().includes(searchUser.toLowerCase()));

    if(loading){
        return <View><Text>Cargando ranking...</Text></View>;
    }
    if(error){
        return <View><Text>Error: {error}</Text></View>;
    }
    return (
       <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Ranking de jugadores</Text>
        <TextInputComponent placeholder="Buscar jugador..." style={{marginBottom: 20}} value={searchUser} onChangeText={setSearchUser} />
        <ScrollView>
            {UsuarioFiltrado.map((jugador,index)=>(
                <View key={index} style={
                    [
                        styles.jugadorContainer,
                        index === 0 ? {backgroundColor: '#ffd700'} : {}, 
                        index === 1 ? {backgroundColor: '#c0c0c0'} : {}, 
                        index === 2 ? {backgroundColor: '#cd7f32'} : {}, 
                    ]
                }>
                    <Text style={styles.jugadorNombre}>{jugador.usuarios.nombre}</Text>
                    <Text style={styles.jugadorPuntos}>{jugador.puntos_ranking} puntos</Text>
                    <Text style={styles.jugadorPuntos}> {index + 1}</Text>
        
                    
                </View>
            ))}
        </ScrollView>
       </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#000000',
        borderBlockColor: '#484141',
        borderWidth: 1,
        borderRadius: 8,
        shadowColor: '#484141',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#f7f2f2',
        letterSpacing: 1,
        fontFamily: 'helvetica',
        textAlign: 'center',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#484141',


    },
    jugadorContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
  padding: 14,
  borderRadius: 12,
  backgroundColor: '#1a1a1a',
  borderLeftWidth: 4,
  borderLeftColor: '#e72b2b',
  shadowColor: '#e72b2b',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 6,

    },
    jugadorNombre: {
        fontSize: 18,
        color: '#ffffff',
        letterSpacing: 1,
        fontWeight: 'bold',
        fontFamily: 'helvetica',
    },
    jugadorPuntos: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        letterSpacing: 1,
        fontFamily: 'helvetica',
    },

});
export default Ranking;