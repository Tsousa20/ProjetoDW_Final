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


//Admin page
const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');
const sideBar = document.querySelector('.container .left-section');
const sidebarItems = document.querySelectorAll('.container .left-section .sidebar .item');

menuOpen.addEventListener('click', () => {
    sideBar.style.top = '0';
});

menuClose.addEventListener('click', () => {
    sideBar.style.top = '-60vh';
});

let activeItem = sidebarItems[0];

sidebarItems.forEach(element => {
    element.addEventListener('click', () => {
        if (activeItem) {
            activeItem.removeAttribute('id');
        }

        element.setAttribute('id', 'active');
        activeItem = element;

    });
});

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

