const libraryTable = document.getElementById("library-table");
const tableBody = document.getElementById("table-body");
const newBookButton = document.getElementById("new-book")
const modal = document.getElementById("modal")
const closeModalButton = document.getElementById("close")
const modalButton = document.getElementById("modal-button")

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
    myLibrary.splice(index, 1); // Remove the book from the array
    tableBody.innerHTML = ""; // Clear the table body
    displayLibrary(); // Re-render the table
}

function readStatus(readValue) {
    return readValue ? "Yes" : "No";
}

// Gets each object and its properties, and displays it on the table
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

//Runs the function every time we reload the page
displayLibrary();

function newBook() {
    modal.style.display = "flex";
    modal.style.flexDirection = "column";
}

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
    document.getElementById("read").checked = false;

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
