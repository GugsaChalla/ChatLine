//Make connection
const socket = io.connect("http://localhost:4000");

const message = document.getElementById("message");
const name = document.getElementById("name");
const button = document.getElementById("send");
const output = document.getElementById("output");
const typing = document.getElementById("typing");
const title = document.getElementById("title");
const count = document.getElementById("count");



//What happens when Send button gets clicked
button.addEventListener("click", ()=>{
    //Check if user's name is blank
    if(name.value.trim() === ""){
        alert("You must enter your name before you can send a message!");
    }
    //Check if message is empty
    else if(message.value.trim() === ""){
        alert("You cannot send an empty message!");
    }
    else{
        title.innerHTML = "<h3>" + name.value + "'s Chat </h3>";
        socket.emit("chat",{
            message: message.value,
            name: name.value
        });
        
        
        
        
        message.value = "";
        name.value = "";
    }
    


});

//What happens when user is typing
message.addEventListener("keypress", ()=>{
    let space = name.value.trim();
    //Check if user entered name before typing
    if(space === ""){
        alert("You must enter your name before you start typing!");
    }
    else{
        socket.emit("typing", {
            message: message.value,
            name: name.value
        });
    }
    
});

//When user is no longer clicked on the message textbox
message.addEventListener("change", ()=>{
    socket.emit("stop");
    //if user entered message before name, make message box empty
    if(name.value.trim() === ""){
        message.value="";
    }
});




//Listen for events

socket.on("chat", (data)=>{
    output.innerHTML += "<p><strong>" + data.name + ": </strong>" + data.message + "</p>";
    typing.innerHTML = "";
});

socket.on("typing", (data)=>{
        typing.innerHTML = "<p><em>" + data.name + " is typing...</em></p>";
});


socket.on("uCount",(data)=> {
    console.log(data.uCount);
    count.innerHTML = "<h3> Number of Users Online: " + data.uCount + "</h3>"
  });

  socket.on("stop", (data)=>{
      typing.innerHTML = "";
  });



