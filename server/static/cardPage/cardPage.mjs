import {getDeckCards, updateCard} from '../api.mjs'

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

const grades = Array.from(document.querySelectorAll('.slider-block')).map(el => {
    return {
        htmlEl: el,
        grade:6,
        num: 0
    }
});

const confetti = document.querySelector('.confetti-container');
const fanfarAudio = document.querySelector('#fanfar');

const charactersPerLine = 30;

let cardIsFlipped = false;
let curIdx = 0;
let mxIdx = 0;

function initScript() {
    const reqParams = new URLSearchParams(window.location.search);
    const deckId = reqParams.get('deckId');

    getDeckCards(deckId).then(
        res => {
            const deckJson = res;
            const deck = {
                deckId: deckId,
                deckName: '',
                info: []
            };

            console.log(res);
            if ('deck' in deckJson) {
                const deckName = deckJson.deck.deckName;
                const cards = deckJson.deck.cards;

                deck.deckName = deckName;

                for (let card of cards) {
                    deck.info.push({
                        id: card.id,
                        front: card.question,
                        back: card.answer,
                        grade: 6,
                        isFavourite: false
                    });
                }
            }
            startScript(deck);
        }
    ).catch(err => {
        console.log(err);
    });
}

function startScript(deck) {
    const deckName = deck.deckName;
    const info = deck.info;

    preprocessCards(info);

    mxIdx = info.length - 1;

    addHeader(deckName);

    addCardLogic(info);
    addGradeLogic(info);
    addSwitching(info);

    addSound();
    addFavourite(info);

    deck.info = info;
    addOnPageUnload(deck);
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

    questionSoundBox.text = info[curIdx].front;
    answerSoundBox.text = info[curIdx].back;

    const questionBox = card.querySelector('.card__face--front');
    const answerBox = card.querySelector('.card__face--back');

    questionBox.appendChild(question);
    answerBox.appendChild(answer);
}

function addSwitching(info) {
    arrows.left.onclick = () => {
        if (curIdx > 0) {
            curIdx--;
            changeCard(info);
            leftSwitch();
            confetti.style.display = 'none';
        }
    };
    arrows.right.onclick = () => {
        if (curIdx < mxIdx) {
            curIdx++;
            changeCard(info);
            rightSwitch();
            confetti.style.display = 'none';
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
    if (cardIsFlipped && curIdx === mxIdx + 1)
        return;
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
            const oldGrade = info[curIdx].grade;
            info[curIdx].grade = 5 - i;

            processSlider(info[curIdx].grade, oldGrade);

            if (curIdx !== mxIdx) {
                rightSwitch();
            } else {
                confetti.style.display = 'block';
                fanfarAudio.play();
            }

            curIdx++;
            curIdx = Math.min(curIdx, mxIdx);

            changeCard(info);
        };
    }
}

function processSlider(newGrade, oldGrade) {
    grades[newGrade - 1].num++;
    grades[oldGrade - 1].num--;

    grades[newGrade - 1].htmlEl.style.width = `${grades[newGrade - 1].num / (mxIdx + 1) * 100}%`;
    grades[oldGrade - 1].htmlEl.style.width = `${grades[oldGrade - 1].num / (mxIdx + 1) * 100}%`;

    grades[newGrade - 1].htmlEl.querySelector('.grade-block').innerHTML = `${grades[newGrade - 1].num}`;
    grades[oldGrade - 1].htmlEl.querySelector('.grade-block').innerHTML = `${grades[oldGrade - 1].num}`;
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
    let emptyValNum = info.length;
    for (let infoCard of info) {
        infoCard.back = formatText(infoCard.back);
        infoCard.front = formatText(infoCard.front);

        if (infoCard.grade !== 6) {
            emptyValNum -= 1;
            grades[infoCard.grade - 1]++;
        }
    }
    grades[5].num = emptyValNum;

    for (let grade of grades) {
        grade.htmlEl.style.width = `${grade.num / (mxIdx + 1) * 100}%`;
        grade.htmlEl.querySelector('.grade-block').innerHTML = `${grade.num}`;
    }

}

function addOnPageUnload(deck) {
    window.addEventListener('beforeunload', () => {
        for (let card of deck.info) {
            updateCard(
                card.id,
                {
                    question: card.front,
                    answer: card.back,
                    grade: card.grade
                }
            );
        }
    });
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
            finalTextArr.push('-<br>');
        }
    }

    return finalTextArr.join('');
}

initScript();
