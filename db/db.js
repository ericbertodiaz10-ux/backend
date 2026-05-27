import "dotenv/config"; // variables de entorno para la conexion de base de datos 
import { createClient } from'@supabase/supabase-js'; //importar la libreria de su 
 
//crear conexion de la base de datos utilizando la variable de entorno
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

//verificar las variables de etorno se hayan cargado correctamente 
if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: Las variables de entorno SUPERBASE_URL y SUPERBASE_KEY no se han cargado");
    process.exit(1); 
}

//conexion a la base de datos de supabase 
 export const supabase = createClient(supabaseUrl, supabaseKey);
 
 export const conectaDB = () => {
    console.log("✅ conexión a la base de datos de supabase establecida correctamente")
 }
