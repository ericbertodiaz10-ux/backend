// 1. Renombramos los imports usando "as" para que no choquen con tus controladores
import { 
    UserModel, 
    crearUsuario as crearUsuarioModelo, 
    actualizarUsuario as actualizarUsuarioModelo, 
    eliminarUsuario as eliminarUsuarioModelo 
} from "../models/User.js";

// Obtener todos los usuarios
export const usuarios = async (req, res) => {
    // Corregido: Se cambió "UserModels" por "UserModel" según tu import inicial
    const { data, error } = await UserModel.obtenerTodos(); 
    
    if (error) {
        return res.status(500).json({ error: "Error al obtener los usuarios" });
    }
    return res.status(200).json(data);
};

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
    const { nombre, email, rol } = req.body; // Corregido: "emaail" -> "email"

    // Validacion de datos 
    if (!nombre || !email || !rol) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    // Corregido: Llamamos a la función renombrada del modelo
    const { data, error } = await crearUsuarioModelo(nombre, email, rol);
    
    if (error) {
        return res.status(500).json({ error: "Error al crear el usuario" });
    }
    
    return res.status(201).json({
        message: "Usuario creado exitosamente", // Corregido: "nessage" -> "message"
        usuario: data[0]
    });
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, rol } = req.body;

    // Validando los datos 
    if (!nombre || !email || !rol) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    try {
        // Corregido: Llamamos a la función renombrada del modelo
        const { data, error } = await actualizarUsuarioModelo(id, nombre, email, rol);

        if (error) {
            return res.status(400).json({ message: "Error al actualizar el usuario", error: error.message });
        }
        
        return res.status(200).json({
            message: "Usuario actualizado exitosamente",
            usuario: data
        });
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        // Corregido: Llamamos a la función renombrada del modelo
        const { data, error } = await eliminarUsuarioModelo(id);
        
        if (error) {
            // Corregido: "retun.res" -> "return res"
            return res.status(400).json({ message: "Error al eliminar usuario", error: error.message });
        }

        // Si es data no tienes datos vacíos 
        // Corregido: "lenth" -> "length"
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        return res.status(200).json({
            message: "Usuario eliminado exitosamente",
            usuario: data[0]
        });

    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};