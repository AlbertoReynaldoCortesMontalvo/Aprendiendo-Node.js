const fs = require('fs'); 

// leer archivo
fs.readFile('./package.json', 'utf-8', (err, data) => {
    if(err) throw err; 
    console.log('Contenido: ', JSON.parse(data)); 
}); 

// Escribir contenido
const contenido = 'Este es mi primer archivo creado con Node.js';
fs.writeFile('./saludo.txt', contenido, (err) => {
    if(err) throw err;
    console.log('Archivo creado exitosamente');
}); 

// versión con promises (moderna)
const fsPromises = require('fs').promises; 

async function leerArchivo() {
    try {
        const data = await fsPromises.readFile('./package-json', 'utf-8');
	console.log('Contenido async: ', JSON.parse(data));
    } catch( err ) {
	console.log('Error: ', err ); 
    }
}

leerArchivo();

