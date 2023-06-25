export const API_BASE_URL = `${window.location.origin}/api`;


export function getUserDecks() {
    return fetch(`${API_BASE_URL}/user/decks`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data;
    });
}

export function createDeck(deckName) {
    const deckData = {
        name: deckName
    };
    fetch(`${API_BASE_URL}/decks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deckData),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

export function deleteDeck(deckId) {
    fetch(`${API_BASE_URL}/decks/${deckId}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

export function addCard(deckId, question, answer) {
    const cardData = {
        question: question,
        answer: answer
    };
    fetch(`${API_BASE_URL}/decks/${deckId}/card`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

export function addCards(deckId, cards) {
    fetch(`${API_BASE_URL}/decks/${deckId}/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({cards: cards}),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

export function deleteCard(cardId) {
    fetch(`${API_BASE_URL}/cards/${cardId}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

export function updateDeck(deckId, newName) {
    const deckData = {
        name: newName
    };
    fetch(`${API_BASE_URL}/decks/${deckId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deckData),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

export function updateCard(cardId, newCardData) {
    fetch(`${API_BASE_URL}/cards/${cardId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCardData),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

export function getDeckCards(deckId) {
    return fetch(`${API_BASE_URL}/decks/${deckId}/cards`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data;
    });
}
