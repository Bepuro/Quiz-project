function openPage(page) {
    let i;
    const x = document.getElementsByClassName("page");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    document.getElementById(page).style.display = "block";  
}

const buttonAdd = document.getElementById("add-button");
const parent = document.getElementsByClassName("cards")[0];

buttonAdd.addEventListener("click", function() {
    const card = document.createElement("div");
    card.className = "card";
    
    const headCard = document.createElement("div");
    headCard.className = "head-card";

    const contentHeadCard = document.createElement("div");
    contentHeadCard.className = "cnt-card";
    
    const numCard = document.createElement("p");
    numCard.className = "txt-card";
    const lengthCards = document.querySelectorAll(".cards > .card").length;
    numCard.innerText = `${lengthCards + 1}`;

    const deleteButton = document.createElement("div");
    deleteButton.className = "icons";
    deleteButton.addEventListener("click", function() {
        card.remove();
        
        const cardsNums = document.querySelectorAll(".cards > .card .txt-card")
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

const emptyKolods = document.getElementById("subpage-1");
const createKolods = document.getElementById("subpage-2");
const buttonCreateKolods = document.getElementById("btn-create");

buttonCreateKolods.addEventListener("click", function(){
    emptyKolods.style.display = "none";
    createKolods.style.display = "block";
})

const returnEmpty = document.getElementById("return-btn");
returnEmpty.addEventListener("click", function(){
  createKolods.style.display = "none";
  emptyKolods.style.display = "block";
})

const buttonAddToSpecial = document.getElementById("btn-add-x");
buttonAddToSpecial.addEventListener("click", () => window.open("cards.html"));

const navMainPage = document.getElementById("main-page");
const navCardsPage = document.getElementById("cards-page");
navMainPage.addEventListener("click", ()=> window.open("index.html"));
navCardsPage.addEventListener("click", ()=> window.open("cards.html"));

const tabPageEdit = document.getElementById("page-edit");
tabPageEdit.addEventListener("click", () => openPage("page-3"));

const tabPageKolods = document.getElementById("page-kolodos");
tabPageKolods.addEventListener("click", () => openPage("page-1"));

const tabPageBest = document.getElementById("page-best");
tabPageBest.addEventListener("click", () => openPage("page-2"));

const buttonLogOut = document.getElementById("logout");
buttonLogOut.addEventListener("click", () => window.open("index.html"));

