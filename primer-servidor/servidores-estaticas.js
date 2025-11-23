// Servidor de archivos estaticos

const http = require('http');
const fs = require('fs');
const path = require('path'); 
const { url } = require('inspector');


// Tipos de MIME comunes
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/js',
    'json': 'aplication/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg', 
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-ico',
    '.txt': 'text/plain'
}

const server = http.createServer((req, res)=> {
    console.log(`${req.method} ${res.url}`);


    // construir la ruta del archivo
    let filePath = '.' + req.url;

    // se pide la raíz, regresar insdx.html

    if(filePath === '/') {
        filePath = './index.html';
    }


    // Obtener la extesión del archivo
    const extname = String(path.extname(filePath)).toLowerCase();

    // Determinar el tipo de contenido
    const contentType = mimeTypes[extname] || 'application/octet-stream'; 

    // Leer el archivo
    fs.readFile(filePath, (error, content)=> {
        if(error) {
            if(error.code === 'ENOENT') {
                // Mensaja archivo no encontrado 
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text-html');
                res.end(`
                    <h1>404 - Archivo no encontrado</h1>
                    <p> No se encontró ${req.url}</p>
                `);
            } else {
                // Eror de servidor
                res.code = 500; 
                res.end(`Error del servidor ${url.code}`); 
            }
        } else {
            // archivo encontrado
            res.status = 200;
            res.setHeader('Content-Type', contentType);
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3003;
server.listen(PORT, ()=> {
    console.log(`Servidor de archovps estáticos en http://localhost:${PORT}`);
    console.log(`Coloca archivos HTML, CSS en el mismo directorio`); 
});
