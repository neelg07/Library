// Library App
let myLibrary = ['Harry Potter', 'Apple Tree', 'Sample'];

function Book(title, author, pages, read) {
    // constructor
}

function addBookToLibrary() {
    //
}

function displayLibrary() {
    // Iterate array of books
    for (let book of myLibrary) {
        console.log(book);
    }
}

displayLibrary();

// Add book button
const addBook = document.querySelector('.add-icon');

addBook.addEventListener('click', () => {
    // Popup form
});
