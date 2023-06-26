import {getUserDecks} from "./api.mjs";

const itemPattern = document.createElement('div');
const cardsList = document.querySelector('.list');
const prof = document.querySelector('#btn');

prof.addEventListener('click', () => {
  window.open('/profile');
})

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
  createItemPattern();
  addDeckBlocks(decks);
}

initScript();