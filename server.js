/*contiene tareas o funciones que seràn ejecutadas en determinados eventos*/
/*Modulos en Node.js === Librerias  de javascript
Una seria de funciones que se desean agregar a la aplicacion
*/
/*Modulo http
Permite a Node transferir datos a través de un protocolo de Tranferencia de hiper texto 
Crea un servidor HTTP que escucha por medio de puertos y envia respuestas al usuario.
*/
/*NPM Adminisrador de Paquetes de Node.js, contiene los archivos necesarios para usar un modulo*/
var http = require('http'); // "require() llama al modulo para ser intalado"
var url = require('url');
var fs = require("fs"); // permite trabajar con el sistema de archivos del pc
var dt = require('./mimodulo.js');
var express = require("express");
var events = require('events');
var eventEmitter = new events.EventEmitter();


//Create an event handler:
var myEventHandler = function () {
    console.log('I hear a scream!');
}

//Assign the event handler to an event:
eventEmitter.on('scream', myEventHandler);

//Fire the 'scream' event:
eventEmitter.emit('scream');


/*crea un objeto servidor:
req = peticion o request del cliente
res = respuesta del servidor
*/
http.createServer(function (req, res) {
    //res.writeHead(); (200) es el estado == "todo esta bien"
    // el segundo argumento es un objeto que contiene la respuesta

    /* res.writeHead(200, {
         "Content-Type": "text/html",
      
     });
     var q = url.parse(req.url, true).query;
     var txt = q.year + " " + q.month;*/

    //res.write(); escribe una respuesta al cliente
    //res.write(req.url); // req.url contiene la parte de la direccion que viene despues del nombre del dominio
    // res.write("The Date and time are: " + dt.myDateTime


    //==================================================================
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {
            "Content-Type": "text/html",
        });
        res.write(data);
        res.end();
    });
    /*fs.appendFile(nombre y tipo del archivo, contenido a escribir)*/
    var Cadena = "The Date and time are: " + dt.myDateTime();
    fs.appendFile('miarchivonuevo.txt', Cadena + '\n', function (err) {
        if (err) throw err;
        console.log('Guardado');
    });
    fs.open('mynewfile2.txt', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
    });


    fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    //==================================================================Eventos de archivos
    var rs = fs.createReadStream('./miarchivonuevo.txt');
    rs.on('open', function () {
        console.log('The -miarchivonuevo- file is open');
    });

    //es.end(txt);
}).listen(8080); //puerto en el que escucha
/* lo anterio significa que, si alguien intenta acceder al al pc, usando el puerto 8080, se ejecutará la funcion implementada en el metodo http.createServer()*/
