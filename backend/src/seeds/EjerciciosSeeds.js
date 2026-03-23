//Aquí vamos a implementar cada uno de los ejercicios,para que se puedan registrar en el historial,además de que se puedan mostrar en la pantalla de inicio,para que se puedan mostrar en la pantalla de inicio,tenemos que obtenerlos mediante un await,ya que cada vez que se registre una sesión en el historial,tenemos que actualizar las gamificaciones,por lo tanto,es importante probarlo en la pantalla de inicio,para ver si se actualizan correctamente
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const {PrismaClient}=require('../generated/prisma');//Traemos PrismaClient,que es la clase principal de Prisma,que nos permite interactuar con la base de datos
const {PrismaPg}=require('@prisma/adapter-pg');
const {Pool}=require('pg');
const pool=new Pool({
    connectionString:process.env.DATABASE_URL
})
const adapter=new PrismaPg(pool);
const prisma=new PrismaClient({
    adapter
})
const crearEjercicios=async()=>{
const ejercicios = [
  {
    "nombre": "Entrenamiento con Saco Pequeño (Pera Loca)",
    "categoria": "Pera",
    "url_video": "http://www.youtube.com/watch?v=WSNbHdaccgY"
  },
  {
    "nombre": "Combinaciones para sorprender al rival",
    "categoria": "Manoplas",
    "url_video": "http://www.youtube.com/watch?v=4PXJcTEOUQY"
  },
  {
    "nombre": "Bomba Cardiovascular con Saco",
    "categoria": "Cardio",
    "url_video": "http://www.youtube.com/watch?v=sSLFXjUSTXw"
  },
  {
    "nombre": "HIIT Boxeo Alta Intensidad (Sin material)",
    "categoria": "Cardio",
    "url_video": "http://www.youtube.com/watch?v=XIHvfwYVy4A"
  },
  {
    "nombre": "Rutina Boxeo para Saco #2",
    "categoria": "Saco",
    "url_video": "http://www.youtube.com/watch?v=_TQ1Joj_l_A"
  },
  {
    "nombre": "Potencia y Desplazamientos en Saco",
    "categoria": "Saco",
    "url_video": "http://www.youtube.com/watch?v=qOY7CaJrSoc"
  },
  {
    "nombre": "Técnica de Crochet y Hook",
    "categoria": "Saco",
    "url_video": "http://www.youtube.com/watch?v=0gtMKaCJ5I8"
  },
  {
    "nombre": "Agilidad de Pies y Trucos",
    "categoria": "Comba",
    "url_video": "http://www.youtube.com/watch?v=wqN5bRkZPK0"
  },
  {
    "nombre": "Desplazamientos y Giros Básicos",
    "categoria": "Comba",
    "url_video": "http://www.youtube.com/watch?v=zhWfajP4EVU"
  },
  {
    "nombre": "Entrenamiento Completo Estilo Boxeador",
    "categoria": "Comba",
    "url_video": "http://www.youtube.com/watch?v=xOk9UnkiWAo"
  }
];
  try{
    for(const ejercicio of ejercicios){
        await prisma.ejercicios.create({
            data:{
                nombre:ejercicio.nombre,
                categoria:ejercicio.categoria,
                url_video:ejercicio.url_video
            }
        })
    }
      
  }catch(error){
        console.error('Error al crear los ejercicios',error);
  }
}
crearEjercicios();