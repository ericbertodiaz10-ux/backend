import { Router } from "express";

//importar la logica del controller
import {
  usuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/User.js";

// CORREGIDO: "Router" va con R mayúscula
const router = Router();


//definimos las rutas para los usuarios
router.get("/", usuarios);
router.post("/crear", crearUsuario);
router.put("/actualizar/:id", actualizarUsuario);
router.delete("/eliminar/:id", eliminarUsuario);

// CORREGIDO: Exportamos la variable "router" que creamos arriba en minúscula
export default router;