document.querySelector("#start_chat").addEventListener("click", (event) => {
  // Pegando o elemento HTML e dar um display none
  const chat_help = document.getElementById("chat_help");
  chat_help.style.display = "none"

  const chat_in_support = document.getElementById("chat_in_support");
  chat_in_support.style.display = "block"
  const socket = io();

  // Pegando os valores do email e texto
  const email = document.getElementById("email").value
  const text = document.getElementById("txt_help").value 

  // Esta função está se conectando ao client_first_access e passando os parametros email e texto
  socket.on("connect", () =>{
   
    const params = {
      email, text
    }
   
    socket.emit("client_first_access", params, (call, err) => {
      if(err){
        console.log(err)
      }else{
        console.log(call)
      }
    })
  })
  
  socket.on("client_list_all_messages", messages => {
    var  template_client = document.getElementById("message-user-template").innerHTML;
    var template_admin = document.getElementById("admin-template").innerHTML;

    messages.forEach(itemMessage => {
      if(itemMessage.admin_id == null){
        const rendered = Mustache.render(template_client, {
          message: itemMessage.text,
          email
        })

        document.getElementById("messages").innerHTML += rendered
      
      }else{
        const rendered = Mustache.render(template_admin, {
          message_admin: itemMessage.text
        })
        document.getElementById("messages").innerHTML += rendered
        
      }
    })

  })

});