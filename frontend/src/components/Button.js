import React from 'react';
import {TouchableOpacity,Text,StyleSheet} from 'react-native';
const  Button=({title,onPress})=>{
    //En componentes vamos a definir como van a ser todos los buttons de la aplicación
    return(
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.ButtonStyle}>{title}</Text>
        </TouchableOpacity>
    )

}
const styles=StyleSheet.create({
    ButtonStyle:{
        backgroundColor:'#007bff',
        padding:10,
        borderRadius:5,
        color:'white',
        textAlign:'center',
        fontSize:16,
        fontWeight:'bold',
    }
})
export default Button;