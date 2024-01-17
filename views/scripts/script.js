
// INICIO HEADER
const btncheck = document.querySelector(".btncheck");
const navMenu = document.querySelector(".nav_menu");

btncheck.addEventListener("click", () =>{
    btncheck.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav_link").forEach(n => n.addEventListener("click", () => {
    btncheck.classList.remove("active");
    navMenu.classList.remove("active");
}))
// FIM HEADER