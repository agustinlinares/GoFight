//Vamos a definir el header de la aplicación,que va a ser un componente esencial para casí todas las paginas
import React from 'react';
import {View,Text,StyleSheet,SafeAreaView, Platform, StatusBar} from 'react-native';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { getUserProfile } from '../services/services';
import { useEffect, useState } from 'react';

     
const Header=()=>{
     const [userProfile,setUserProfile]=useState(null);
      useEffect(()=>{
        //Aquí vamos a definir la lógica para obtener el perfil del usuario
        const fetchUserProfile=async()=>{
            try{
                  const profile=await getUserProfile();
                    setUserProfile(profile);


            }catch(error){
                  console.error('Error al obtener el perfil del usuario',error);

            }
        }
        fetchUserProfile();
      },[]);
      return(
            <SafeAreaView>
                  <View style={style.HeaderContainer}>
            
            <View style={style.FirstRow}>
            <MaterialCommunityIcons name='menu' size={24} color='white'/>
              </View>
              <View style={style.SecondRow}>
             <Text style={style.TitleStyle}>GoFight</Text>
              <Text style={style.TextStyle}>Bienvenido: {userProfile ? userProfile.perfilUsuario.nombre: 'Invitado'}</Text>
           <View style={style.UserProfileContainer}>
                  <Ionicons name='person-circle' size={24} style={style.IconStyle}/>
             </View>
             <View>
                  <Text style={style.SubtitleStyle}>Tu entrenador personal</Text>
                  </View>
            </View>
            </View>
         </SafeAreaView>
      )
}
const style=StyleSheet.create({
     HeaderArea:{
      //Vamos a definir los estilos del SafeAreaView,queremos que el SafeAreaView sea compatible tanto en Andorid como IOS
      
      backgroundColor:'#FF2233',
      paddingTop:Platform.OS==='android' ? StatusBar.currentHeight : 0,//Ajustamos el SafeAreaView para android
   

        
     },
      HeaderContainer:{
                  flexDirection:'row',
                  justifyContent:'space-between',
                  alignItems:'center',
                  padding:10,
                  borderBottomColor:'rgba(255,255,255,0.06)',
                  borderBottomWidth:1,
                  borderBottomStyle:'solid',
                  backgroundColor:'#FF2233',
                  borderRadius:10,
                  shadowColor:'rgba(255,0,0,0.5)',
                  shadowOffset:{width:0,height:2},
                  shadowOpacity:0.5,
                  shadowRadius:12,
                  paddingHorizontal:20,
                  paddingVertical:15,
                  marginBottom:10,
                  flexWrap:'wrap',
                  gap:10,
                



                
                  
      },
      FirstRow:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            gap:10,
            flexWrap:'wrap',


      },
      SecondRow:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            gap:10,
            flex:1,
            flexWrap:'wrap',
            justifyContent:'space-between',
            paddingHorizontal:10,

      },
      TitleStyle:{
            fontSize:20,
            fontWeight:'700',
            color:'#ffffff',
            textShadowColor:'rgba(255, 255, 255, 0.5)',
            textShadowOffset:{width:0,height:2},
            textShadowRadius:12,
            fontFamily:'Helvetica',
            textTransform:'uppercase',
            letterSpacing:1.1,
            

      },
      TextStyle:{
            fontSize:10,
            fontWeight:'bold',
            color:'#ffffff',
            textShadowColor:'black',
            textShadowOffset:{width:1,height:1},
            textShadowColor:'rgba(255, 255, 255, 0.5)',
            shadowOffset:{width:0,height:2},
            shadowOpacity:0.5,
            shadowRadius:12,
            textShadowRadius:9,
            fontFamily:'Helvetica',
            textTransform:'uppercase',
            letterSpacing:2,
            paddingLeft:5,

      },
      SubtitleStyle:{
            fontSize:6,
            color:'white',
            textShadowColor:'black',
            textShadowOffset:{width:1,height:1},
            textShadowRadius:5,
                  fontFamily:'Helvetica',
                  textTransform:'uppercase',
                  letterSpacing:1.5,
                  marginTop:5,
                  textAlign:'center'
                   
                  
      },
      IconStyle:{
            color:'white',
      },
      UserProfileContainer:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            gap:5,
       
      }
})
export default Header;