// Importa el módulo de Express para crear un servidor web
const express = require('express');
// Importa el módulo 'path' para trabajar con rutas de archivos y directorios
const path = require('path');

// Crea una instancia de una aplicación Express
const script = express();

// Configura la carpeta "public/templates" como carpeta de archivos estáticos
// Esto significa que los archivos en esa carpeta estarán disponibles de forma pública
script.use(express.static(path.join(__dirname, '..', 'public')));

// Define una ruta para manejar la solicitud GET en la raíz ("/")
// y envía el archivo "index.html" desde la carpeta "public/templates"
script.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Define el puerto en el que el servidor escuchará las solicitudes
const port = 3000;
// Inicia el servidor y muestra un mensaje en la consola cuando está corriendo
script.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
