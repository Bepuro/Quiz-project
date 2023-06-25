import {
    getDeckCards,
    getUserDecks,
    updateCard,
    addCard,
    addCards,
    deleteDeck,
    updateDeck,
    deleteCard,
    createDeck
} from "./api.mjs";

document.addEventListener('DOMContentLoaded', function() {
    getUserDecks().then(function(response) {
        let decks = response.decks;
        let decksDiv = document.getElementById('decks');
        decks.forEach(function(deck) {
            let deckDiv = document.createElement('div');
            deckDiv.textContent = deck.id + ': ' + deck.name;
            decksDiv.appendChild(deckDiv);
        });
    });

    document.getElementById('getCardsForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let deckId = document.getElementById('deckIdInput').value;
        if (deckId) {
            getDeckCards(deckId).then(function(response) {
                let cards = response.deck.cards;
                let cardsDiv = document.getElementById('cards');
                cardsDiv.innerHTML = '';
                cards.forEach(function(card) {
                    let cardDiv = document.createElement('div');
                    cardDiv.textContent = card.id + ': ' + card.question + ' -> ' + card.answer;
                    cardsDiv.appendChild(cardDiv);
                });
            });
        }
    });
});

document.getElementById('createDeckForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let deckName = document.getElementById('deckName').value;
    createDeck(deckName);
});

document.getElementById('deleteDeckForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let deckId = document.getElementById('deleteDeckId').value;
    deleteDeck(deckId);
});

document.getElementById('updateDeckForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let deckId = document.getElementById('updateDeckId').value;
    let newDeckName = document.getElementById('newDeckName').value;
    updateDeck(deckId, newDeckName);
});

document.getElementById('createCardForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let deckId = document.getElementById('deckId').value;
    let question = document.getElementById('question').value;
    let answer = document.getElementById('answer').value;
    addCard(deckId, question, answer);
});

document.getElementById('uploadCardsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let deckId = document.getElementById('deckIdForUpload').value;
    if (!deckId) {
        alert('Пожалуйста, введите id колоды');
        return;
    }
    let csvFile = document.getElementById('csvFile').files[0];
    if (!csvFile) {
        alert('Пожалуйста, выберите файл');
        return;
    }
    let reader = new FileReader();
    reader.onload = function(e) {
        let contents = e.target.result;
        let cards = parseCardsFromCSV(contents);
        addCards(deckId, cards);
    };
    reader.readAsText(csvFile);
});

function parseCardsFromCSV(csvText) {
    let rows = csvText.split(/\r?\n/);
    return rows.map(function(row) {
        var cells = row.split('\t');
        return {
            question: cells[0],
            answer: cells[1]
        };
    });
}

document.getElementById('jsonUploadCardsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let deckId = document.getElementById('jsonDeckIdForUpload').value;
    if (!deckId) {
        alert('Пожалуйста, введите id колоды');
        return;
    }
    let jsonFile = document.getElementById('jsonFile').files[0];
    if (!jsonFile) {
        alert('Пожалуйста, выберите файл');
        return;
    }
    let reader = new FileReader();
    reader.onload = function(e) {
        let contents = e.target.result;
        let cards = parseCardsFromJSON(contents);
        addCards(deckId, cards);
    };
    reader.readAsText(jsonFile);
});

function parseCardsFromJSON(jsonText) {
    return JSON.parse(jsonText);
}

document.getElementById('deleteCardForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let cardId = document.getElementById('deleteCardId').value;
    deleteCard(cardId);
});

document.getElementById('updateCardForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let cardId = document.getElementById('updateCardId').value;
    let newCardData = {
        question: document.getElementById('newQuestion').value,
        answer: document.getElementById('newAnswer').value,
        grade: 5
    }
    updateCard(cardId, newCardData);
});