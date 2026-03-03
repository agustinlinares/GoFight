//Vamos a crear un componente para los inputs de texto,que van a contar con iconos cada uno
import React from 'react';
import {View,TextInput,StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
//Tenemos los iconos de Ionicons
//Vamos a implementar hovers dentro de los inputs de texto,para que se vean mejor y sean más interactivo y se sienta vivo

const TextInputComponent=({placeholder,value,onChangeText,secureTextEntry,iconName})=>{
    return(
        <View style={styles.ButtonContainer}> 
            <Ionicons name={iconName} size={20} color="gray" style={styles.IconStyle}/>
            <TextInput style={styles.TextInputStyle} placeholder={placeholder} value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry}/>
        </View>
    )
}
const styles=StyleSheet.create({
    ButtonContainer:{
        flexDirection:'row',
        alignItems:'center',
        borderColor:'gray',
        borderWidth:1,
        borderRadius:5,
        paddingHorizontal:10,
        marginBottom:10,
        backgroundColor:'transparent',
        color:'red'
    },
    IconStyle:{
        marginRight:10,
    },
    TextInputStyle:{
        flex:1,
        height:40,
        borderRadius:5,
    }
})
export default TextInputComponent;

    