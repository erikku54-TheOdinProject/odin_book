
//--------set button function----------

const btnShow = document.querySelector('button#showDialog');
const btnAdd = document.querySelector('button#addBook');
const btnCancel = document.querySelector('button#cancel');

btnShow.addEventListener('click', showDialog);
btnAdd.addEventListener('click', addNewBook);
btnCancel.addEventListener('click', closeDialog);


function showDialog() {

    const dialog = document.querySelector('dialog#newBookInfo');
    dialog.showModal();

}

function closeDialog() {

    const dialog = document.querySelector('dialog#newBookInfo');
    dialog.close();
}


function addNewBook() {

    const title = document.querySelector('input[name="title"]').value;
    const author = document.querySelector('input[name="author"]').value;
    const pages = document.querySelector('input[name="pages"]').value;

    // typeof element.value will be string
    const read = document.querySelector('select[name="read"]').value === 'true' ? true : false;


    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    // console.log(typeof document.querySelector('select[name="read"]').value);
    // console.log(typeof read);
    // console.log(typeof newBook.read);
    // console.log(newBook.info());

    const dialog = document.querySelector('dialog#newBookInfo');
    dialog.close();

    // console.log(read);

}


//---------set Book class & Library--------

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read === undefined ? false : read;
}

Book.prototype.info = function () {

    let s = '';

    if (this.read == true) {
        s = 'have already read';
    } else {
        s = 'not read yet';
    }

    return `${this.title} by ${this.author}, ${this.pages} pages, ${s}`;
}

Book.prototype.changeReadState = function () {
    this.read = !this.read;

}


let myLibrary = [];

function addBookToLibrary(book) {
    let l=myLibrary.push(book);
    addCard(book,l-1);  //should pass index
}


function addCard(book,index) {

    const bookshelf = document.querySelector('div.bookshelf');

    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index.toString());      //record the index

    const ptitle = document.createElement('p');
    ptitle.innerText = book.title;
    ptitle.classList.add('title');
    const pauthor = document.createElement('p');
    pauthor.innerText = book.author;
    const ppages = document.createElement('p');
    ppages.innerText = book.pages;
    const pread = document.createElement('p');
    pread.innerText = book.read ? 'have read' : 'not read yet';
    // pread.style.cssText='color:green; background-color: lightgray;'

    const achange = document.createElement('a');
    achange.setAttribute('href', '#');
    achange.innerText = 'change';


    card.appendChild(ptitle);
    card.appendChild(pauthor);
    card.appendChild(ppages);
    card.appendChild(pread);
    card.appendChild(achange);


    // Add change state action

    achange.addEventListener('click', (e) => {

        book.changeReadState();
        pread.innerText = book.read ? 'have read' : 'not read yet';
    })

    // Add delete button
    const btnDelete = document.createElement('button');
    btnDelete.innerText = 'X';
    btnDelete.classList.add('btnDel');

    btnDelete.addEventListener('click', (e) => {

        const cards = document.querySelectorAll('div.card');
        const targetcard = e.target.parentElement;


        //search the matchedIndex, in order to delete the item from library
        // let matchedIndex = -1;

        // for (let i = 0; i < cards.length; i++) {
        //     if (cards[i] === targetcard) {
        //         matchedIndex = i;
        //         break;
        //     }
        // }
        let matchedIndex=parseInt(targetcard.getAttribute('data-index'));

        //remove the book
        bookshelf.removeChild(card);
        myLibrary.splice(matchedIndex, 1);

    });

    card.appendChild(btnDelete);

    bookshelf.appendChild(card);
}


//---------Initialize--------

const book1 = new Book('The Adventures of Huckleberry Finn', 'Mark Twain', 673);
const book2 = new Book('In Search of Lost Time', 'Marcel Proust', 439);
const book3 = new Book('On the Origin of Species', 'Charles Darwin', 536);
const book4 = new Book('The Divine Comedy', 'Dante Alighieri', 622);
const book5 = new Book('The Republic', 'Plato', 589);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);

// for(let bookID in myLibrary)
// {
//     console.log(myLibrary[bookID].info());

//     addCard(myLibrary[bookID]);

// }

// const bb=document.createElement('button');
// bb.innerText='Test Button';
// bb.style.borderRadius='6px';

// const shelf=document.querySelector('div.bookshelf');
// shelf.appendChild(bb);