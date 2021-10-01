
import express from "express";
import routes from './routes.js';
import fetch from 'node-fetch';

import path from 'path';
import { fileURLToPath } from 'url';

import { operacion } from './operaciones.js';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const route = express.Router();

app.set('port', process.env.PORT || 9000);

//Motor de plantillas
app.set("view engine", "ejs");
//De donde se tomaran las plantillas
app.set("views", "./views");

//Definimos path
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

let datos;//guardamos el json de la petición
let respuesta = {};
//Hacemos la petició para obtener el json del enlace
fetch('https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=perl&site=stackoverflow')
    .then((respuesta) => {
        return respuesta.json()
    }).then((resp) => {
        datos = resp;
        respuesta.res1 = 'exitosa';
    }).catch(e => {
        console.log(e)
        respuesta.res1 = 'error conexión';
    });


//ruta render
app.get('/', (req, res) => {
    //Mandamos a llamar las funciones para obtener las respuestas
    respuesta.res2 = operacion.respuesta2(datos);
    respuesta.res3 = operacion.respuesta3(datos);
    respuesta.res4 = operacion.respuesta4(datos);
    respuesta.res5 = operacion.respuesta5(datos);
    operacion.respuesta6(respuesta);
    res.render('index', {  respuesta })
})

//Server ejecutando
app.listen(app.get('port'), () => {
    console.log('server running in ', app.get('port'))
});