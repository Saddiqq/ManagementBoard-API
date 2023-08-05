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
        const updateButton = document.querySelector(`#${cardData.id} .update-button`);
        updateButton.addEventListener('click', function() {
            updateCard(cardData.id);
        });

        const deleteButton = document.querySelector(`#${cardData.id} .delete-button`);
        deleteButton.addEventListener('click', function() {
            const confirmed = confirm('Are you sure you want to delete this card?');
            if (confirmed) {
                deleteCard(cardData.id);
            }
        });
    } else {
        console.error('Error:', response.status);
    }
}


async function updateCardForm(title, section, description) {
    // console.log('Card ID:', cardId);
    // Get the board ID from the user
    const boardId = prompt("Enter the board ID:");
    const cardId = prompt("Enter the desired card ID:");
    if (!boardId) {
        alert("You must provide a board ID.");
        return;
    }

    // Get the input values from the user for updating the card
    const updatedTitle = prompt("Enter updated card title:", title);
    const updatedSection = prompt("Enter updated section (1: To Do, 2: In Progress, 3: Done):", section);
    const updatedDescription = prompt("Enter updated card description:", description);

    // Validate the input values and convert section to a number
    if (!updatedTitle || isNaN(updatedSection) || !updatedDescription) {
        alert("Invalid input! Please fill all fields correctly.");
        return;
    }

    // Convert section to a number
    const updatedSectionNumber = parseInt(updatedSection);

    // Prepare the data to update the card
    const cardData = {
        title: updatedTitle,
        section: updatedSectionNumber,
        description: updatedDescription
    };

    // Send the PUT request to update the card
    const response = await fetch(`${BASE_URL}/api/boards/${boardId}/cards/${cardId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
    });

   if (response.ok) {
       let data = await response.json();
       getAllCards(boardId); // replaced cardData.boardId with boardId
   } else {
       console.error('Error:', response.status);
   }
}

async function deleteCard(cardId, boardId) {
    const deleteConfirm = confirm("Are you sure you want to delete this card?");
    const deleteCardId = prompt("Please enter the ID of the card you wish to delete for confirmation");
    console.log(`Expected Card ID: ${cardId}`);
    console.log(`Entered Card ID: ${deleteCardId}`);

    if (deleteConfirm && deleteCardId == cardId) {
        console.log(`Sending DELETE request to ${BASE_URL}/api/boards/${boardId}/cards/${deleteCardId}`);
        // Send the DELETE request to delete the card
        const response = await fetch(`${BASE_URL}/api/boards/${boardId}/cards/${deleteCardId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Delete request successful. Refreshing cards.');
            let data = await response.json();
            getAllCards(boardId);
        } else {
            console.error('Error:', response.status);
        }
    } else if (deleteCardId != cardId) {
        alert("The card ID you entered does not match the card you selected to delete. Please try again.");
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

    // Store the cardId and boardId in the ev.dataTransfer object for use in the drop_handler function
    ev.dataTransfer.setData('cardId', cardData.id);
    ev.dataTransfer.setData('boardId', cardData.board.id);

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
    // Retrieve the cardId and boardId from the ev.dataTransfer object
    var cardId = ev.dataTransfer.getData("cardId");
    var boardId = ev.dataTransfer.getData("boardId");
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

    todoContainer.innerHTML = '<h3>To Do</h3><div class="cards-container"></div>';
    inProgressContainer.innerHTML = '<h3>In Progress</h3><div class="cards-container"></div>';
    doneContainer.innerHTML = '<h3>Done</h3><div class="cards-container"></div>';

    for(const card of data) {
        const cardElement = document.createElement('div');
        cardElement.id = `card-${card.cardId}`;
        cardElement.setAttribute("data-card", JSON.stringify(card));
        cardElement.draggable = true;
        cardElement.addEventListener("dragstart", dragstart_handler);

    cardElement.innerHTML = `
        <h4 class="card-title">${card.title}</h4>
        <p class="card-description">${card.description}</p>
        <p class="card-id">ID: ${card.id}</p>
        <div class="ag-courses_item_bg"></div>
        <button class="update-button" onclick="updateCardForm('${card.title}', ${card.section}, '${card.description}')">Update</button>
        <button class="delete-button" onclick="deleteCard(${card.id}, ${card.board.id})">Delete</button>
    `;

        cardElement.className = 'ag-courses_item';

        console.log(card);  // Log card data to the console here

  switch (card.section) {
      case 1:
          todoContainer.querySelector('.cards-container').appendChild(cardElement);
          break;
      case 2:
          inProgressContainer.querySelector('.cards-container').appendChild(cardElement);
          break;
      case 3:
          doneContainer.querySelector('.cards-container').appendChild(cardElement);
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
