const libraryTable = document.getElementById("library-table");
const tableBody = document.getElementById("table-body");
const newBookButton = document.getElementById("new-book")
const modal = document.getElementById("modal")
const closeModalButton = document.getElementById("close")
const modalButton = document.getElementById("modal-button");
const searchBar = document.getElementById("search-bar");
const dropdownMenu = document.getElementById("dropdown-menu");
const removeButton = document.getElementById("remove-button");

const myLibrary = [
    {
        title: "Build",
        author: "Tony Fadell",
        pages: 400,
        isRead: true,
    },

    {
        title: "El Quijote",
        author: "Miguel de Cervantes",
        pages: 200,
        isRead: false,
    },

    {
        title: "Steve Jobs",
        author: "Walter Isaacson",
        pages: 550,
        isRead: true,
    }
];

function Book(title, author, pages, isRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
}

function removeBook(event) {
    const index = event.target.getAttribute("data-index");
    myLibrary.splice(index, 1);
    tableBody.innerHTML = "";
    dropdownMenu.style.display = "none"
    displayLibrary();
}

function readStatus(readValue) {
    return readValue ? "Yes" : "No";
}

function markRead(readValue) {
    return readValue ? "Mark as unread" : "Mark as read";
}


let activeButton = null;

// Ensure dropdown is hidden initially
dropdownMenu.style.display = "none";

function toggleMenu(event, button) {
    const buttonRect = button.getBoundingClientRect();

    // Toggle menu visibility and position
    if (activeButton === button) {
        dropdownMenu.style.display = "none";
        activeButton = null;
    } else {
        dropdownMenu.style.position = "absolute";
        dropdownMenu.style.left = `${buttonRect.left - 60}px`;
        dropdownMenu.style.top = `${buttonRect.bottom}px`;
        dropdownMenu.style.display = "flex"; // Show dropdown
        activeButton = button;
    }

    event.stopPropagation(); // Prevent click from propagating
}

// Close the dropdown when clicking outside of it
window.addEventListener("click", function(event) {
    if (activeButton && !dropdownMenu.contains(event.target) && !activeButton.contains(event.target)) {
        dropdownMenu.style.display = "none"; // Hide dropdown
        activeButton = null; // Reset active button
    }
});


// Close the dropdown when clicking outside of it
window.addEventListener("click", function(event) {
    const dropdownMenu = document.getElementById("dropdown-menu");

    // Check if the click is outside of the dropdown and the active button
    if (activeButton && !dropdownMenu.contains(event.target) && !activeButton.contains(event.target)) {
        dropdownMenu.style.display = "none";
        activeButton = null;
    }
});

// Add event listeners for menu buttons in the displayLibrary function
function displayLibrary() {
    tableBody.innerHTML = ""; // Clear table before appending

    myLibrary.forEach((book, index) => {
        const row = document.createElement('tr');

        for (const key in book) {
            const cell = document.createElement('td');
            cell.textContent = key === "isRead" ? readStatus(book[key]) : book[key];
            row.appendChild(cell);
        }

        const menuButton = document.createElement("img");
        menuButton.setAttribute("class", "icon");
        menuButton.setAttribute("src", "images/menu.svg");
        const menuCell = document.createElement("td");
        menuCell.setAttribute("class", "icon-cell");
        menuCell.appendChild(menuButton);
        row.appendChild(menuCell);

        tableBody.appendChild(row);

        // Reattach event listener to the menu button after adding it to DOM
        menuButton.addEventListener('click', (event) => toggleMenu(event, menuButton));
    });
}

// Call displayLibrary to initialize the table
displayLibrary();



function newBook() {
    modal.style.display = "flex";
    modal.style.flexDirection = "column";
}

function filter() {
    const searchTerm = searchBar.value.toLowerCase();
    const rows = tableBody.getElementsByTagName('tr');

    Array.from(rows).forEach(row => {
        const title = row.cells[0].textContent.toLowerCase();
        const author = row.cells[1].textContent.toLowerCase();
        row.style.display = title.includes(searchTerm) || author.includes(searchTerm) ? '' : 'none';
    });
};

searchBar.addEventListener('input', filter);


function closeModal() {
    modal.style.display = "none"
    modal.style.removeProperty('flex-direction');
    newBookButton.blur();
}

function addBook(event) {
    const titleValue = document.getElementById("title").value
    const authorValue = document.getElementById("author").value
    const pagesValue = document.getElementById("pages").value
    const readValue = document.getElementById("is-read").checked

    const newRow = new Book(titleValue, authorValue, pagesValue, readValue);

    myLibrary.push(newRow);

    const index = myLibrary.length - 1;

    const addRow = document.createElement("tr")

    for (const key in newRow) {
        const rowBook = document.createElement("td");

        if (key === "isRead") {
            rowBook.textContent = readStatus(newRow[key]);
        } else {
            rowBook.textContent = newRow[key];    
        }

        addRow.appendChild(rowBook);

    }

    tableBody.appendChild(addRow);

    modal.style.display = "none";

    event.preventDefault();

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("is-read").checked = false;

}

removeButton.addEventListener("click", removeBook)

newBookButton.addEventListener("click", newBook)
closeModalButton.addEventListener("click", closeModal)
modalButton.addEventListener("click", addBook)
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        modal.style.removeProperty('flex-direction');
    }
});

window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});