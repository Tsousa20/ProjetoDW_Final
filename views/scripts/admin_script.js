
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

// Admin Section

// Add admin form
function mostrarForm_Add_Admin() {
    // Obtém o elemento do formulário
    var formulario = document.getElementById("add_admin");

    // Verifica o estado atual do formulário
    if (formulario.style.display === "block") {
        // Se estiver ativo, oculta o formulário
        formulario.style.display = "none";
    } else {
        // Se estiver oculto, ativa
        formulario.style.display = "block";
    }
};

// Delete admin form
function mostrarForm_Delete_Admin() {
    // Obtém o elemento do formulário
    var formulario = document.getElementById("delete_admin");

    // Verifica o estado atual do formulário
    if (formulario.style.display === "block") {
        // Se estiver ativo, oculta o formulário
        formulario.style.display = "none";
    } else {
        // Se estiver oculto, ativa
        formulario.style.display = "block";
    }
};

// Change passwd form
function mostrarForm_Change_Passwd_Admin() {
    // Obtém o elemento do formulário
    var formulario = document.getElementById("change_passwd_admin");

    // Verifica o estado atual do formulário
    if (formulario.style.display === "block") {
        // Se estiver ativo, oculta o formulário
        formulario.style.display = "none";
    } else {
        // Se estiver oculto, ativa
        formulario.style.display = "block";
    }
};

// Validar passwd
function validarSenha_add_admin() {
    var novaPasswd = document.getElementById("novaPasswd_add_admin").value;
    var confirmarPasswd = document.getElementById("confirmarPasswd_add_admin").value;

    if (novaPasswd !== confirmarPasswd) {
        alert("As passwords não coincidem. Por favor, digite novamente.");
        return false;
    }
    // Se as passwds coincidirem, envia
    return true;
}
function validarSenha_change_psswd() {
    var novaPasswd = document.getElementById("novaPasswd_change_passwd").value;
    var confirmarPasswd = document.getElementById("confirmarPasswd_change_passwd").value;
    var oldPasswd = document.getElementById("oldPasswd_change_passwd").value;

    if(novaPasswd === oldPasswd) {
        alert("Escolha uma password diferente da anterior. Por favor, digite novamente.");
        return false;
    } else if (novaPasswd !== confirmarPasswd) {
        alert("As passwords não coincidem. Por favor, digite novamente.");
        return false;
    }
    // Se as passwds coincidirem, envia
    return true;
}


// Menu Section
function OcultarInputForm() {
    var select_option = document.getElementById("select_option");
    var input_hidden = document.getElementById("input_hidden");

    // Mostra o input se a opção hamburger for selecionada, oculta para outras opções
    input_hidden.style.display = select_option.value === "Hamburger" ? "block" : "none";
}

function mostrarForm_Change_Menu() {
    // Obtém o elemento do formulário
    var formulario = document.getElementById("change_menu");

    // Verifica o estado atual do formulário
    if (formulario.style.display === "block") {
        // Se estiver ativo, oculta o formulário
        formulario.style.display = "none";
    } else {
        // Se estiver oculto, ativa
        formulario.style.display = "block";
    }
};

function mostrarForm_Delete_Menu() {
    // Obtém o elemento do formulário
    var formulario = document.getElementById("delete_menu");

    // Verifica o estado atual do formulário
    if (formulario.style.display === "block") {
        // Se estiver ativo, oculta o formulário
        formulario.style.display = "none";
    } else {
        // Se estiver oculto, ativa
        formulario.style.display = "block";
    }
};

function updateSecondSelect(formIdentifier) {
    var firstSelect = document.getElementById(`first_select_${formIdentifier}`);
    var secondSelect = document.getElementById(`second_select_${formIdentifier}`);
    var selectedOption = firstSelect.value;


    // Requisição ao Node.js para obter as opções do segundo select
    fetch(`/admin/${formIdentifier}/${selectedOption}`)
        .then(response => response.json())
        .then(options => {
            // Limpar as opções atuais do segundo select
            secondSelect.innerHTML = "";

            // Adicionar as opções ao segundo select
            options.forEach(option => {
                var optionElement = document.createElement("option");
                optionElement.value = option.value;
                optionElement.text = option.text;
                secondSelect.add(optionElement);
            });
        })
        .catch(error => console.error('Erro ao obter opções:', error));
};

//Gallery Section
function mostrarForm_Add_Image() {
    // Obtém o elemento do formulário
    var formulario = document.getElementById("add_image");

    // Verifica o estado atual do formulário
    if (formulario.style.display === "block") {
        // Se estiver ativo, oculta o formulário
        formulario.style.display = "none";
    } else {
        // Se estiver oculto, ativa
        formulario.style.display = "block";
    }
};

function mostrarForm_Delete_Image() {
    // Obtém o elemento do formulário
    var formulario = document.getElementById("delete_image");

    // Verifica o estado atual do formulário
    if (formulario.style.display === "block") {
        // Se estiver ativo, oculta o formulário
        formulario.style.display = "none";
    } else {
        // Se estiver oculto, ativa
        formulario.style.display = "block";
    }
};

//About Section
function mostrarForm_Change_About() {
    // Obtém o elemento do formulário
    var formulario = document.getElementById("change_about");

    // Verifica o estado atual do formulário
    if (formulario.style.display === "block") {
        // Se estiver ativo, oculta o formulário
        formulario.style.display = "none";
    } else {
        // Se estiver oculto, ativa
        formulario.style.display = "block";
    }
};


