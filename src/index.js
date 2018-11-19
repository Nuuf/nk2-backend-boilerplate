import express from 'express';
import http from 'http';
import morgan from 'morgan';
import { Container2D } from '@nuuf/nk2-backend';
import * as WebSocket from 'ws';
import mongoose from 'mongoose';

mongoose.connect( 'mongodb://useradmin:pwd123456@127.0.0.1:27017/myDB' );

const app = express();
const server = http.createServer( app );
const wss = new WebSocket.Server( { server: server } );
const PORT = 1337;
const ADDRESS = '127.0.0.1';
const main = new Container2D( 0, 0 );

wss.on( 'connection', ( socket ) => {

  socket.send( 'Connection established' );

  socket.on( 'message', ( msg ) => {

    console.log( msg );
    socket.send( 'echo:' + msg );

  } );

} );

app.use( morgan( 'combined' ) );

app.route( '/' ).get( ( req, res ) => {

  res.send( 'Hello World, goto /myRoute' );

} );

app.route( '/myRoute' ).get( ( req, res ) =>{

  res.send( JSON.stringify( main ) );

} );

server.listen( PORT, ADDRESS, () => {

  const address = server.address();

  console.log( 'Server running on port: ' + address.address + ':' + address.port );

} );
