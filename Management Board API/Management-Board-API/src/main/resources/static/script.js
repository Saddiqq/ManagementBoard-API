const BASE_URL = "http://localhost:8080";

function httpGetAsync(theUrl, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

let boardsData = [];

function getAllBoards() {
    httpGetAsync(`${BASE_URL}/api/boards`, function(responseText) {
        const boards = JSON.parse(responseText);
        boardsData = boards;
        const select = document.getElementById("boardSelect");
        select.innerHTML = "";
        boards.forEach(function(board) {
            const opt = document.createElement('option');
            opt.value = board.boardId;
            opt.innerHTML = board.title;
            select.appendChild(opt);
        });
    });
}

function createBoard() {
    var boardTitle = document.getElementById('boardTitle').value;
    var numberOfColumns = document.getElementById('boardColumns').value;

    fetch(`${BASE_URL}/api/boards`, {
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
        getAllBoards();
    })
    .catch((error) => console.error('Error:', error));
}

function createCard() {
    var boardId = document.getElementById('cardBoardId').value;
    var cardTitle = document.getElementById('cardTitle').value;
    var section = document.getElementById('cardSection').value;
    var description = document.getElementById('cardDescription').value;

    if (!boardId || !cardTitle || !section || !description) {
        alert("All fields are required to create a card.");
        return;
    }

    var cardData = {
        title: cardTitle,
        section: section,
        description: description
    };

    fetch(`${BASE_URL}/api/boards/${boardId}/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Card created:', data);
        getAllCards(boardId);
    })
    .catch((error) => console.error('Error:', error));
}

function getAllCards(boardId) {
    const selectedBoard = boardsData.find(board => board.boardId == boardId);

    if(selectedBoard) {
        let boardInfo = document.getElementById('boardInfo');
        boardInfo.innerHTML = `Board ID: ${selectedBoard.boardId}<br>Title: ${selectedBoard.title}<br>Number of Columns: ${selectedBoard.columns}`;

        httpGetAsync(`${BASE_URL}/api/boards/${boardId}/cards`, function(data) {
            let cards = JSON.parse(data);
            let todo = document.getElementById('todo');
            let inProgress = document.getElementById('inProgress');
            let done = document.getElementById('done');
            todo.innerHTML = '<h3>To Do</h3>';
            inProgress.innerHTML = '<h3>In Progress</h3>';
            done.innerHTML = '<h3>Done</h3>';

            cards.forEach(card => {
                switch(card.section) {
                    case 1:
                        todo.innerHTML += `<div class='card'><p>${card.id} - ${card.title} - ${card.description}</p></div>`;
                        break;
                    case 2:
                        inProgress.innerHTML += `<div class='card'><p>${card.id} - ${card.title} - ${card.description}</p></div>`;
                        break;
                    case 3:
                        done.innerHTML += `<div class='card'><p>${card.id} - ${card.title} - ${card.description}</p></div>`;
                        break;
                    default:
                        console.error(`Unexpected section number: ${card.section}`);
                }
            });
        });
    } else {
        let boardInfo = document.getElementById('boardInfo');
        boardInfo.innerHTML = '';
        let todo = document.getElementById('todo');
        let inProgress = document.getElementById('inProgress');
        let done = document.getElementById('done');
        todo.innerHTML = '<h3>To Do</h3>';
        inProgress.innerHTML = '<h3>In Progress</h3>';
        done.innerHTML = '<h3>Done</h3>';
    }
}

window.onload = getAllBoards;