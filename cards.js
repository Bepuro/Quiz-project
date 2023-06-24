const btnOpen = document.getElementById("btn-txt");
const btnClose = document.querySelector("#btn-close") // getElementById лучше
const modal = document.querySelector("#modal"); // getElementById лучше
const sign_btn = document.getElementById("sign-up");

// addEventListener лучше
btnOpen.onclick = () => {
  modal.showModal()
}

// addEventListener лучше
btnClose.onclick = () => {
    modal.close()
}


const btnOpen_1 = document.getElementById("btn");
const btnClose_1 = document.getElementById("btn-close-1")
const modal_1 = document.getElementById("modal_1");
const login_btn = document.getElementById("log-in");
// addEventListener лучше

btnOpen_1.onclick = () => {
  modal_1.showModal()
}


// addEventListener лучше
btnClose_1.onclick = () => {
  modal_1.close()
}


// addEventListener лучше
sign_btn.onclick = () => {
  modal.close()
  modal_1.showModal()
}

// addEventListener лучше
login_btn.onclick = () => {
  modal_1.close()
  modal.showModal()
}

const btnOpen1 = document.getElementById("wrp-img");

// addEventListener лучше
btnOpen1.onclick = () => {
  modal.showModal()
}


// addEventListener лучше
btnClose.onclick = () => {
  modal.close()
}