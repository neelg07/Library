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

const bookForm = document.querySelector('.bookform');

const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const readRadio = document.getElementById('read');
const unreadRadio = document.getElementById('unread');

// Add Book button func
addBook.addEventListener('click', () => {
    // Popup form toggle
    bookForm.classList.toggle('inactive');

    // Reset input fields and set focus on title input
    title.value = '';
    author.value = '';
    pages.value = '';
    readRadio.checked = false;
    unreadRadio.checked = false;

    title.focus();
});

// Close form button
const closeForm = document.getElementById('close-btn');

closeForm.addEventListener('click', () => {
    //Close out form
    bookForm.classList.toggle('inactive');
});
