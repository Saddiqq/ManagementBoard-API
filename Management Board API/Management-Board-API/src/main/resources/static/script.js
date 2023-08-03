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
    console.log("getAllBoards() function called"); // debugging line
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
    console.log("createBoard() function called"); // debugging line
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
    console.log("createCard() function called"); // debugging line
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
    console.log("getAllCards() function called with boardId: ", boardId); // debugging line
    fetch(`${BASE_URL}/api/boards/${boardId}/cards`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log("Cards fetched successfully"); // debugging line
        console.log("Cards data: ", data); // debugging line
        const todoContainer = document.getElementById('todo');
        const inProgressContainer = document.getElementById('inProgress');
        const doneContainer = document.getElementById('done');

        todoContainer.innerHTML = '<h3>To Do</h3>';
        inProgressContainer.innerHTML = '<h3>In Progress</h3>';
        doneContainer.innerHTML = '<h3>Done</h3>';

        data.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'ag-courses_item';
            cardElement.innerHTML = `
                <a class="ag-courses-item_link">
                    <div class="ag-courses-item_bg" style="background-color:${getRandomColor()}"></div>
                    <h4>${card.title}</h4>
                    <p>${card.description}</p>
                </a>
            `;

            switch (card.section) {
                case 1: // 'ToDo'
                    todoContainer.appendChild(cardElement);
                    break;
                case 2: // 'InProgress'
                    inProgressContainer.appendChild(cardElement);
                    break;
                case 3: // 'Done'
                    doneContainer.appendChild(cardElement);
                    break;
            }
        });
    })
    .catch(error => console.error('Error:', error));
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

window.onload = getAllBoards;
