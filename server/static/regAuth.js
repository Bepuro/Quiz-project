const btnOpen = document.getElementById("btn-txt");
const btnClose = document.querySelector("#btn-close")
const modalRegister = document.querySelector("#modal");
const sign_btn = document.getElementById("sign-up");

const btnOpen_1 = document.getElementById("btn");
const btnClose_1 = document.getElementById("btn-close-1")

const modalAuth = document.getElementById("modal_1");
const login_btn = document.getElementById("log-in");
const btnOpen1 = document.getElementById("wrp-img");

function addButtons() {
    btnOpen.onclick = () => {
        modalRegister.showModal()
    }


    btnClose.onclick = () => {
        modalRegister.close()
    }


    btnOpen_1.onclick = () => {
        modalAuth.showModal()
    }


    btnClose_1.onclick = () => {
        modalAuth.close()
    }

    sign_btn.onclick = () => {
        modalRegister.close()
        modalAuth.showModal()
    }

    login_btn.onclick = () => {
        modalAuth.close()
        modalRegister.showModal()
    }

    btnOpen1.onclick = () => {
        modalRegister.showModal()
    }


    btnClose.onclick = () => {
        modalRegister.close()
    }
}

addButtons();
addSubmition();