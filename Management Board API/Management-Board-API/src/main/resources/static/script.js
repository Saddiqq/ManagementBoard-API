// AJAX function to perform a get request
function httpGetAsync(theUrl, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

// Function to create a new board
function createBoard() {
    var boardTitle = document.getElementById('boardTitle').value;
    var numberOfColumns = document.getElementById('boardColumns').value;

    fetch('/api/boards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: boardTitle,
            columns: numberOfColumns
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Board created:', data);
        getAllBoards(); // refresh the list of boards
    })
    .catch((error) => console.error('Error:', error));
}

// Function to fetch all boards
function getAllBoards() {
    httpGetAsync('/api/boards', function(data) {
        let boards = JSON.parse(data);
        let boardList = document.getElementById('boardList');
        boardList.innerHTML = '';
        boards.forEach(board => {
            boardList.innerHTML += `<p>${board.id} - ${board.title}</p>`;
        });
    });
}

// Function to create a new card
function createCard() {
    var boardId = document.getElementById('cardBoardId').value;
    var cardTitle = document.getElementById('cardTitle').value;
    var section = document.getElementById('cardSection').value;
    var description = document.getElementById('cardDescription').value;

    fetch(`/api/boards/${boardId}/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: cardTitle,
            section: section,
            description: description
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Card created:', data);
        getAllCards(boardId); // refresh the list of cards
    })
    .catch((error) => console.error('Error:', error));
}

// Function to fetch all cards of a board
function getAllCards(boardId) {
    httpGetAsync(`/api/boards/${boardId}/cards`, function(data) {
        let cards = JSON.parse(data);
        let cardList = document.getElementById('cardList');
        cardList.innerHTML = '';
        cards.forEach(card => {
            cardList.innerHTML += `<p>${card.id} - ${card.title} - ${card.section} - ${card.description}</p>`;
        });
    });
}
