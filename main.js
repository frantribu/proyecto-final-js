import './style.css'

//elementos del menu
const burger = document.getElementById("abrir-menu")
const nav=document.getElementById("nav")
const cerrarmenu=document.getElementById("cerrar-menu")


//elementos para registrarse
const formularioRegister = document.getElementById("formulario-register")
const nameInput= document.getElementById("fullname-input")
const usernameInput=document.getElementById("username-input")
const emailInput=document.getElementById("email-input")
const passwordInput = document.getElementById("password-input")

//elementos para iniciar sesion
const formularioLogin=document.getElementById("formulario-login")
const inputIdentificador=document.getElementById("identificador-login-input")
const inputPassword=document.getElementById("contraseña-login-input")

//elementos para enterarte de las promos
const formularioPromos=document.getElementById("formulario-promos")
const emailComplete=document.getElementById("complete-email")

//MENU BURGER
burger.addEventListener("click", () => {
    nav.style.transform = "translateX(0)"
})

cerrarmenu.addEventListener("click", () => {
    nav.style.transform = "translateX(-100%)"
})

//REGISTRARSE
//async porq va a esperar la respuesta de q nosotros llamemos al servidor para enviar los datos
async function subirDatos(usuario){
    const res= await fetch("http://localhost:3000/registrar",{
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
    })
    const datos = await res.json()

    return datos
}

//Iniciar sesion
async function iniciarSesion(identifier, password){
    const res=await fetch("http://localhost:3000/iniciar-sesion",{
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({identifier, password}) 
    })

    const datos= await res.json()

    return datos
}

if(formularioRegister){
formularioRegister.addEventListener("submit", async (e) =>{
    e.preventDefault()

    const usuario ={
        fullname:nameInput.value,
        username:usernameInput.value,
        email:emailInput.value,
        password:passwordInput.value
    }

    const usuarioRegistrado = await subirDatos(usuario)
    
    if(usuarioRegistrado) {
        console.log(usuarioRegistrado)
    }
})}

if(formularioLogin){
formularioLogin.addEventListener("submit", async (e) =>{
    e.preventDefault()

    const usuarioEsAceptado = await iniciarSesion(inputIdentificador.value, inputPassword.value)

    if(usuarioEsAceptado.message){
        alert(usuarioEsAceptado.message)
    }

    if(usuarioEsAceptado.username){
        alert("Sesion iniciada con exito!")
        localStorage.setItem("datos-del-usuario", JSON.stringify(usuarioEsAceptado))
    }
})}

//mandar email para enterarte de las promos
let usuarioIngresado = { email: ""}

formularioPromos.addEventListener("submit", (e) =>{
    e.preventDefault()

    usuarioIngresado = {
        ...usuarioIngresado,
        email:emailComplete.value
    }

    if(!usuarioIngresado.email){
        alert("Falta completar datos!")
    }else{
        alert("Gracias!. Te avisaremos de todas nuestras promos")
    }
})
