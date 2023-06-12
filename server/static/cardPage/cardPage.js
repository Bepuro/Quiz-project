const answer = document.querySelector('#answer');
const question = document.querySelector('#question');

const answerSoundBox = new SpeechSynthesisUtterance();
const questionSoundBox = new SpeechSynthesisUtterance();

const card = document.querySelector('.card');
const counter = document.querySelector('.counter');

const arrows = {
    left: document.querySelector('.left-arrow'),
    right: document.querySelector('.right-arrow')
}

const charactersPerLine = 20;


let cardIsFlipped = false;
let curIdx = 0;


function initScript(deck) {
    const deckName = deck.deckName;
    const info = deck.info;

    preprocessCards(info);

    let mxIdx = info.length - 1;

    addHeader(deckName);
    addCardLogic(info);
    addGradeLogic(info);
    addSwitching(info, mxIdx);
    addSound();
    addFavourite(info);
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

    counter.innerHTML = `${curIdx + 1} / ${info.length}`;
    question.innerHTML = info[curIdx].front;
    answer.innerHTML = info[curIdx].back;

    //question.onclick = e => e.stopPropagation();
    //answer.onclick = e => e.stopPropagation();

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
            leftSwitch();
        }
    };
    arrows.right.onclick = e => {
        if (curIdx < mxIdx) {
            curIdx++;
            changeCard(info);
            rightSwitch();
        }
    };
}

function leftSwitch() {
    card.style.animation = 'rotateAnimationLeft 0.5s linear';
    card.addEventListener('animationend', () => card.style.animation = '');
}

function rightSwitch() {
    card.style.animation = 'rotateAnimationRight 0.5s linear';
    card.addEventListener('animationend', () => card.style.animation = '');
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

    speechSynthesis.cancel();
}

function addGradeLogic(info) {
    const grades = document.querySelectorAll('.grade');

    for (let i = 0; i < grades.length; i++) {
        grades[i].onclick = () => {
            info[curIdx].grade = info.length - i + 1;

            rightSwitch();

            curIdx++;
            curIdx %= info.length;

            changeCard(info);
        };
    }
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

function addFavourite(info) {
    const frontFav = document.querySelector('.card__face--front .favourite');
    const backFav = document.querySelector('.card__face--back .favourite');

    frontFav.onclick = e => {
        e.stopPropagation();
        info[curIdx].isFavourite = true;
    };
    backFav.onclick = e => {
        e.stopPropagation();
        info[curIdx].isFavourite = true;
    };
}

function preprocessCards(info) {
    for (let infoCard of info) {
        infoCard.back = formatText(infoCard.back);
        infoCard.front = formatText(infoCard.front);
    }
}

function formatText(text) {
    const words = text.split('');
    const finalTextArr = [];

    let curLength = 0;
    for (let i = 0; i < words.length; i++) {
        finalTextArr.push(words[i]);
        curLength += words[i].length;

        if (curLength >= charactersPerLine) {
            curLength = 0;
            finalTextArr.push('<br>');
        }
    }

    return finalTextArr.join('');
}

initScript({
    deckName: 'Семья',
    info: [
        { front: 'мама', back: 'папа', grade: -1, isFavourite: false },
        { front: 'тетя', back: 'дядя', grade: -1, isFavourite: false },
        { front: 'сестра', back: 'брат', grade: -1, isFavourite: false },
        {
            front: 'Очень длинный текст',
            back: function () {
                let arr = [];
                for (let i = 0; i < 1000; i++) {
                    arr.push('очень длинный текст ');
                }
                return arr.join('');
            }(),
            grade: -1,
            isFavourite: false
        },
    ]
});
