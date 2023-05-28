const answer = document.createElement('span');
const question = document.createElement('span');
const card = document.querySelector('.card');
const counter = document.querySelector('.counter');
const arrows = {
    left: document.querySelector('.left-arrow'),
    right: document.querySelector('.right-arrow')
}


let cardIsFlipped = false;
let curIdx = 0;


function initScript() {
    const deckName = 'Семья';
    const info = [
        { front: 'мама', back: 'папа'},
        { front: 'тетя', back: 'дядя'},
        { front: 'сестра', back: 'брат'}
    ];

    let mxIdx = info.length - 1;

    addHeader(deckName);
    addCardLogic(info);
    addSwitching(info, mxIdx);
}

function addHeader(deckName) {
    const newHeader = document.createElement('h1');
    const headerBox = document.querySelector('.name-deсk');

    newHeader.className = 'name';
    newHeader.innerHTML = deckName;
    headerBox.appendChild(newHeader);
}

function addCardLogic(info) {
    card.addEventListener( 'click', function() {
        card.classList.toggle('is-flipped');
        cardIsFlipped = !cardIsFlipped;
    });

    question.id = "front";
    answer.id = "back";

    counter.innerHTML = `${curIdx + 1} / ${info.length}`;
    question.innerHTML = info[curIdx].front;
    answer.innerHTML = info[curIdx].back;

    const questionBox = card.querySelector('.card__face--front');
    const answerBox = card.querySelector('.card__face--back');

    questionBox.appendChild(question);
    answerBox.appendChild(answer);
}

function addSwitching(info, mxIdx) {
    arrows.left.onclick = e => {
        if (curIdx > 0) {
            curIdx--;
            question.innerHTML = info[curIdx].front;
            tryFlipCard(info);
            counter.innerHTML = `${curIdx + 1} / ${info.length}`;
        }
    };
    arrows.right.onclick = e => {
        if (curIdx < mxIdx) {
            curIdx++;
            question.innerHTML = info[curIdx].front;
            tryFlipCard(info);
            counter.innerHTML = `${curIdx + 1} / ${info.length}`;
        }
    };
}

function tryFlipCard(info) {
    if (cardIsFlipped) {
        card.classList.toggle('is-flipped');
        cardIsFlipped = false;
        setTimeout(() => answer.innerHTML = info[curIdx].back, 500);
    }
}

initScript();





