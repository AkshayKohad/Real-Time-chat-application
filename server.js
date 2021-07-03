const express = require('express');
const app = express();
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

 http.listen(PORT,()=>{
     console.log(`Listening on port ${PORT}`)
 })

// app.listen(PORT,()=>{
//     console.log(`Listening on port ${PORT}`)    => we can use app simply we have to use http and specifically create a server for socket.io
// })

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

// Socket

const io = require('socket.io')(http)

io.on('connection', (socket) =>{
    console.log('Connected...')
    socket.on('message', (msg) =>{
        console.log(msg)
        socket.broadcast.emit('message',msg)  // Again here instead of message we can write anything
        
    })
})