/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

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
    ratingStyles: {
      styleOne: 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)',
      styleTwo: 'linear-gradient(to bottom,  #b4df5b 0%,#b4df5b 100%)',
      styleThree: 'linear-gradient(to bottom,  #299a0b 0%, #299a0b 100%)',
      styleFour: 'linear-gradient(to bottom,  #ff0084 0%,#ff0084 100%)',
    },
  };

  class BooksList {
    constructor() {
      const thisBooks = this;
      thisBooks.initData();
      thisBooks.styleRating();
      thisBooks.generateBooks();
      thisBooks.getElements();
      thisBooks.initActions();
    }

    initData() {
      const thisBooks = this;
      thisBooks.data = dataSource;
      thisBooks.favoriteBooks = [];
      thisBooks.filters = [];
    }

    styleRating() {
      const thisBooks = this;
      for (const book of thisBooks.data.books) {
        book.ratingStyle = {};
        if (book.rating < 6) {
          book.ratingBackground = select.ratingStyles.styleOne;
        } else if (book.rating < 8) {
          book.ratingBackground = select.ratingStyles.styleTwo;
        } else if (book.rating < 9) {
          book.ratingBackground = select.ratingStyles.styleThree;
        } else {
          book.ratingBackground = select.ratingStyles.styleFour;
        }
        book.ratingWidth = (book.rating / 10) * 100;
      }
    }

    generateBooks() {
      const thisBooks = this;
      for (const book of dataSource.books) {
        const generatedHTML = select.bookTemplate(book);
        thisBooks.element = utils.createDOMFromHTML(generatedHTML);
        const bookWrapper = document.querySelector(
          select.wrappers.bookListWrapper
        );
        bookWrapper.appendChild(thisBooks.element);
      }
    }

    getElements() {
      const thisBooks = this;
      thisBooks.dom = {};
      thisBooks.dom.bookListContainer = document.querySelector(
        select.wrappers.bookListWrapper
      );
      thisBooks.dom.filtersWrapper = document.querySelector(
        select.wrappers.filters
      );
    }

    initActions() {
      const thisBooks = this;
      thisBooks.dom.bookListContainer.addEventListener(
        'dblclick',
        function (event) {
          event.preventDefault();
          if (
            event.target.offsetParent.classList.contains(
              select.classNames.bookImage
            )
          ) {
            const bookId = event.target.offsetParent.getAttribute('data-id');
            if (thisBooks.favoriteBooks.includes(bookId)) {
              event.target.offsetParent.classList.remove(
                select.classNames.favorite
              );
              const indexOfBook = thisBooks.favoriteBooks.indexOf(bookId);
              thisBooks.favoriteBooks.splice(indexOfBook, 1);
            } else {
              event.target.offsetParent.classList.add(
                select.classNames.favorite
              );
              thisBooks.favoriteBooks.push(bookId);
            }
          }
        }
      );
      this.filterBooks();
    }

    filterBooks() {
      const thisBooks = this;
      thisBooks.dom.filtersWrapper.addEventListener('click', function (event) {
        if (
          event.target.tagName === 'INPUT' &&
          event.target.getAttribute('name') === 'filter' &&
          event.target.getAttribute('type') === 'checkbox'
        ) {
          if (event.target.checked) {
            thisBooks.filters.push(event.target.value);
          } else {
            thisBooks.filters.splice(
              thisBooks.filters.indexOf(event.target.value),
              1
            );
          }
        }

        for (const book of thisBooks.data.books) {
          let flagHidden = false;
          const bookDOM = document.querySelector(`[data-id="${book.id}"]`);

          for (const filter of thisBooks.filters) {
            if (book.details[filter] === false) {
              flagHidden = true;
              break;
            }
          }
          if (flagHidden) {
            bookDOM.classList.add('hidden');
          } else {
            bookDOM.classList.remove('hidden');
          }
        }
      });
    }
  }
  const app = new BooksList(); // eslint-disable-line no-unused-vars
}
