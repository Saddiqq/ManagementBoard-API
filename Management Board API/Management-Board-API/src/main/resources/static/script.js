async function fetchBoardsAndCards() {
    const appDiv = document.getElementById('app');

    try {
        console.log("Starting to fetch boards and cards.");
        const boards = await fetchData('http://localhost:8080/api/boards');

        for (const board of boards) {
            const boardDiv = createBoardDiv(board);

            try {
                console.log(`Fetching cards for board ${board.boardId}`);
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

function createBoardDiv(board) {
    console.log(board);
    const div = document.createElement('div');
    div.className = 'board';

    // Convert columns object into a string
    let columnsString = '';
    for (let key in board.columns) {
        columnsString += `Column ${key}: ${board.columns[key]}, `;
    }
    // Remove last comma and space
    columnsString = columnsString.slice(0, -2);

    div.textContent = `${board.title} - ${columnsString}`;
    return div;
}
