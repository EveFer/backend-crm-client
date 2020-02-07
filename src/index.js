const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// CORS permite que un cliente se cenecta a otro servidor para el intercambio de datos
const cors = require('cors')

// conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://fernandapalacios:Holamundo2020@tester-fqndx.mongodb.net/clients?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
})
// crear el servidor
const app = express();
// habilitar bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// habilitar cors
app.use(cors())
// rutas de la app
app.use('/', routes());

// puerto
app.listen(5000);