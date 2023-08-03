const apiURL = 'http://localhost:8080'; // Set your API base url

// Fetch and display all boards when the page loads
window.onload = function() {
  fetchBoards();
}

// Function to fetch and display all boards
function fetchBoards() {
    fetch(`${apiURL}/api/boards`)
        .then(response => response.json())
        .then(data => {
            const boardList = document.getElementById('boardList');
            boardList.innerHTML = ''; // Clear the list
            data.forEach(board => {
                const boardElement = document.createElement('div');
                boardElement.innerText = `Board Id: ${board.id}, Title: ${board.title}, Columns: ${board.columns}`;
                boardList.appendChild(boardElement);
                fetchCards(board.id); // Fetch and display cards of this board
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
                cardElement.innerText = `Card Id: ${card.id}, Title: ${card.title}, Section: ${card.section}, Description: ${card.description}`;
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
        fetchBoards(); // Refresh the board list
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
        fetchBoards(); // Refresh the board list to also update the cards
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
