// controllers/Pedidos.js
import { supabase } from '../db/db.js';

export const crearPedido = async (req, res) => {
    try {
        const { usuario_id, estado, total_pedido, direccion_entrega } = req.body;

        // Validar que se envíe el id del usuario
        if (!usuario_id) {
            return res.status(400).json({ msg: "El id de usuario es obligatorio." });
        }

        // Insertar el nuevo pedido en Supabase
        const { data: pedidoCreado, error } = await supabase
            .from('pedidos')
            .insert([
                { 
                    usuario_id, 
                    estado: estado || 'pendiente', 
                    total_pedido, 
                    direccion_entrega 
                }
            ])
            .select()
            .single();

        // Controlar si hubo un error al guardar
        if (error) {
            return res.status(400).json({ msg: "Error al crear el pedido", error: error.message });
        }

        // Responder con éxito
        res.status(201).json({
            msg: "Pedido creado con éxito en Supabase",
            pedido: pedidoCreado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno en el servidor" });
    }
};