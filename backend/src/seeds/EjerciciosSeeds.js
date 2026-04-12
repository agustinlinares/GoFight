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
    nombre: 'Entrenamiento con Saco Pequeño (Pera Loca)',
    categoria: 'Pera',
    url_video: 'https://res.cloudinary.com/dqkti3ugw/video/upload/v1775826385/ssstik.io__evolutionpersonaltrainer_1775826266880_gzpg0h.mp4'
  },
  {
    nombre: 'Combinaciones para sorprender al rival',
    categoria: 'Manoplas',
    url_video: 'https://res.cloudinary.com/dqkti3ugw/video/upload/v1775828179/ssstik.io__imbrserker_1775828102295_btorvc.mp4'
  },
  {
    nombre: 'Bomba Cardiovascular con Saco',
    categoria: 'Cardio',
    url_video: 'https://res.cloudinary.com/dqkti3ugw/video/upload/v1775828449/ssstik.io__clandestinboxinggym_1775828432769_ylzkm5.mp4'
  },
  {
    nombre: 'HIIT Boxeo Alta Intensidad (Sin material)',
    categoria: 'Cardio',
    url_video: 'https://res.cloudinary.com/dqkti3ugw/video/upload/v1775997341/ssstik.io__growfitness_app_1775997310805_mtprf5.mp4'
  },
  {
    nombre: 'Rutina Boxeo para Saco #2',
    categoria: 'Saco',
    url_video: 'https://res.cloudinary.com/dqkti3ugw/video/upload/v1775997440/ssstik.io__mkboxingclub_1775997429276_f5f9cs.mp4'
  },
  {
    nombre: 'Potencia y Desplazamientos en Saco',
    categoria: 'Saco',
    url_video: 'https://res.cloudinary.com/dqkti3ugw/video/upload/v1775997585/ssstik.io__team_sanchez_boxeo_1775997577127_kpte9e.mp4'
  },
  {
    nombre: 'Técnica de Crochet y Hook',
    categoria: 'Saco',
    url_video: 'https://res.cloudinary.com/dqkti3ugw/video/upload/v1775997697/ssstik.io__team_sanchez_boxeo_1775997685107_otjlqo.mp4'
  },
  {
    nombre: 'Agilidad de Pies y Trucos',
    categoria: 'Comba',
    url_video: 'https://res.cloudinary.com/dqkti3ugw/video/upload/v1775997778/ssstik.io_1775997767948_kfu3hv.mp4'
  },
  {
    nombre: 'Desplazamientos y Giros Básicos',
    categoria: 'Comba',
    url_video: 'https://res.cloudinary.com/dqkti3ugw/video/upload/v1775997846/ssstik.io__molloyperu_1775997830880_moswdf.mp4'
  },
  {
    nombre: 'Entrenamiento básico de Comba',
    categoria: 'Comba',
    url_video: 'https://res.cloudinary.com/dqkti3ugw/video/upload/v1775997975/ssstik.io_1775997963173_fj4s7s.mp4'
  },
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