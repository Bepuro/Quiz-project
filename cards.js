const btnOpen = document.getElementById("btn-txt");
const btnClose = document.querySelector("#btn-close")
const modal = document.querySelector("#modal");
const sign_btn = document.getElementById("sign-up");

btnOpen.onclick = () => {
  modal.showModal()
}


btnClose.onclick = () => {
    modal.close()
}


const btnOpen_1 = document.getElementById("btn");
const btnClose_1 = document.getElementById("btn-close-1")
const modal_1 = document.getElementById("modal_1");
const login_btn = document.getElementById("log-in");

btnOpen_1.onclick = () => {
  modal_1.showModal()
}


btnClose_1.onclick = () => {
  modal_1.close()
}


sign_btn.onclick = () => {
  modal.close()
  modal_1.showModal()
}

login_btn.onclick = () => {
  console.log('------111222')
  modal_1.close()
  modal.showModal()
}