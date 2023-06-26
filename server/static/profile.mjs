import {getUser} from "./api.mjs";

const username = document.querySelectorAll('.username');

const card = document.createElement("div");
const headCard = document.createElement("div");
const contentHeadCard = document.createElement("div");
const numCard = document.createElement("p");
const lengthCards = document.querySelectorAll(".cards > .card").length;
const deleteButton = document.createElement("div");
const cardsNums = document.querySelectorAll(".cards > .card .txt-card")
const trashSVG = document.createElement("img");
const bottomCard = document.createElement("div");
const textArea1 = document.createElement("textarea");
const textArea2 = document.createElement("textarea");

const emptyKolods = document.getElementById("subpage-1");
const createKolods = document.getElementById("subpage-2");
const buttonCreateKolods = document.getElementById("btn-create");

const returnEmpty = document.getElementById("return-btn");
const buttonAddToSpecial = document.getElementById("btn-add-x");

const navCardsPage = document.getElementById("cards-page");

const tabPageEdit = document.getElementById("page-edit");
const tabPageKolods = document.getElementById("page-kolodos");
const tabPageBest = document.getElementById("page-best");

const buttonAdd = document.getElementById("add-button");
const parent = document.getElementsByClassName("cards")[0];

const cards = document.querySelector('#cards-page');

cards.addEventListener('click', () => {
   window.open('/cards');
});


function openPage(page) {
    let i;
    const x = document.getElementsByClassName("page");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(page).style.display = "block";
}

function addButtons() {
    buttonAdd.addEventListener("click", function() {
        card.className = "card";
        headCard.className = "head-card";
        contentHeadCard.className = "cnt-card";

        numCard.className = "txt-card";
        numCard.innerText = `${lengthCards + 1}`;

        deleteButton.className = "icons";
        deleteButton.addEventListener("click", function() {
            card.remove();
            for (i = 0; i < cardsNums.length; i++)  {
                cardsNums[i].innerText = i + 1
            }
        })

        trashSVG.src = "static/img/trash.svg";
        trashSVG.className = "trash-btn";

        bottomCard.className = "bottom-card";

        textArea1.className = "text-area-card";
        textArea1.name = "comment";
        textArea1.cols = "60";
        textArea1.rows = "10";
        textArea1.placeholder = "Термин";

        textArea2.className = "text-area-card";
        textArea2.name = "comment";
        textArea2.cols = "60";
        textArea2.rows = "10";
        textArea2.placeholder = "Определение";

        bottomCard.appendChild(textArea2);
        bottomCard.appendChild(textArea1);
        deleteButton.append(trashSVG);
        contentHeadCard.appendChild(numCard);
        contentHeadCard.appendChild(deleteButton);
        headCard.appendChild(contentHeadCard);

        card.appendChild(headCard);
        card.appendChild(bottomCard);
        parent.appendChild(card);
    })


    buttonCreateKolods.addEventListener("click", function(){
        emptyKolods.style.display = "none";
        createKolods.style.display = "block";
    })


    returnEmpty.addEventListener("click", function(){
        createKolods.style.display = "none";
        emptyKolods.style.display = "block";
    })


    buttonAddToSpecial.addEventListener("click", () => window.open("cards.html"));
    navCardsPage.addEventListener("click", ()=> window.open("cards.html"));
    tabPageEdit.addEventListener("click", () => openPage("page-3"));
    tabPageKolods.addEventListener("click", () => openPage("page-1"));
    tabPageBest.addEventListener("click", () => openPage("page-2"));
}


function initScript() {
    getUser().then(res => {
        addButtons();
        for (let name of username) {
            name.innerHTML = res.username;
        }
    }).catch(err => console.log(err));
}

initScript();

