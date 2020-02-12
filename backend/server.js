// server.js

const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mysql = require('mysql'),
    rtrInstalacion = require('./routers/rtrInstalacion'),
    rtrMantenimiento = require('./routers/rtrMantenimiento'),
    rtrPoblacion = require('./routers/rtrPoblacion'),
    rtrProvincia = require('./routers/rtrProvincia'),
    rtrContratante = require('./routers/rtrContratante'),
    rtrEstado = require('./routers/rtrEstado'),
    rtrMercado = require('./routers/rtrMercado'),
    rtrContCom = require('./routers/rtrContCom'),
    rtrContDist = require('./routers/rtrContDist'),
    rtrTipoTrabajo = require('./routers/rtrTipoTrabajo');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'ceytec'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
    .use(bodyParser.json())
    .use(cors())
    .use(rtrInstalacion(connection))
    .use(rtrMantenimiento(connection))
    .use(rtrPoblacion(connection))
    .use(rtrProvincia(connection))
    .use(rtrContratante(connection))
    .use(rtrEstado(connection))
    .use(rtrMercado(connection))
    .use(rtrContCom(connection))
    .use(rtrContDist(connection))
    .use(rtrTipoTrabajo(connection));

app.listen(port, function() {
    console.log('Listening on port ' + port);
});