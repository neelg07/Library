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

// Show books in library array as cards on page
function displayLibrary() {
    // Delete all old shown cards to avoid book repeats
    deleteLibrary();
    // Iterate array of book objects added
    for (let book of myLibrary) {
        addCardToGrid(book);
    }
    // Add event listeners to all read checkboxes (onclick func override)
    addEventListeners();
}

// Delete/Clear the Library Func
function deleteLibrary() {
    while (cardGrid.firstChild) {
        cardGrid.removeChild(cardGrid.lastChild);
    }
}

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

// Submit form event listener
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

    // Close form and call displayLib func
    closeForm.click();
    displayLibrary();
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

    // Add div "checkmark" child node; optional 'slider-text' class
    let sliderText = document.createElement('div');
    sliderText.classList.toggle('checkmark');
    if (book.read) {
        sliderText.classList.toggle('slider-text');
        card.classList.toggle('read');
    }
    card.appendChild(sliderText);
    // Add edit btn
    addEditBtn(card);
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

function addEditBtn(card) {
    // create button
    let edit = document.createElement('button');
    edit.classList.add('button-17');
    edit.setAttribute('role', 'button');
    edit.textContent = 'Edit';
    // Append as child
    card.appendChild(edit);
}

//Toggle card change with on/off read
const bookCards = cardGrid.childNodes;
const readCheckbox = document.getElementsByClassName('read-check');
const checkmark = document.getElementsByClassName('checkmark');

// Override click event listener for read checkbox
function addEventListeners() {
    // Iterate all checkboxes in each card in the library
    for (let i = 0; i < readCheckbox.length; i++) {
        readCheckbox[i].onclick = () => {
            // Toggle css classes
            checkmark[i].classList.toggle('slider-text');
            bookCards[i].classList.toggle('read');
            // Update this.read book in myLibrary
            myLibrary[i].read
                ? (myLibrary[i].read = false)
                : (myLibrary[i].read = true);
            // Update log
            updateLog(myLibrary);
        };
    }
    updateLog(myLibrary);
}

// Blur function for book cards
function backgroundBlur() {
    bookCards.forEach((card) => {
        card.classList.toggle('blur');
    });
}

// Update log
const librarySize = document.querySelector('.log h2');
const readBooks = document.getElementById('read-books');
const unreadBooks = document.getElementById('unread-books');

function updateLog(library) {
    librarySize.textContent = `Library Size: ${library.length}`;
    let numRead = 0;
    for (let book of library) {
        if (book.read) {
            numRead++;
        }
    }
    readBooks.textContent = `# of Read Books: ${numRead}`;
    unreadBooks.textContent = `# of Unread Books: ${library.length - numRead}`;
}
