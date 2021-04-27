const socket = io();
let connection = [];

socket.on("admin_list_all_users", connectionUsers => {

    connection = connectionUsers;

    document.getElementById("list_users").innerHTML = ""

    let template = document.getElementById("template").innerHTML

    connectionUsers.forEach(users => {
        const rendered = Mustache.render(template, {
            email: users.user.email,
            id: users.socket_id
        })

        document.getElementById("list_users").innerHTML += rendered
    })
})

function call(id){

    const user = connection.find(connection => connection.socket_id === id);

    const template = document.getElementById("admin_template").innerHTML;

    const rendered = Mustache.render(template, {
        email: user.user.email,
        id: user.user_id
    })

    document.getElementById("supports").innerHTML += rendered

    const params = {
        user_id: user.user_id
    }

    socket.emit("admin_list_messages_by_user", params, messages => {
        
        const divMessages = document.getElementById(`allMessages${user.user_id}`)

        messages.forEach( message =>{
            const createDiv = document.createElement("div");

            if(message.admin_id == null){
                createDiv.className = "admin_message_client";

                createDiv.innerHTML = `<span>${user.user.email}</span> `
                createDiv.innerHTML += `<span> ${message.text}</span>`
                createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`

            }else{
                createDiv.className = "admin_message_admin";

                createDiv.innerHTML = `Atendente: <span>${message.text}</span> `
                createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`
                
            }
            divMessages.appendChild(createDiv)
        })
        
    })
}


function sendMessage(id) {
    const text = document.getElementById(`send_message_${id}`)

    const params = {
        text: text.nodeValue,
        user_id: id
    }

    socket.emit("admin_send_message", params=> {
        
    })
}



