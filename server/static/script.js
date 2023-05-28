let curIdx = 0;
let answer = null;
let question = null;
let card = null;
let cardIsFlipped = false;

function initScript() {
    const deckName = 'Семья';
    const info = [
        { front: 'мама', back: 'папа'},
        { front: 'тетя', back: 'дядя'},
        { front: 'сестра', back: 'брат'}
    ];

    addHeader(deckName);
    addCardLogic(info);
    addNumeration(info);
}

function addHeader(deckName) {
    const newHeader = document.createElement('h1');
    const headerBox = document.querySelector('.name-deсk');

    newHeader.className = 'name';
    newHeader.innerHTML = deckName;
    headerBox.appendChild(newHeader);
}

function addCardLogic(info) {
    card = document.querySelector('.card');
    card.addEventListener( 'click', function() {
        card.classList.toggle('is-flipped');
        cardIsFlipped = !cardIsFlipped;
    });

    question = document.createElement('span');
    question.id = "front";

    answer = document.createElement('span');
    answer.id = "back";

    question.innerHTML = info[curIdx].front;
    answer.innerHTML = info[curIdx].back;

    const questionBox = card.querySelector('.card__face--front');
    const answerBox = card.querySelector('.card__face--back');

    questionBox.appendChild(question);
    answerBox.appendChild(answer);
}

function addNumeration(info) {
    const numeration = document.querySelector('.numeration');
    for (let i = 0; i < info.length; i++) {
        let newNum = document.createElement('button');
        newNum.className = 'num';
        newNum.innerHTML = String(i + 1);

        newNum.onclick = (e) => {
            curIdx = i;
            if (cardIsFlipped) {
                card.classList.toggle('is-flipped');
                cardIsFlipped = false;
            }
            question.innerHTML = info[curIdx].front;
            setTimeout(() => answer.innerHTML = info[curIdx].back, 1000);
        }

        newNum.onmousedown = (e) => newNum.style.background = '#2f4dbd';
        newNum.onmouseup = (e) => newNum.style.background = '#305DFF';

        numeration.appendChild(newNum);
    }
}

initScript();





