async function fetch(url) {
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    return data;
}

async function put(url, body) {
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

async function post(url, body) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

async function del(url) {
    const response = await fetch(url, { method: 'DELETE' });
    const data = await response.json();
    return data;
}

function createBoardDiv(board) {
    const boardDiv = document.createElement('div');
    boardDiv.className = 'board';
    boardDiv.innerHTML = `
        <h2>${board.title}</h2>
        <button onclick="updateBoard(${board.boardId})">Update Board</button>
        <button onclick="deleteBoard(${board.boardId})">Delete Board</button>
        <button onclick="addCard(${board.boardId})">Add Card</button>
    `;
    return boardDiv;
}

function createCardDiv(boardId, card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.innerHTML = `
        ${card.title}
        <button onclick="updateCard(${boardId}, ${card.id})">Update Card</button>
        <button onclick="deleteCard(${boardId}, ${card.id})">Delete Card</button>
    `;
    return cardDiv;
}

async function updateBoard(boardId) {
    const updatedBoard = await put(`http://localhost:8080/api/boards/${boardId}`, { title: 'Updated Board Title' });
    console.log('Board updated', updatedBoard);
}

async function deleteBoard(boardId) {
    const deleteResponse = await del(`http://localhost:8080/api/boards/${boardId}`);
    console.log('Board deleted', deleteResponse);
}

async function addCard(boardId) {
    const newCard = await post(`http://localhost:8080/api/boards/${boardId}/cards`, { title: 'New Card' });
    console.log('Card added', newCard);
}

async function updateCard(boardId, cardId) {
    const updatedCard = await put(`http://localhost:8080/api/boards/${boardId}/cards/${cardId}`, { title: 'Updated Card Title' });
    console.log('Card updated', updatedCard);
}

async function deleteCard(boardId, cardId) {
    const deleteResponse = await del(`http://localhost:8080/api/boards/${boardId}/cards/${cardId}`);
    console.log('Card deleted', deleteResponse);
}

async function fetchBoardsAndCards() {
    const appDiv = document.getElementById('app');
    const boards = await fetch('http://localhost:8080/api/boards').then(response => response.json());

    for (const board of boards) {
        const boardDiv = createBoardDiv(board);

        const cards = await fetch(`http://localhost:8080/api/boards/${board.boardId}/cards`).then(response => response.json());

        for (const card of cards) {
            const cardDiv = createCardDiv(board.boardId, card);
            boardDiv.appendChild(cardDiv);
        }

        appDiv.appendChild(boardDiv);
    }
}

window.onload = fetchBoardsAndCards;
