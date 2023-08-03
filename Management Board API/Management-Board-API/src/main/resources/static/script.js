const apiURL = 'http://localhost:8080'; // Set your API base url

function createBoard() {
    const boardTitle = document.getElementById('boardTitle').value;
    const boardColumns = document.getElementById('boardColumns').value;

    fetch(`${apiURL}/api/boards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: boardTitle,
            columns: boardColumns
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Board created: ', data);
        // TODO: Add the new board to the board list in the UI
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function createCard() {
    const cardBoardId = document.getElementById('cardBoardId').value;
    const cardTitle = document.getElementById('cardTitle').value;
    const cardSection = document.getElementById('cardSection').value;
    const cardDescription = document.getElementById('cardDescription').value;

    fetch(`${apiURL}/api/boards/${cardBoardId}/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: cardTitle,
            section: cardSection,
            description: cardDescription
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Card created: ', data);
        // TODO: Add the new card to the card list in the UI
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
