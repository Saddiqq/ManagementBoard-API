const BASE_URL = "http://localhost:8080";
let COLORS = ["first-color", "second-color", "third-color", "fourth-color"];
let colorIndex = 0;

function httpGetAsync(theUrl, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

function getAllBoards() {
    httpGetAsync(`${BASE_URL}/api/boards`, function(responseText) {
        const boards = JSON.parse(responseText);
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
        getAllBoards();
    })
    .catch((error) => console.error('Error:', error));
}

function createCard() {
    var boardId = document.getElementById('cardBoardId').value;
    var cardTitle = document.getElementById('cardTitle').value;
   var section = parseInt(document.getElementById('cardSection').value);
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
        getAllCards(boardId);
    })
    .catch((error) => console.error('Error:', error));
}

function applyColorPatches() {
    const cardElements = document.querySelectorAll('.ag-courses_item:not(.color-patched)');
    cardElements.forEach(cardElement => {
        const colorPatch = cardElement.querySelector('.ag-courses_item_bg');
        const colorClass = COLORS[colorIndex];
        colorPatch.classList.add(colorClass);

        // Increase colorIndex or reset if it's out of bounds
        colorIndex = (colorIndex + 1) % COLORS.length;

        // Mark card as patched
        cardElement.classList.add('color-patched');
    });
}

async function getAllCards(boardId) {
    const response = await fetch(`${BASE_URL}/api/boards/${boardId}/cards`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    const todoContainer = document.getElementById('todo');
    const inProgressContainer = document.getElementById('inProgress');
    const doneContainer = document.getElementById('done');

    todoContainer.innerHTML = '<h3>To Do</h3>';
    inProgressContainer.innerHTML = '<h3>In Progress</h3>';
    doneContainer.innerHTML = '<h3>Done</h3>';

    for(const card of data) {
        const cardElement = document.createElement('div');
        cardElement.innerHTML = `
            <h4 class="card-title">${card.title}</h4>
            <p class="card-description">${card.description}</p>
            <div class="ag-courses_item_bg"></div>
        `;
        cardElement.className = 'ag-courses_item';

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

        // Apply color patch after card is appended to the DOM
        applyColorPatches();
    }
}

function showSelectedBoardInfo(boardId) {
    httpGetAsync(`${BASE_URL}/api/boards/${boardId}`, function(responseText) {
        const board = JSON.parse(responseText);
       const boardInfo = document.getElementById("boardInfo");
       boardInfo.innerHTML = `Selected Board: ${board.title}, BoardID: ${board.boardId}`;
    });
}

document.getElementById("boardSelect").addEventListener("change", function() {
    const boardId = this.value;
    showSelectedBoardInfo(boardId);
    getAllCards(boardId);
});

window.onload = function() {
    getAllBoards();

    // Create a MutationObserver instance
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                applyColorPatches();
            }
        });
    });

    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true };

    // Start observing the document with the configured parameters
    observer.observe(document.body, config);
}
