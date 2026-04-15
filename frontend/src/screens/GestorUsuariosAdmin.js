//Aquí irá el gestor de usuarios,que va a ser una pantalla dónde el administrador va a poder gestionar a los usuarios,es decir,va a poder ver la lista de usuarios,eliminar usuarios,modificar usuarios,etc
import Button from '../components/Button';
import { useState} from 'react';
import TextInputComponent from '../components/TextInput';
import Header from '../components/HeaderComponent';
import Footer from '../components/Footer';
import { getAllUsers} from '../services/services';//Obtenemos la función para obtener todos los usuarios,que solo el admin puede usar,ya que es una función propia del administrador
import {View,Text,FlatList,TouchableOpacity,StyleSheet,Platform,StatusBar} from 'react-native';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

//Obtenemos el perfil del usuario primeramente para saber si es admin o no,ya que solo los admin pueden acceder a esta pantalla

const GestorUsuariosAdmin=()=>{
    const [isAdmin,setIsAdmin]=useState(false);
    const [loading,setLoading]=useState(true);
    const [usuarios,setUsuarios]=useState([]);//Aquí vamos a guardar la lista de usuarios que obtenemos del backend,para mostrarlos en la pantalla
    useEffect(()=>{
        //Aquí vamos a cargar todos los usuarios,pero antes vamos a comprobar si el usuario es admin o no,ya que solo los admin pueden acceder a esta pantalla
        const fetchUsuarios = async () => {
            try{
                const usuarios=await getAllUsers();
                setUsuarios(usuarios);
                setIsAdmin(true);//Si obtenemos la lista de usuarios,es porque el usuario es admin,ya que solo los admin pueden obtener la lista de usuarios,por lo tanto,establecemos el estado de isAdmin en true
                console.log('Usuarios obtenidos en GestorUsuariosAdmin:', usuarios);
                console.log('isAdmin en GestorUsuariosAdmin:', isAdmin);

        }
        catch(error){
            console.error('Error al obtener los usuarios:', error);
        }
        finally{
            setLoading(false);

        }
        }
        fetchUsuarios();

    },[])
      return(
        <SafeAreaView style={styles.Container}>
        
            <Header title="Gestor de Usuarios" />
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                {loading ? (
                    <Text style={styles.TextStyle}>Cargando usuarios...</Text>
                ) : isAdmin ? (
                    <FlatList
                        data={usuarios}
                        keyExtractor={(item) => item.id_usuario.toString()}
                        contentContainerStyle={styles.FlatList}
                        renderItem={({ item }) => ( 
                            <View style={styles.Card}>
                               <View style={styles.RegistrosStyle}>
                                {item.rol==='admin' && <Ionicons name="shield-checkmark" size={15} color="#ff4444" />}
                                {item.rol!=='admin' && <Ionicons name="person" size={15} color="#ff4444" />}
                                <Text style={styles.TextStyle}>nombre:{item.nombre}</Text>
                                   
                                
                                <Text style={styles.TextStyle}>email:{item.email}</Text>
                                 
                                <Text style={styles.TextStyle}>rol:{item.rol}</Text>
                                
                                  </View>
                               <View style={styles.RegistrosStyle}>
                                 <TouchableOpacity style={{padding:10,borderRadius:5}}>
                                  <Ionicons name="trash" size={15} color="#ff4444" />
                                </TouchableOpacity>
                                 <TouchableOpacity style={{padding:10,borderRadius:5}}>
                                  <Ionicons name="shield-checkmark" size={15} color="#ff4444" />
                                </TouchableOpacity>
                                 <TouchableOpacity style={{padding:10,borderRadius:5}}>
                                  <Ionicons name="create" size={15} color="#ff4444" />
                                </TouchableOpacity>
                                </View>

                                {/* Aquí podríamos agregar botones para eliminar o modificar el usuario */}
                            </View>
                            
                        )}
                    />
                ) : (
                    <Text>No tienes permisos para acceder a esta pantalla</Text>
                )}
            </View>
            <Footer />
        </SafeAreaView>
    )
        
}
const styles=StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:'black',
        
     
    },
    FlatList:{
        
    padding: 20,
  backgroundColor: '#000',
  flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    
    


    },
    
    Card:{
  backgroundColor: '#111',
  padding: 16,
  borderRadius: 12,
  marginBottom: 12,
  borderLeftWidth: 4,
  borderLeftColor: '#ff0000',
  borderWidth: 0, 
  shadowColor: '#ff0000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 5,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',

        
    
        
    },
  RegistrosStyle:{
    fontSize: 14,
  fontWeight: '600',
  color: '#ffffff',
  flexDirection: 'column',
    gap: 4,

     
  },
    TextStyle:{
        fontSize: 13,
  fontWeight: 'bold',
  letterSpacing: 1,
  color: '#ffffff',
  fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
  textShadowColor: 'rgba(255, 0, 0, 0.5)',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 4, // ← añade esto

    }
   

        })
export default GestorUsuariosAdmin;
