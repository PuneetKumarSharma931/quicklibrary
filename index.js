
function Book(name, author, type) {

    this.name = name;
    this.author = author;
    this.type = type;
}

function Display() {

}

let display = new Display();

Display.prototype.add = function (book) {

    let tableBody = document.getElementById('tableBody');

    let count = 0;

    let table = document.getElementsByClassName('table');

    Array.from(table).forEach(function (element) {

        count++;
    });

    let tablehtml = `<tr class="table">
    <th scope="row">${count}</th>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
    <td><button class="btn btn-sm btn-danger" onclick="Delete(${count - 1})">Remove Book</button></td>
</tr>`;

    tableBody.innerHTML += tablehtml;
}

Display.prototype.clear = function () {

    let bookForm = document.getElementById('bookForm');
    bookForm.reset();
}

Display.prototype.validate = function (book) {

    if (book.name.length < 2 || book.author.length < 2) {

        return false;
    }
    else {
        return true;
    }
}

Display.prototype.show = function (type) {

    let msg = document.getElementById('message');
    let html = '';

    if (type == 'success') {
        html = `<div class="alert alert-success d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
        <div>
          Success! You have added the book into the list.
        </div>
      </div>`;
    }
    else if (type == 'error') {
        html = `<div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        <div>
         Error! You cannot add this book into the list.
        </div>
      </div>`;
    }
    else {
        html = `<div class="alert alert-success d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
        <div>
          Success! Book removed from the list!
        </div>
      </div>`;
    }

    msg.innerHTML = html;

    setTimeout(function () {
        msg.innerHTML = '';
    }, 3000);
}

Display.prototype.showOnLoad = function () {


    let books = localStorage.getItem('books');
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";

    if (books == null) {
        booksObj = [];
    }
    else {

        booksObj = JSON.parse(books);
    }

    if (booksObj.length != 0) {

        booksObj.forEach(function (element) {

            display.add(element);
        });
    }
}

display.showOnLoad();

let bookForm = document.getElementById('bookForm');

bookForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {

    e.preventDefault();

    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;

    let fiction = document.getElementById('Fiction');
    let programming = document.getElementById('Computer_Programming');
    let cooking = document.getElementById('Cooking');

    let type;

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else {
        type = cooking.value;
    }

    let book = new Book(name, author, type);

    if (display.validate(book)) {

        let books = localStorage.getItem('books');

        if (books == null) {

            booksObj = [];
        }
        else {
            booksObj = JSON.parse(books);
        }

        booksObj.push(book);

        localStorage.setItem('books', JSON.stringify(booksObj));

        display.add(book);
        display.clear();
        display.show('success');
    }
    else {
        display.show('error');
    }
}

function Delete(index) {

    let books = localStorage.getItem('books');

    if (books == null) {

        booksObj = [];
    }
    else {

        booksObj = JSON.parse(books);
    }

    if (booksObj.length != 0) {

        booksObj.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(booksObj));
        display.showOnLoad();
    }

    display.show('deletion');

}



//let search = document.getElementById('searchTxt');

/*search.addEventListener("input", function(){

    let searchText = document.getElementById('searchTxt').value;

    let tables = document.getElementsByClassName('table');

    Array.from(tables).forEach(function(element) {

        if(element.getElementsByTagName('td')[0].innerText.includes(searchText) || element.getElementsByTagName('td')[1].innerText.includes(searchText)) {
            element.style.opacity = '1';
            element.style.width = '100%';
            element.style.height = '100%';
        }
        else {
            element.style.opacity = '0';
            element.style.width = '0';
            element.style.height = '0';
        }
    });
});*/