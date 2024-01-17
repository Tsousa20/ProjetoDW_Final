//Pagina Reservations
const wrapper_reserva = document.querySelector('.wrapper_reserva');
const goto_check_reserva_link = document.querySelector('.goto_check_reserva_link');
const goto_nova_reserva_link = document.querySelector('.goto_nova_reserva_link');

goto_check_reserva_link.onclick = () => {
    wrapper_reserva.classList.add('active');
};

goto_nova_reserva_link.onclick = () => {
    wrapper_reserva.classList.remove('active');
};
