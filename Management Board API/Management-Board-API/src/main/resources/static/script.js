async function fetchData(url) {
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    return data;
}

async function putData(url, body) {
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

async function postData(url, body) {
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

async function deleteData(url) {
    const response = await fetch(url, { method: 'DELETE' });
    const data = await response.json();
    return data;
}

function createBoardDiv(board) {
    const div = document.createElement('div');
    div.className = 'board';
    div.textContent = `${board.title} - Columns: ${board.columns}`;
    return div;
}

function createCardDiv(boardId, card) {
    const div = document.createElement('div');
    div.className = 'card';
    div.textContent = `${card.title} - Section: ${card.section} - Description: ${card.description}`;
    return div;
}

async function fetchBoardsAndCards() {
    const appDiv = document.getElementById('app');
    const boards = await fetchData('http://localhost:8080/api/boards');

    for (const board of boards) {
        const boardDiv = createBoardDiv(board);
        const cards = await fetchData(`http://localhost:8080/api/boards/${board.id}/cards`);

        for (const card of cards) {
            const cardDiv = createCardDiv(board.id, card);
            boardDiv.appendChild(cardDiv);
        }

        appDiv.appendChild(boardDiv);
    }
}

window.onload = fetchBoardsAndCards;
