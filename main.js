import './style.css'

const burger = document.getElementById("abrir-menu")
const nav=document.getElementById("nav")
const cerrarmenu=document.getElementById("cerrar-menu")

burger.addEventListener("click", () => {
    nav.style.transform = "translateX(0)"
})

cerrarmenu.addEventListener("click", () => {
    nav.style.transform = "translateX(-100%)"
})