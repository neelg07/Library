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

const bookCards = document.querySelectorAll('.card');

// Blur function for book cards
function backgroundBlur() {
    bookCards.forEach((card) => {
        card.classList.toggle('blur');
    });
}

// Add Book button func
addBook.addEventListener('click', () => {
    // Popup form toggle
    bookForm.classList.toggle('inactive');
    // Blur background
    backgroundBlur();

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
    //Toggle blur
    backgroundBlur();
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

// Card Grid
const cardGrid = document.querySelector('.card-grid');

// Create book card function (DOM Manipulation)
function addCardToGrid(book) {
    cardGrid.appendChild(makeCardDiv(book));
}

// Make card
function makeCardDiv(book) {
    // Create parent node card div
    let card = document.createElement('div');
    card.classList.toggle('card');
    // Add children nodes by calling funcs
    addTitleCard(book, card);
    addAuthorCard(book, card);
    addPagesCard(book, card);
    // Add div "slider-text" child node
    let sliderText = document.createElement('div');
    sliderText.classList.toggle('slider-text');
    card.appendChild(sliderText);
    // Add read/unread switch
    addReadSwitch(book, card);

    return card;
}

// Make title card div
function addTitleCard(book, card) {
    // Make title div
    let titleCard = document.createElement('div');
    titleCard.classList.toggle('title-card');
    // Make h1
    let titleHeader = document.createElement('h1');
    titleHeader.textContent = book.title;
    // Append h1 to div
    titleCard.appendChild(titleHeader);
    // Append div to card
    card.appendChild(titleCard);
}

// Make author card div
function addAuthorCard(book, card) {
    // Author div
    let authorCard = document.createElement('div');
    authorCard.classList.toggle('author-card');
    // Make h3
    let authorHeader = document.createElement('h3');
    authorHeader.textContent = 'Author:';
    // Make p tag
    let authorPara = document.createElement('p');
    authorPara.textContent = book.author;
    // Add child nodes to parent
    authorCard.appendChild(authorHeader);
    authorCard.appendChild(authorPara);
    // Add author card to main card
    card.appendChild(authorCard);
}

// Make pages card div
function addPagesCard(book, card) {
    // Page div
    let pageCard = document.createElement('div');
    pageCard.classList.toggle('pages-card');
    // Make h3
    let pageHeader = document.createElement('h3');
    pageHeader.textContent = 'Pages:';
    // Make p tag
    let pagePara = document.createElement('p');
    pagePara.textContent = book.pages;
    // Add child nodes to parent
    pageCard.appendChild(pageHeader);
    pageCard.appendChild(pagePara);
    // Add page div to main card
    card.appendChild(pageCard);
}

// Func to add Read/Unread switch to card
function addReadSwitch(book, card) {
    // Label
    let switchLabel = document.createElement('label');
    switchLabel.classList.toggle('switch');
    // Create and append input/span into label
    let switchCheck = document.createElement('input');
    switchCheck.classList.toggle('read-check');
    switchCheck.type = 'checkbox';

    let switchSpan = document.createElement('span');
    switchSpan.classList.toggle('slider');
    switchSpan.classList.toggle('round');
    // Toggle checked or leave unchecked if read
    book.read === true
        ? (switchCheck.checked = true)
        : (switchCheck.checked = false);
    // Append input/span to label
    switchLabel.appendChild(switchCheck);
    switchLabel.appendChild(switchSpan);
    // Append entire node into card
    card.appendChild(switchLabel);
}

//Toggle card change with on/off read
