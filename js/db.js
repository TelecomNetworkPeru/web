const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/entregable01';

module.exports = () => {

    const conectar = () => {
        mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true
        }).then(() => {
            console.log('Conexión exitosa a MongoDB');
        }).catch(err => {
            console.error('Error de conexión a MongoDB:', err);
        });
    };

    // Necesitas devolver la función conectar para que pueda ser llamada externamente
    return { conectar };
};
