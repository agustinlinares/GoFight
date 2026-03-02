//Vamos a traer la base de datos para poder hacer las consultas desde el frontend
const BASE_URL='http://192.168.1.X:3000/api';

//Ahora vamos a crear cada una de las funciones para hacer las peticiones a la API,tendremos que hacer un fecth,para poder conectarse a la API
//Empezamos por el auth,que es la función de resgistro de usuarios
export const registerUser=async(name,email,password,perfil)=>{
     try{
         const response=await fetch(`${BASE_URL}/auth/register`,{
             method:'POST',
             headers:{
                'Content-Type':'application/json'
                
                
             }
             ,
             body:JSON.stringify({name,email,password,perfil})//Pasamos los datos a json para poder enviarlos bien a la base de datos
         });//Acvcedemos a la ruta de registro como en el Insomnia,si también te fijas bien en los headers,se declara como un tipo de contendio,representando los datos que vamos a enviar
         //Una vez que ya tengamos el response,toca definir el metodo,que se va a emplear,que en este caso va a ser de tipo POST
         
         const data=await response.json();//Lo pasamos a json para poder usarlo en el frontend
         if(!response.ok){
            throw new Error(data.message || 'Error al registrar el usuario');

         }
         else{
            alert('Usuario registrado exitosamente');
            //Nos dará una alerta de que el usuario se ha registrado correctamente,si todo
         }
     }catch(error){
        alert('Error al registrar el usuario',error.message);
        //Nos dará una alerta de error en caso de que no hayampos registrado el usuario correcto
        
     }
     
}