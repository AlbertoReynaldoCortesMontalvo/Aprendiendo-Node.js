// Servidor con diferentes Métodos HTTP 

const http = require('http');

let tareas = [
    {id: 1, titulo: 'Aprender Node.js', completada: false },
    {id: 2, titulo: 'Crear Servidor HTTP', completada: true }

]; 

let siguienteId = 3; 

const server = http.createServer((req, res) => {
    const { method, url } = req;

    console.log(`${method} ${url}`); 

    // rutas para la api de tareas
    // GET api/tareas - Obtener todas las tareas
    if(url === '/api/tareas' && method === 'GET') {
        res.setHeader('Content-Type', 'applications/json');
        res.statusCode = 200;
        res.end(JSON.stringify(tareas)); 
    }

    // Post
    else if(url === '/api/tareas' && method === 'POST'){
        let body= '';
        
        // Leer datos del body (vienen en chunks/ pedazos)
        req.on('data', chunk => {
            body += chunk.toString(); 
        }); 

        // Cuando termine de recibir todos los datos
        req.on('end', ()=> {
            try {
                const nuevaTarea = JSON.parse(body); 

                // Crear la tarea con un ID
                const tarea = {
                    id: siguienteId++,
                    titulo: nuevaTarea.titulo,
                    completada: false
                };

                tareas.push(tarea); 

                res.setHeader('Content-Type', 'application/json'); 
                res.statusCode = 201; // 201 = Created 
                res.end(JSON.stringify(tarea)); 

            } catch(error) {
                res.statusCode = 400; // Bad Request
                res.end(JSON.stringify({ error: 'Datos Invalidos'}));
            }
        });
    }
    // DELETE /api/tareas/:id 
    else if(url.startsWith('/api/tareas') && method === 'DELETE') {
        const id = parseInt(url.split('/')[3]);
        const index = tareas.findIndex( t => t.id === id);

        if(index !== -1) {
            tareas.splice(index, 1);

            res.statusCode = 204; // No content
            res.end();
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify( { error: 'Tarea no encontrada '} )); 
        }
    }

    // PUT /api/tareas/:id - ACtualizar una tarea
    else if(url.startsWith('api/tareas/') && method === 'PUT') {
        const id = parseInt(url.split('/')[3]);
        let body = '';

        req.on('end', ()=> {
            try {
                const datosActualizados = JSON.parse(body);
                const tarea = tareas.find( t => t.id == id);

                if(tarea) {
                    tarea.titulo = datosActualizados.titulo || tarea.titulo;
                    tarea.completada = datosActualizados.completada !== undefined
                        ? datosActualizados.completada
                        : tarea.completada; 

                        res.setHeader('Content-Type', 'application/json');
                        res.statusCode = 200; 
                        res.end(JSON.stringify(tarea))
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify( { error: 'Tarea no encontrada' } )); 
                }

            } catch(error) {
                res.statusCode = 400;
                res.end(JSON.stringify( { error: 'Datos Invalidos'} ));
            }
        });
    }

    // Pàgina de inicio con instrucciones
    else if(url === '/' && method === 'GET') {
        res.setHeader('Content-Type', 'text-content', 'charset-utf-8');
        res.statusCode = 200; 

        res.end(`
            <h1> API de Tareas </h1>

            <h2> Endpoints disponibles: </h2>
            <ul>
                <li><strong>GET</strong> /api/tareas - Ver todas las tareas </li>
                <li><strong>POST</strong> /api/tareas - Crear tareas </li>
                <li><strong>GET</strong> /api/tareas - Ver todas las tareas </li>
                <li><strong>DELATE</strong> /api/tareas/:id - Eliminar tareas</li>
            </ul>
        `);
    } else {
        res.statusCode = 404; 
        res.end(JSON.stringify({ error: 'Rua no encontrada' }));
    }

}); 




const PORT = 3002; 
server.listen(PORT, ()=> {
    console.log(`API de tareas corriendo en http://localhost:${PORT}`); 

})