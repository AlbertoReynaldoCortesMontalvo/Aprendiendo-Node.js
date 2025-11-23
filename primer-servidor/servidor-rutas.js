const http = require('http'); 

const server = http.createServer((req, res) => {
    const { method, url } = req; 

    console.log(`${method} ${url}`); 

    // configurar header comùn
    res.setHeader('Content-Type', 'text/html; charset=utf-8'); 

    if(url === '/' && method === 'GET') {
        res.statusCode = 200;
        res.end(`
            <h1> Pàgina principal </h1>

            <nav>
                <a href="/about"> Acerca de </a>
                <a href="/contact"> Contacto </a>
                <a href="/api/usuarios"> API usuarios </a>
            </nav>            
        `);
    } else if(url === "/about" && method === 'GET' ) {
        res.statusCode = 200; 

        res.end(`
            <h1> Acerca de </h1>
            <p>Este es un servidor Node.js creado para aprender HTTP</p>
            <a href="/"> Volver al inicio </a>
        `);
    } else if( url === "/contact" && method === "GET") {
        res.statusCode = 200; 

        res.end(`
            <h1> Contact </h1>
            <p>Email: contcto@ejemplo.com </p>
            <a href="/">Volver al inicio </a>
        `);
    } else if (url === "/api/usuarios" && method === 'GET') {
        // Cambiar a JSON para APIs
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;

        const usuarios = [
            {id: 1, nombre: 'Juan', edad: 25 },
            {id: 2, nombre: 'Maria', edad: 30 },
            {id: 3, nombre: 'Pedro', edad: 55 }
        ];

        res.end(JSON.stringify(usuarios));

    } else {
        res.statusCode = 404;
        res.end(`
            <h1>Error 404</h1>
            <p>Pàgina no encontrada</p>
            <p>Ruta solicitada: ${url}</p>
            <a href="/" >Volver al inicio</a>
        `);
    }
});

const PORT = 3001;
server.listen(PORT, ()=>{
    console.log(`Servidor con rutas corriendo en http://localhost:${PORT}`); 
})