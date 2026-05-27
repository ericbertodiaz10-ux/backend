import { Router } from 'express';
import { crearFactura } from '../controllers/facturas.js';

const router = Router();

router.post('/', crearFactura);

export default router; // Tiene que decir export default