// Router/Pedidos.js
import { Router } from 'express';
import { crearPedido } from '../controllers/Pedidos.js';

const router = Router();

// Definimos el método POST para crear un pedido
router.post('/', crearPedido);

export default router;