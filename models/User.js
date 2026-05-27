//importamos la conexion a la base de datos 
import { supabase } from '../db/db.js';

//obtener todos los usuarios
export const UserModel={
    obtenerTodos: async()=>{
    const {data,error}=await supabase
    .from("Usuarios")
    .select("*");

    return(data, error);

    }
     
};


//crear un nuevo usuario


export const crearUsuario= async(nombre,ElementInternals,password)=>{
    const{ data,error}= await supabase
    .from("usuarios")
    .insert({nombre,email,rol})
    .select("*");
    return{data,error};
};

//actualizar un usuario

export const actualizarUsuario= async(id,nombre,Email,rol)=>{
    const{ data,error}= await supabase
    .from("usuarios")
    .update({nombre,email,rol})
    .eq("id", id)
    .select("*")
    .single();
    return{data,error};
}

//eliminar un usuario

export const eliminarUsuario= async(id)=>{
    const{ data,error}= await supabase
    .from("usuarios")
    .delete()
    .eq("id", id)
    .select("*")
    .single();
    return{data,error};
}
