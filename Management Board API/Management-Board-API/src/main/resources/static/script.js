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
    fetch(`${BASE_URL}/api/boards/${boardId}/cards`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const todoContainer = document.getElementById('todo');
        const inProgressContainer = document.getElementById('inProgress');
        const doneContainer = document.getElementById('done');

        todoContainer.innerHTML = '<h3>To Do</h3>';
        inProgressContainer.innerHTML = '<h3>In Progress</h3>';
        doneContainer.innerHTML = '<h3>Done</h3>';

        data.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.innerHTML = `
            <h4>${card.title}</h4>
            <p>${card.description}</p>
            `;
            cardElement.className = 'ag-courses_item';

            switch (card.section) {
            case 'ToDo':
                todoContainer.appendChild(cardElement);
                break;
            case 'InProgress':
                inProgressContainer.appendChild(cardElement);
                break;
            case 'Done':
                doneContainer.appendChild(cardElement);
                break;
            }
        });
    })
    .catch(error => console.error('Error:', error));
}

window.onload = getAllBoards;
