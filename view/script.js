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

//Pagina Reservations
const wrapper_reserva = document.querySelector('.wrapper_reserva');
const goto_check_reserva_link = document.querySelector('.goto_check_reserva_link');
const goto_nova_reserva_link = document.querySelector('.goto_nova_reserva_link');

goto_check_reserva_link.onclick = () => {
    wrapper_reserva.classList.add('active');
}

goto_nova_reserva_link.onclick = () => {
    wrapper_reserva.classList.remove('active');
}


// Função para mostrar o Datepicker quando o ícone é clicado
function mostrarDatepicker() {
    $("#datepicker").datepicker("show");
}
