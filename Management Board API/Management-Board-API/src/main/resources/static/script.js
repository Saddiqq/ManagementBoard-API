async function fetchData(url) {
    console.log(`Fetching data from ${url}`); // Added log
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

function createBoardDiv(board) {
    console.log(board); // Added log
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
    console.log("Starting to fetch boards and cards."); // Added log

    const appDiv = document.getElementById('app');

    try {
        const boards = await fetchData('http://localhost:8080/api/boards');

        for (const board of boards) {
            const boardDiv = createBoardDiv(board);

            try {
                const cards = await fetchData(`http://localhost:8080/api/boards/${board.id}/cards`);

                for (const card of cards) {
                    const cardDiv = createCardDiv(board.id, card);
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

// Call the function
fetchBoardsAndCards();
