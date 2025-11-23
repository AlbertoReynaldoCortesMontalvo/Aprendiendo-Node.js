const express = require('express'); 
const app = express(); 

// Midleware para parsear JSON
app.use(express.json()); 

// Ruta básica
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenido a mi API',
        fecha: new Date()
    }); 
}); 


// Ruta con parámetros
app.get('/saludos/:nombre', (req, res) => {
    const { nombre } = req.params;
    res.json({ mensaje: `!Hola ${ nombre }!` }); 
}); 


// Ruta Post
app.post('/datos', (req, res) => {
    const datos = req.body; 


    res.json({
        recibido: true, 
        datos: datos
    });
});


// puerto 
const PORT = process.env.PORT || 3000; 
app.listen(PORT, ()=> {
    console.log(`Servidor correindo en https://localhost:${PORT}`);
})