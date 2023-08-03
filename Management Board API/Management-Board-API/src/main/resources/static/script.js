const appDiv = document.getElementById('app');

async function fetchBoardsAndCards() {
    const boards = await fetch('http://localhost:8080/api/boards').then(response => response.json());

    for (const board of boards) {
        const boardDiv = createBoardDiv(board);

        const cards = await fetch(`http://localhost:8080/api/boards/${board.boardId}/cards`).then(response => response.json());

        for (const card of cards) {
            const cardDiv = createCardDiv(card);
            boardDiv.appendChild(cardDiv);
        }

        appDiv.appendChild(boardDiv);
    }
}

function createBoardDiv(board) {
    const boardDiv = document.createElement('div');
    boardDiv.className = 'board';
    boardDiv.innerHTML = `
        <h2>${board.title}</h2>
        <button onclick="updateBoard(${board.boardId})">Update Board</button>
        <button onclick="deleteBoard(${board.boardId})">Delete Board</button>
    `;
    return boardDiv;
}

function createCardDiv(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.innerHTML = `
        ${card.title}
        <button onclick="updateCard(${card.boardId}, ${card.id})">Update Card</button>
        <button onclick="deleteCard(${card.boardId}, ${card.id})">Delete Card</button>
    `;
    return cardDiv;
}

async function updateBoard(boardId) {
    const updatedBoard = { title: 'New title' }; // You would probably fetch this from a form
    const response = await fetch(`http://localhost:8080/api/boards/${boardId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedBoard),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        console.log(`Board ${boardId} updated`);
    }
}

async function deleteBoard(boardId) {
    const response = await fetch(`http://localhost:8080/api/boards/${boardId}`, { method: 'DELETE' });
    if (response.ok) {
        console.log(`Board ${boardId} deleted`);
    }
}

async function updateCard(boardId, cardId) {
    const updatedCard = { title: 'New card title' }; // You would probably fetch this from a form
    const response = await fetch(`http://localhost:8080/api/boards/${boardId}/cards/${cardId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedCard),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        console.log(`Card ${cardId} updated`);
    }
}

async function deleteCard(boardId, cardId) {
    const response = await fetch(`http://localhost:8080/api/boards/${boardId}/cards/${cardId}`, { method: 'DELETE' });
    if (response.ok) {
        console.log(`Card ${cardId} deleted`);
    }
}

fetchBoardsAndCards();
