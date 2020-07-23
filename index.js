const express = require("express");
const socket = require("socket.io");
//App setup
const app = express();
const server = app.listen(4000, ()=>{
    console.log("listening to requests");
});

//Static files
app.use(express.static("public"));

//Socket setup
var io = socket(server);
//number of users in chat counter
let uCount = 0;

//When user connects online
io.on("connection", (socket)=>{
    console.log("made socket connection",socket.id);
    
    uCount++;
    io.sockets.emit("uCount", { uCount: uCount });
    
    //When user goes offline
    socket.on("disconnect", ()=> {
        uCount--;
        io.sockets.emit("uCount", { uCount: uCount });
      });

    socket.on("chat", (data)=>{
        io.sockets.emit("chat", data);
    });

    socket.on("typing", (data)=>{
        socket.broadcast.emit("typing", data);
    });

    socket.on("stop", (data)=>{
        io.sockets.emit("stop", data);
    });
});

