// controllers/facturas.js
import { supabase } from '../db/db.js'; 

export const crearFactura = async (req, res) => {
    try {
        const { usuario_id, pedido_id, impuesto_porcentaje, productos } = req.body;

        // Validar que el cliente envíe productos en el arreglo
        if (!productos || productos.length === 0) {
            return res.status(400).json({ msg: "Debe incluir al menos un producto." });
        }

        // 1. Calcular totales recorriendo la lista de productos
        let subtotal = 0;
        productos.forEach(prod => {
            subtotal += prod.cantidad * prod.precio_unitario;
        });

        const impuestos = subtotal * (impuesto_porcentaje / 100);
        const total = subtotal + impuestos;

        // 2. Guardar la Cabecera en la tabla 'Facturas' de Supabase
        const { data: facturaCreada, error: errorFactura } = await supabase
            .from('Facturas') 
            .insert([
                { 
                    usuario_id, 
                    pedido_id, 
                    subtotal, 
                    impuestos, 
                    total 
                }
            ])
            .select() 
            .single();

        // Controlar si hubo un fallo al guardar la cabecera
        if (errorFactura) {
            return res.status(400).json({ msg: "Error al crear cabecera de factura", error: errorFactura.message });
        }

        // 3. Mapear los productos añadiendo el 'factura_id' que generó Supabase
        const detallesAInsertar = productos.map(prod => ({
            factura_id: facturaCreada.id, 
            producto_id: prod.producto_id,
            cantidad: prod.cantidad,
            precio_unitario: prod.precio_unitario,
            subtotal_linea: prod.cantidad * prod.precio_unitario
        }));

        // 4. Guardar los detalles en lote en la tabla 'Detalles_Factura'
        const { error: errorDetalles } = await supabase
            .from('Detalles_Factura')
            .insert(detallesAInsertar);

        if (errorDetalles) {
            return res.status(400).json({ msg: "Error al insertar los detalles", error: errorDetalles.message });
        }

        // 5. Responder con éxito
        res.status(201).json({
            msg: "Factura y detalles guardados con éxito en Supabase",
            factura_id: facturaCreada.id,
            total_facturado: total
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno en el servidor" });
    }
};