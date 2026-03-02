import react from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrolView, ScrollView,ActivityIndicator} from 'react-native';
import {useState,useEffect} from 'react';

export default function Register({}){
         const [nombre,setNombre]=useState('');
         const [apellido,setApellido]=useState('');
            const [email,setEmail]=useState('');
            const [password,setPassword]=useState('');
            const [confirmPassword,setConfirmPassword]=useState('');
            const [message,setMessage]=useState('');
            //Tenemos los hooks necesarios para manejar el esatdo de los campos formularios
           //Antes de empezar con la lógica de los hooks,vamos a poner una pantalla de carga
          const handleClick=async()=>{
              if(!nombre || !apellido || !email || !password || !confirmPassword){
                   setMessage('Por favor,complete todos los campos');
              }
          }
            return(
                <View>
                    <ScrollView>
                        <View>
                            <Text>Registro</Text>
                        </View>
                        <View>
                            <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre}/>
                        </View>
                        <View>
                            <TextInput placeholder="Apellido" value={apellido} onChangeText={setApellido}/>
                        </View>
                        <View>
                            <TextInput placeholder="Email" value={email} onChangeText={setEmail}/>
                        </View>
                        <View>
                            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true}/>
                        </View>
                        <View>
                            <TextInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true}/>
                        </View>
                        <View>
                            <TouchableOpacity onPress={handleRegister}>
                                <Text>Registrar</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            {message ? <Text>{message}</Text> : null}
                        </View>
                    </ScrollView>
                </View>
            )
}