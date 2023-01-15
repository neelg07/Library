// Library App
let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(obj) {
    //
    myLibrary.push(obj);
}

// Test function to show library in console
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

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readRadio = document.getElementById('read');
const unreadRadio = document.getElementById('unread');

// Add Book button func
addBook.addEventListener('click', () => {
    // Popup form toggle
    bookForm.classList.toggle('inactive');

    // Reset input fields and set focus on title input
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readRadio.checked = false;
    unreadRadio.checked = false;

    titleInput.focus();
});

// Close form button
const closeForm = document.getElementById('close-btn');

closeForm.addEventListener('click', () => {
    //Close out form
    bookForm.classList.toggle('inactive');
});

// Submit form listener
document.addEventListener('DOMContentLoaded', () => {
    document
        .getElementById('book-submit-form')
        .addEventListener('submit', handleForm);
});

// function called on form submit
function handleForm(ev) {
    // stops page reload
    ev.preventDefault();
    let myForm = ev.target;
    let dataObject = new FormData(myForm);

    // Extract data from FormData obj
    let title = dataObject.get('title');
    let author = dataObject.get('author');
    let pages = parseInt(dataObject.get('pages'));

    //Convert string value into boolean
    let read = dataObject.get('read') === 'true';

    // Create book obj and add to myLibrary
    let book = new Book(title, author, pages, read);
    addBookToLibrary(book);

    // Close form
    closeForm.click();
}
