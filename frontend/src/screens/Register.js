import react from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrolView, ScrollView,ActivityIndicator} from 'react-native';

import {useState,useEffect} from 'react';
import {registerUser} from '../services/services';
import Button from '../components/Button';
import TextInputComponent from '../components/TextInput';
import { Link } from '@react-navigation/native';

//Traemos el servicio para poder registrar el usuario desde el frontend,que es la función que hemos creado en services.js,que se encarga de hacer la petición a la API para registrar el usuario en la base de datos

export default function Register({}){
         const [nombre,setNombre]=useState('');
         const [apellido,setApellido]=useState('');
            const [email,setEmail]=useState('');
            const [password,setPassword]=useState('');
            const [confirmPassword,setConfirmPassword]=useState('');
            const [message,setMessage]=useState('');
            const [laoding,setLoading]=useState(false);

            //Tenemos los hooks necesarios para manejar el esatdo de los campos formularios
           //Antes de empezar con la lógica de los hooks,vamos a poner una pantalla de carga
           //Vamos a simular una pantalla de carga durante 2-3 segundos
        //Empezamos metiendo un UseEffect para simular la pantalla de carga
        useEffect(()=>{
            setLoading(true);
            setTimeout(()=>{
                //Simulamos una carga de 2-3 segundos
                setLoading(false);
                //Indicamos que la carga ha termiando,para que se muestre la pantalla de registro
            },2000);
        },[]);
         if(laoding){
            return(
                <View style={styles.Container}>
                    <ActivityIndicator size="large" color="#ff0000"/>
                </View>
            )


         }
          const handleClick=async()=>{
              if(!nombre || !apellido || !email || !password || !confirmPassword){
                   setMessage('Por favor,complete todos los campos');
                   
              }
              else if(password!==confirmPassword){
                   setMessage('Las contraseñas no coinciden');
              }
                else{
                    await registerUser(nombre,email,password,'user');
                    setNombre('');
                    setApellido('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setMessage('');
                }

          }
            return(
                <View style={styles.Container}>
                    <ScrollView style={styles.FormStyle}>
                        <View style={styles.ViewStyle}>
                            <Text style={styles.TitleStyle}>GoFight</Text>
                           
                        </View>
                        <View>
                            <TextInputComponent placeholder="Nombre" value={nombre} onChangeText={setNombre} iconName="person"/>
                        </View>
                        <View>
                            <TextInputComponent placeholder="Apellido" value={apellido} onChangeText={setApellido} iconName="person"/>
                        </View>
                        <View>
                            <TextInputComponent placeholder="Email" value={email} onChangeText={setEmail} iconName="mail"/>
                        </View>
                        <View>
                            <TextInputComponent placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} iconName="lock"/>
                        </View>
                        <View>
                            <TextInputComponent placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} iconName="lock"/>
                        </View>
                        <View>
                            <Button title="Registrar" onPress={handleClick}/>
                       
                        </View>
                        <View>
                            <Text style={styles.Mensajes}>{message}</Text>
                            <Text>
                            <Link to='/login' style={styles.LinkStyle}>¿Ya tienes una cuenta? Inicia sesión</Link>
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            )
}


const styles=StyleSheet.create({
    //Vamos a definir los estilos para la pantalla de registro
      Container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        
        
      },
      TitleStyle:{
        fontSize:24,
        fontWeight:'bold',
        marginBottom:20,
        marginTop:20,
        margin:0,
        alignContent:'center',
        textAlign:'center',


      },
      ViewStyle:{
        width:'100%',
        marginBottom:20,
        padding:20,
        borderRadius:10,
        backgroundColor:'#f2f2f2',
        
      },
      FormStyle:{
        width:'100%',
        marginBottom:20,
        padding:20,
        borderRadius:10,
        backgroundColor:'#f2f2f2',
      },

      TextInput:{
        width:'100%',
        height:40,
        borderColor:'gray',
        borderWidth:1,
        marginBottom:10,
        borderRadius:5,
        paddingHorizontal:10,


      },
      ButtonStyle:{
        width:'100%',
        height:40,
        backgroundColor:'#007bff',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
      },
      Mensajes:{
        color:'red',
        marginBottom:10,
        textAlign:'center',
      },
      LinkStyle:{
        color:'#007bff',
        textAlign:'center',
        marginTop:10,
      }
})