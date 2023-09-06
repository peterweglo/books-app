{
  ('use strict');
  const select = {
    bookTemplate: Handlebars.compile(
      document.querySelector('#template-book').innerHTML
    ),
    wrappers: {
      bookListWrapper: '.books-list',
      book: '.book',
      filters: '.filters',
    },
    classNames: {
      bookImage: 'book__image',
      favorite: 'favorite',
    },
  };
  const favoriteBooks = [];
  const filters = [];

  const generateBooks = function () {
    for (const book of dataSource.books) {
      const generatedHTML = select.bookTemplate(book);
      const bookElement = utils.createDOMFromHTML(generatedHTML);
      const bookWrapper = document.querySelector(
        select.wrappers.bookListWrapper
      );
      bookWrapper.appendChild(bookElement);
    }
  };

  generateBooks();

  const initActions = function () {
    document
      .querySelector(select.wrappers.bookListWrapper)
      .addEventListener('dblclick', function (event) {
        event.preventDefault();
        if (
          event.target.offsetParent.classList.contains(
            select.classNames.bookImage
          )
        ) {
          console.log(event.target.offsetParent);
          const bookId = event.target.offsetParent.getAttribute('data-id');
          if (favoriteBooks.includes(bookId)) {
            event.target.offsetParent.classList.remove(
              select.classNames.favorite
            );
            const indexOfBook = favoriteBooks.indexOf(bookId);
            favoriteBooks.splice(indexOfBook, 1);
            console.log('favoriteBooks', favoriteBooks);
          } else {
            event.target.offsetParent.classList.add(select.classNames.favorite);
            console.log(bookId);
            favoriteBooks.push(bookId);
            console.log('favoriteBooks', favoriteBooks);
          }
        }
      });

    const filterBooks = function () {
      const filtersWrapper = document.querySelector(select.wrappers.filters);
      filtersWrapper.addEventListener('click', function (event) {
        if (
          event.target.tagName === 'INPUT' &&
          event.target.getAttribute('name') === 'filter' &&
          event.target.getAttribute('type') === 'checkbox'
        ) {
          console.log(event.target.value);
          if (event.target.checked) {
            filters.push(event.target.value);
          } else {
            filters.splice(filters.indexOf(event.target.value), 1);
          }
        }
        console.log(filters);
        // const books = document.querySelectorAll('book__image');
        for (const book of dataSource.books) {
          if (filters.includes('adults') && book.details.adults == false) {
            const filtredBookId = book.id;
            document
              .querySelector(`[data-id="${filtredBookId}"]`)
              .classList.add('hidden');
          } else if (
            filters.includes('nonFiction') &&
            book.details.nonFiction == false
          ) {
            const filtredBookId = book.id;
            document
              .querySelector(`[data-id="${filtredBookId}"]`)
              .classList.add('hidden');
          } else if (
            filters.includes('adults') == false &&
            book.details.adults == false
          ) {
            const filtredBookId = book.id;
            document
              .querySelector(`[data-id="${filtredBookId}"]`)
              .classList.remove('hidden');
          } else if (
            filters.includes('nonFiction') == false &&
            book.details.nonFiction == false
          ) {
            const filtredBookId = book.id;
            document
              .querySelector(`[data-id="${filtredBookId}"]`)
              .classList.remove('hidden');
          }
        }
      });
    };
    filterBooks();
  };

  initActions();
}
