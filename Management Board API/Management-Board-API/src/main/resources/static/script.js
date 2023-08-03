async function fetchBoardsAndCards() {
    const appDiv = document.getElementById('app');
    const response = await fetch('http://localhost:8080/api/boards');

    if (!response.ok) {
        console.error(`Error fetching boards: ${response.statusText}`);
        return;
    }

    const boards = await response.json();
    console.log(boards);  // Add this line to log the fetched boards

    for (const board of boards) {
        if (!board.id) {
            console.error(`Board with name ${board.name} has no id.`);
            continue;
        }

        const boardDiv = document.createElement('div');
        boardDiv.className = 'board';
        boardDiv.innerHTML = `<h2>${board.name}</h2>`;
        appDiv.appendChild(boardDiv);

        const cardResponse = await fetch(`http://localhost:8080/api/boards/${board.id}/cards`);

        if (!cardResponse.ok) {
            console.error(`Error fetching cards for board ${board.id}: ${cardResponse.statusText}`);
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
