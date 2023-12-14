const socket =io("http://localhost:3000")

const myInp=document.getElementById("chatMsg")

function sendMsg(){

    let message=document.getElementById("chatMsg")
    console.log(message.value)
    socket.emit("newMessage",message.value)
    message.value=""
}


socket.on("replay",(data)=>{
    console.log(data)
    document.querySelector("#test").innerHTML += `<div class="message_content">${data}</div>`;

})

myInp.addEventListener('input',function(e){
    // console.log(e.target.value)
    socket.emit("userTyping",e.target.value) 
})

socket.on("typing",data=>{
    document.getElementById("typingMsg").classList.replace("d-none","d-block")

})



myInp.addEventListener('keyup',function(e){

    socket.emit("stopTyping",e.target.value)
})




socket.on("stopUserTyping",(data)=>{
    setTimeout(()=>{

    document.getElementById("typingMsg").classList.replace("d-block","d-none")
},1000)

})