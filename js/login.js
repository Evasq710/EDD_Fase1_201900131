'use strict'

var user = document.getElementById("inputUser");
var pass = document.getElementById("inputPassword");
var submit = document.getElementById("submitCredenciales")
submit.addEventListener('click', function(event){
    event.preventDefault();
});

function inicioSesion(){
    if(user.value != "" && pass.value != ""){
        let usuario = {
            'username': user.value,
            'password': pass.value
        }
        if(usuario['username'] == "Admin"){
            if(usuario['password'] == "1234"){
                location.href = "./views/admin.html"
            } else {
                alert("Credenciales incorrectas! Verifique su Username y Contraseña.");
            }
        } else if(true){
            alert("hola");
        }
    }else{
        alert("Ingrese sus credenciales para iniciar sesión.");
    }
}