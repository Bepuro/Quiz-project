import {getUserDecks} from "./api.mjs";

const btnOpen = document.getElementById("btn-txt");
const btnClose = document.querySelector("#btn-close")
const modal = document.querySelector("#modal");
const sign_btn = document.getElementById("sign-up");

const btnOpen_1 = document.getElementById("btn");
const btnClose_1 = document.getElementById("btn-close-1")
const modal_1 = document.getElementById("modal_1");
const login_btn = document.getElementById("log-in");
const btnOpen1 = document.getElementById("wrp-img");

const itemPattern = document.createElement('div');
const cardsList = document.querySelector('.list');

function addButtons() {
  btnOpen.onclick = () => {
    modal.showModal()
  }


  btnClose.onclick = () => {
    modal.close()
  }


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

  btnOpen1.onclick = () => {
    modal.showModal()
  }


  btnClose.onclick = () => {
    modal.close()
  }
}

function createItemPattern() {
  itemPattern.className = 'item';
  itemPattern.innerHTML = [
      '<div class="item" onclick="window.location.href = \'card\';">',
        '<div class="block-name">',
          '<div class="text-block">',
            '<h3 class="text text-list" id="deck-name">Cтроение компа</h3>',
            '<a class="desc" id="quest-count">12 вопросов</a>',
          '</div>',
          '<div class="name">',
            '<div class="circle"></div>',
            '<div class="text" id="author-name">Oleg Ivanov</div>',
          '</div>',
        '</div>',
        '<div class="tag">АрхЭвм</div>',
      '</div>'
  ].join('');
}

function addDeckBlocks(decks) {
  for (let deck of decks) {
    let newBlock = itemPattern.cloneNode(true);
    newBlock.querySelector('#deck-name').innerText = deck.name;
    newBlock.querySelector('#quest-count').innerText =
        `${deck.questionNum} ${deck.questionNum === 1 ? 'question' : 'questions'}`;
    newBlock.querySelector('#author-name').innerText = deck.author;
    newBlock.onclick = e => window.location.href = `card?deckId=${deck.id}`;

    cardsList.appendChild(newBlock);
  }
}

function initScript() {
  const decks = [];
  getUserDecks().then(decksJson => {
    if ('decks' in decksJson) {
      for (let deck of decksJson.decks) {
        decks.push({
          name: deck.name,
          questionNum: 'many',
          author: 'Petya',
          id: deck.id
        });
      }

      startScript(decks);
    } else {
      throw new Error(decksJson.message);
    }
  })
}

function startScript(decks) {
  addButtons();
  createItemPattern();
  addDeckBlocks(decks);
}

initScript([
  {
    name: 'АРХэвм',
    questionNum: 1,
    author: 'Petya',
    id: 4
  },
  {
    name: 'АРХэвм',
    questionNum: 12,
    author: 'Petya',
    id: 4
  },
  {
    name: 'АРХэвм',
    questionNum: 12,
    author: 'Petya',
    id: 4
  },
  {
    name: 'АРХэвм',
    questionNum: 12,
    author: 'Petya',
    id: 4
  }
]);