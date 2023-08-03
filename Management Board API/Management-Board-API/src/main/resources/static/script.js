async function fetchBoardsAndCards() {
    const appDiv = document.getElementById('app');
    const response = await fetch('http://localhost:8080/api/boards');

    if (!response.ok) {
        console.error(`Error fetching boards: ${response.statusText}`);
        return;
    }

    const boards = await response.json();

    for (const board of boards) {
        if (!board.boardId) {
            console.error(`Board with title ${board.title} has no id.`);
            continue;
        }

        const boardDiv = document.createElement('div');
        boardDiv.className = 'board';
        boardDiv.innerHTML = `<h2>${board.title}</h2>`;
        appDiv.appendChild(boardDiv);

        // Adjusted the url to fetch cards based on your data structure
        const cardResponse = await fetch(`http://localhost:8080/api/boards/${board.boardId}/cards`);

        if (!cardResponse.ok) {
            console.error(`Error fetching cards for board ${board.boardId}: ${cardResponse.statusText}`);
            continue;
        }

        const cards = await cardResponse.json();

        if (!Array.isArray(cards)) {
            console.error(`Expected an array of cards, got ${typeof cards}`);
            continue;
        }

        for (const card of cards) {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerText = card.title;
            boardDiv.appendChild(cardDiv);
        }
    }
}

fetchBoardsAndCards();
