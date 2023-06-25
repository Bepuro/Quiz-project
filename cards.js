const btnOpen = document.getElementById("btn-txt");
const btnClose = document.querySelector("#btn-close") 
const modal = document.querySelector("#modal"); 
const sign_btn = document.getElementById("sign-up");

btnOpen.addEventListener("click", () => modal.showModal())
btnClose.addEventListener("click", () => modal.close())

const btnOpen_1 = document.getElementById("btn");
const btnClose_1 = document.getElementById("btn-close-1")
const modal_1 = document.getElementById("modal_1");
const login_btn = document.getElementById("log-in");

btnOpen_1.addEventListener("click", () => modal_1.showModal())

btnClose_1.addEventListener("click", () => modal_1.close())

sign_btn.addEventListener("click", () => {
  modal.close()
  modal_1.showModal()
})

login_btn.addEventListener("click", () => {
  modal_1.close()
  modal.showModal()
})

const btnOpen1 = document.getElementById("wrp-img");

btnOpen1.addEventListener("click", () => modal.showModal())

btnClose.addEventListener("click", () => modal.close())

const navMainPage = document.getElementById("main-page")
const navCardsPage = document.getElementById("cards-page")
navMainPage.addEventListener("click", ()=> window.open("index.html"))
navCardsPage.addEventListener("click", ()=> window.open("cards.html"))

