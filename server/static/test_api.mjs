import {
    getDeckCards,
    getUserDecks,
    updateCard,
    addCard,
    deleteDeck,
    updateDeck,
    deleteCard,
    createDeck
} from "./api.mjs";

document.addEventListener('DOMContentLoaded', function() {
    getUserDecks().then(function(decks) {
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
            getDeckCards(deckId).then(function(cards) {
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

document.getElementById('deleteCardForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let cardId = document.getElementById('deleteCardId').value;
    deleteCard(cardId);
});

document.getElementById('updateCardForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let cardId = document.getElementById('updateCardId').value;
    let newQuestion = document.getElementById('newQuestion').value;
    let newAnswer = document.getElementById('newAnswer').value;
    updateCard(cardId, newQuestion, newAnswer);
});