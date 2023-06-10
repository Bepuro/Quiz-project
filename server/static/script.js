const answer = document.createElement('span');
const question = document.createElement('span');

const answerSoundBox = new SpeechSynthesisUtterance();
const questionSoundBox = new SpeechSynthesisUtterance();

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
    addSound();
    addFavourite();
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

    questionSoundBox.text = info[curIdx].front;
    answerSoundBox.text = info[curIdx].back;


    const questionBox = card.querySelector('.card__face--front');
    const answerBox = card.querySelector('.card__face--back');

    questionBox.appendChild(question);
    answerBox.appendChild(answer);
}

function addSwitching(info, mxIdx) {
    arrows.left.onclick = e => {
        if (curIdx > 0) {
            curIdx--;
            changeCard(info);

            card.style.animation = 'rotateAnimationLeft 0.5s linear';
            card.addEventListener('animationend', () => card.style.animation = '');
        }
    };
    arrows.right.onclick = e => {
        if (curIdx < mxIdx) {
            curIdx++;
            changeCard(info);

            card.style.animation = 'rotateAnimationRight 0.5s linear';
            card.addEventListener('animationend', () => card.style.animation = '');
        }
    };
}

function changeCard(info) {
    if (cardIsFlipped) {
        card.style.transition = 'none';
        card.classList.toggle('is-flipped');
        setTimeout(() => card.style.transition = 'transform 1s', 0);

        cardIsFlipped = false;
        answer.innerHTML = info[curIdx].back;
    } else {
        answer.innerHTML = info[curIdx].back
    }

    question.innerHTML = info[curIdx].front;
    counter.innerHTML = `${curIdx + 1} / ${info.length}`;

    questionSoundBox.text = info[curIdx].front;
    answerSoundBox.text = info[curIdx].back;
}

function addSound() {
    const soundQuestEl = document.querySelector('.card__face--front .sound');
    const soundAnsEl = document.querySelector('.card__face--back .sound');

    soundQuestEl.onclick = e => {
        e.stopPropagation();
        speechSynthesis.speak(questionSoundBox);
    }
    soundAnsEl.onclick = e => {
        e.stopPropagation();
        speechSynthesis.speak(answerSoundBox);
    }
}

function addFavourite() {
    const frontFav = document.querySelector('.card__face--front .favourite');
    const backFav = document.querySelector('.card__face--back .favourite');

    frontFav.onclick = e => e.stopPropagation();
    backFav.onclick = e => e.stopPropagation();
}

initScript();





