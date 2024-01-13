//Pagina Reservations
// const wrapper_reserva = document.querySelector('.wrapper_reserva');
// const goto_check_reserva_link = document.querySelector('.goto_check_reserva_link');
// const goto_nova_reserva_link = document.querySelector('.goto_nova_reserva_link');

// goto_check_reserva_link.onclick = () => {
//     wrapper_reserva.classList.add('active');
// };

// goto_nova_reserva_link.onclick = () => {
//     wrapper_reserva.classList.remove('active');
// };


//Admin page
//Theme dark-mode
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("body_admin_page-dark");
})

window.addEventListener("load", () => {
    if(document.body.classList.contains("body_admin_page-dark")){
        dayNight.querySelector("i").classList.add("fa-sun");
    }
    else{
        dayNight.querySelector("i").classList.add("fa-moon");
    }
});

//Aside

const nav_admin = document.querySelector(".nav_admin");
const navList = nav_admin.querySelectorAll("li");
const totalNavList = navList.length;
const allSection = document.querySelectorAll(".section");
const totalSection = allSection.length;
    
for(let i=0; i<totalNavList; i++){
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function(){
        
        for(let i=0; i<totalSection; i++){
            allSection[i].classList.remove("back-section");
        }

        for(let j=0; j<totalNavList; j++){

            if(navList[j].querySelector("a").classList.contains("active")){
                allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active")
        showSection(this);
        if(window.innerWidth < 1200){
            asideSectionTogglerBtn();
        }
    })
}

function showSection(element){
    for(let i=0; i<totalSection; i++){
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active")
}

const navTogglerBtn = document.querySelector(".nav_admin_toggler");
const aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
})

function asideSectionTogglerBtn(){
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for(let i=0; i<totalSection; i++){
        allSection[i].classList.toggle("open");
    }
}

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