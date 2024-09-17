const libraryTable = document.getElementById("library-table");
const tableBody = document.getElementById("table-body");
const newBookButton = document.getElementById("new-book")
const modal = document.getElementById("modal")
const closeModalButton = document.getElementById("close")
const modalButton = document.getElementById("modal-button");
const searchBar = document.getElementById("search-bar");

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
    displayLibrary();
}

function readStatus(readValue) {
    return readValue ? "Yes" : "No";
}

function markRead(readValue) {
    return readValue ? "Mark as unread" : "Mark as read";
}


function displayLibrary() {
    myLibrary.forEach((book, index) => {
        const row = document.createElement('tr')

        for (const key in book) {
            const cell = document.createElement('td');

            if (key === "isRead") {
                cell.textContent = readStatus(book[key]);
            } else {
                cell.textContent = book[key];
            }

            row.appendChild(cell);
        }

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.setAttribute("data-index", index);
        removeButton.addEventListener("click", removeBook);
        const removeCell = document.createElement("td");
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        tableBody.appendChild(row);
    })
};

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

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.setAttribute("data-index", index);
    removeButton.addEventListener("click", removeBook);
    const removeCell = document.createElement("td");
    removeCell.appendChild(removeButton);
    addRow.appendChild(removeCell);

    tableBody.appendChild(addRow);

    modal.style.display = "none";

    event.preventDefault();

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("is-read").checked = false;

}

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