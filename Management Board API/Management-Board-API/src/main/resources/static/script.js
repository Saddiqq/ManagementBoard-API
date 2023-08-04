const BASE_URL = "http://localhost:8080";
let COLORS = ["first-color", "second-color", "third-color", "fourth-color"];
let colorIndex = 0;
let dragElement = null;

async function httpGetAsync(theUrl) {
    let response = await fetch(theUrl);
    if (response.ok) {
        let data = await response.json();
        return data;
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

async function getAllBoards() {
    const boards = await httpGetAsync(`${BASE_URL}/api/boards`);
    const select = document.getElementById("boardSelect");
    select.innerHTML = "";
    boards.forEach(function(board) {
        const opt = document.createElement('option');
        opt.value = board.boardId;
        opt.innerHTML = board.title;
        select.appendChild(opt);
    });
}

async function createBoard() {
    let boardTitle = document.getElementById('boardTitle').value;
    let numberOfColumns = document.getElementById('boardColumns').value;

    let response = await fetch(`${BASE_URL}/api/boards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: boardTitle,
            columns: numberOfColumns
        }),
    });

    if (response.ok) {
        let data = await response.json();
        getAllBoards();
    } else {
        console.error('Error:', response.status);
    }
}

async function createCard() {
    let boardId = document.getElementById('cardBoardId').value;
    let cardTitle = document.getElementById('cardTitle').value;
    let section = document.getElementById('cardSection').value;
    let description = document.getElementById('cardDescription').value;

    if (!boardId || !cardTitle || !section || !description) {
        alert("All fields are required to create a card.");
        return;
    }

    let sectionMapping = {
        "ToDo": 1,
        "InProgress": 2,
        "Done": 3
    };
    let sectionNumber = sectionMapping[section];

    let cardData = {
        title: cardTitle,
        section: sectionNumber,
        description: description
    };

    let response = await fetch(`${BASE_URL}/api/boards/${boardId}/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
    });

    if (response.ok) {
        let data = await response.json();
        getAllCards(boardId);
    } else {
        console.error('Error:', response.status);
    }
}

function applyColorPatches() {
    const cardElements = document.querySelectorAll('.ag-courses_item:not(.color-patched)');
    cardElements.forEach(cardElement => {
        const colorPatch = cardElement.querySelector('.ag-courses_item_bg');
        const colorClass = COLORS[colorIndex];
        colorPatch.classList.add(colorClass);

        colorIndex = (colorIndex + 1) % COLORS.length;

        cardElement.classList.add('color-patched');
    });
}

function dragstart_handler(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    dragElement = ev.target;

    // Extract the cardData from the data-card attribute
    var cardData = JSON.parse(dragElement.getAttribute("data-card"));

    // Store the cardId and boardId in the dragElement for use in the drop_handler function
    dragElement.setAttribute('data-cardId', cardData.id);
    dragElement.setAttribute('data-boardId', cardData.board.id);

    console.log(cardData.id); // Output cardData.id to console
    console.log(cardData.board.id); // Output cardData.board.id to console
    console.log("Drag Element: ", dragElement);
}


async function drop_handler(ev, targetSection) {
    ev.preventDefault();

    var id = ev.dataTransfer.getData("text/plain");
    var cardElement = document.getElementById(id);

    if (!cardElement) {
        console.error('No card element found with id:', id);
        return;
    }
    // Retrieve the cardId and boardId from the dragElement
    var cardId = cardElement.getAttribute("data-cardId");
    var boardId = cardElement.getAttribute("data-boardId");
    var cardDataString = cardElement.getAttribute("data-card");

    if (!cardDataString) {
        console.error('No data-card attribute found on element:', cardElement);
        return;
    }

    var cardData = JSON.parse(cardDataString);

    console.log("Card Data: ", cardData);

    // update the card's section in the database
    cardData.section = targetSection;

    let response = await fetch(`${BASE_URL}/api/boards/${cardData.boardId}/cards/${cardData.cardId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
    });

    if (response.ok) {
        let data = await response.json();
        getAllCards(cardData.boardId);
    } else {
        console.error('Error:', response.status);
    }
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
        cardElement.id = `card-${card.cardId}`;
        cardElement.setAttribute("data-card", JSON.stringify(card));
        cardElement.draggable = true;
        cardElement.addEventListener("dragstart", dragstart_handler);

        cardElement.innerHTML = `
            <h4 class="card-title">${card.title}</h4>
            <p class="card-description">${card.description}</p>
            <div class="ag-courses_item_bg"></div>
        `;
        cardElement.className = 'ag-courses_item';

        console.log(card);  // Log card data to the console here

        switch (card.section) {
            case 1:
                todoContainer.appendChild(cardElement);
                break;
            case 2:
                inProgressContainer.appendChild(cardElement);
                break;
            case 3:
                doneContainer.appendChild(cardElement);
                break;
        }

        applyColorPatches();
    }

    todoContainer.ondragover = function (ev) { ev.preventDefault(); };
    inProgressContainer.ondragover = function (ev) { ev.preventDefault(); };
    doneContainer.ondragover = function (ev) { ev.preventDefault(); };

    todoContainer.ondrop = function (ev) { drop_handler(ev, 1); };
    inProgressContainer.ondrop = function (ev) { drop_handler(ev, 2); };
    doneContainer.ondrop = function (ev) { drop_handler(ev, 3); };
}


async function showSelectedBoardInfo(boardId) {
    let board = await httpGetAsync(`${BASE_URL}/api/boards/${boardId}`);
    const boardInfo = document.getElementById("boardInfo");
    boardInfo.innerHTML = `Board Name: ${board.title},     Board ID: ${board.boardId}`;
}

document.getElementById("boardSelect").addEventListener("change", function() {
    const boardId = this.value;
    showSelectedBoardInfo(boardId);
    getAllCards(boardId);
});

window.onload = async function() {
    await getAllBoards();

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                applyColorPatches();
            }
        });
    });

    const config = { childList: true, subtree: true };

    observer.observe(document.body, config);
};