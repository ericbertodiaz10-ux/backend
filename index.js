//importar toda la funcionalidad de express
import express from 'express';
import dotenv from "dotenv";
import { conectaDB, supabase } from "./db/db.js";
import userRouter from "./router/User.js";
import rutaFacturas from './Router/facturas.js';
import rutaPedidos from './Router/Pedidos.js';

dotenv.config(); //CARGAR LAS VARIABLES DE ENTORNO desde el archivo .evn

conectaDB(); //establecer la conexion de la base de datos supabase

//crear la app de express
const app = express();

//leer el json de las peticiones
app.use(express.json());

//crear la primera ruta
app.get("/", (req, res) => {
  res.json({
    Mensaje: "Bienvenido a mi clase de express",
    estado: "En linea",
    version: "1.0.0",
  });
});

//segunda ruta 
app.use('/api/facturas', rutaFacturas);


//tercera ruta
app.use('/api/pedidos', rutaPedidos);


//definimos el puerto
const PORT = 3000;

//poner npm ruta escuchar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchado en el puerto ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log(`Ruta Facturast:  http://localhost:${PORT}/api/facturas`);  
  console.log(`Ruta Pedidos:  http://localhost:${PORT}/api/pedidos`);  
}); 