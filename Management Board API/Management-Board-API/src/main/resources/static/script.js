const apiURL = 'http://localhost:8080'; // Set your API base url

// Function to fetch and display all boards
function fetchBoards() {
    fetch(`${apiURL}/api/boards`)
        .then(response => response.json())
        .then(data => {
            const boardList = document.getElementById('boardList');
            boardList.innerHTML = ''; // Clear the list
            data.forEach(board => {
                const boardElement = document.createElement('div');
                boardElement.innerText = board.title;
                boardList.appendChild(boardElement);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Function to fetch and display cards of a specific board
function fetchCards(boardId) {
    fetch(`${apiURL}/api/boards/${boardId}/cards`)
        .then(response => response.json())
        .then(data => {
            const cardList = document.getElementById('cardList');
            cardList.innerHTML = ''; // Clear the list
            data.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.innerText = card.title;
                cardList.appendChild(cardElement);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

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
        fetchBoards(); // Fetch and display all boards
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
        fetchCards(cardBoardId); // Fetch and display cards of the given board
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
