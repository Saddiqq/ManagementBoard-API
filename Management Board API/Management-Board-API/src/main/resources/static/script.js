async function fetchData(url) {
    console.log(`Fetching data from ${url}`);
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

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

function createButton(name, callback) {
    const button = document.createElement('button');
    button.textContent = name;
    button.addEventListener('click', callback);
    return button;
}

function createBoardDiv(board) {
    const div = document.createElement('div');
    div.className = 'board';
    div.textContent = `${board.title} - Columns: ${JSON.stringify(board.columns)}`;
    return div;
}

function createCardDiv(boardId, card) {
    const div = document.createElement('div');
    div.className = 'card';
    div.textContent = `${card.title} - Section: ${card.section} - Description: ${card.description}`;

    const editButton = createButton('Edit', () => {
        // TODO: call function to edit this card
    });

    const deleteButton = createButton('Delete', () => {
        // TODO: call function to delete this card
    });

    const moveButton = createButton('Move', () => {
        // TODO: call function to move this card
    });

    div.appendChild(editButton);
    div.appendChild(deleteButton);
    div.appendChild(moveButton);

    return div;
}

async function fetchBoardsAndCards() {
    console.log("Starting to fetch boards and cards.");
    const appDiv = document.getElementById('app');

    try {
        const boards = await fetchData('http://localhost:8080/api/boards');

        for (const board of boards) {
            const boardDiv = createBoardDiv(board);

            try {
                const cards = await fetchData(`http://localhost:8080/api/boards/${board.boardId}/cards`);

                for (const card of cards) {
                    const cardDiv = createCardDiv(board.boardId, card);
                    boardDiv.appendChild(cardDiv);
                }
            } catch (error) {
                console.error('Failed to fetch cards:', error);
            }

            appDiv.appendChild(boardDiv);
        }
    } catch (error) {
        console.error('Failed to fetch boards:', error);
    }
}

fetchBoardsAndCards();
