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
function createBoard(boardTitle, numberOfColumns) {
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
    .then(data => console.log('Board created:', data))
    .catch((error) => console.error('Error:', error));
}

// Function to fetch all boards
function getAllBoards() {
    httpGetAsync('/api/boards', function(data) {
        let boards = JSON.parse(data);
        console.log(boards);
    });
}

// Function to create a new card
function createCard(boardId, cardTitle, section, description) {
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
    .then(data => console.log('Card created:', data))
    .catch((error) => console.error('Error:', error));
}

// Function to fetch all cards of a board
function getAllCards(boardId) {
    httpGetAsync(`/api/boards/${boardId}/cards`, function(data) {
        let cards = JSON.parse(data);
        console.log(cards);
    });
}
