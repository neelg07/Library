// Library App
let myLibrary = ['Harry Potter', 'Apple Tree', 'Sample'];

function Book(title, author, pages, read) {
    // constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(obj) {
    //
    myLibrary.push(obj);
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

// Submit form --> Create new book object with form data
formSubmit = document.querySelector('.submit-form');

formSubmit.addEventListener('submit', (event) => {
    // Save input values to variables
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read; 
    readRadio.checked ? read = true : read = false;
    
    // Create book obj
    let newBook = new Book(title, author, pages, read); 
    addBookToLibrary(newBook);
});