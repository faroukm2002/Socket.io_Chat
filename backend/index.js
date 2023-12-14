import *as dotenv from "dotenv"
dotenv.config()
import express  from 'express'
import { Server } from 'socket.io';

const app = express()
const port = 3000

 

app.use(express.json())
 app.get("/",(req,res)=>res.send("hello world"))

const server= app.listen(port, () => console.log(`Example app listening on port ${port}!`))








const io= new Server(server,{
    cors:"*"
})
io.on("connection",(socket )=>{
    console.log("welcome from sockets",socket.id)
    socket.on("disconnect",()=>{
        console.log("disconnect")
    })


    socket.on("newMessage",data=>{

        console.log(data)
        // Emit the replay event to all other sockets
        io.emit("replay", data);

    })
    socket.on("userTyping",data=>{
        console.log("typing")
        socket.broadcast.emit("typing","typing")
    })


    socket.on("stopTyping",data=>{
        console.log("stopTyping")
        socket.broadcast.emit("stopUserTyping","")
    })

})