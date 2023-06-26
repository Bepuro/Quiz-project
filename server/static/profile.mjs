import {getUser} from "./api.mjs";

const username = document.querySelectorAll('.username');



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

        
        
        const lengthCards = document.querySelectorAll(".cards > .card").length;
        const cardsNums = document.querySelectorAll(".cards > .card .txt-card")
        

        const card = document.createElement("div");
        card.className = "card";

        const headCard = document.createElement("div");
        headCard.className = "head-card";

        const contentHeadCard = document.createElement("div");
        contentHeadCard.className = "cnt-card";

        const numCard = document.createElement("p");
        numCard.className = "txt-card";
        numCard.innerText = `${lengthCards + 1}`;

        const deleteButton = document.createElement("div");
        deleteButton.className = "icons";
        deleteButton.addEventListener("click", function() {
            card.remove();
            for (i = 0; i < cardsNums.length; i++)  {
                cardsNums[i].innerText = i + 1
            }
        })

        const trashSVG = document.createElement("img");
        trashSVG.src = "static/img/trash.svg";
        trashSVG.className = "trash-btn";

        const bottomCard = document.createElement("div");
        bottomCard.className = "bottom-card";

        const textArea1 = document.createElement("textarea");
        textArea1.className = "text-area-card";
        textArea1.name = "comment";
        textArea1.cols = "60";
        textArea1.rows = "10";
        textArea1.placeholder = "Термин";

        const textArea2 = document.createElement("textarea");
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

