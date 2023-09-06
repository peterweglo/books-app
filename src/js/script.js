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

  const favoriteBooks = [];
  const filters = [];

  const styleRating = function () {
    for (const book of dataSource.books) {
      book.ratingStyle = {}
      if (book.rating < 6){
        book.ratingBackground =  select.ratingStyles.styleOne;
        
      } else if (book.rating < 8){
        book.ratingBackground  =  select.ratingStyles.styleTwo;
        
      } else if (book.rating < 9){
        book.ratingBackground =  select.ratingStyles.styleThree;
        
      } else {
        book.ratingBackground  =  select.ratingStyles.styleFour;
        
      }
      book.ratingWidth = book.rating / 10 * 100;
    }


  };
  styleRating();

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
          const bookId = event.target.offsetParent.getAttribute('data-id');
          if (favoriteBooks.includes(bookId)) {
            event.target.offsetParent.classList.remove(
              select.classNames.favorite
            );
            const indexOfBook = favoriteBooks.indexOf(bookId);
            favoriteBooks.splice(indexOfBook, 1);
          } else {
            event.target.offsetParent.classList.add(select.classNames.favorite);
            favoriteBooks.push(bookId);
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
          if (event.target.checked) {
            filters.push(event.target.value);
          } else {
            filters.splice(filters.indexOf(event.target.value), 1);
          }
        }

        for (const book of dataSource.books) {
          let flagHidden = false;
          const bookDOM = document.querySelector(`[data-id="${book.id}"]`);

          for (const filter of filters) {
            if (book.details[filter] == false) {
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
    };
    filterBooks();
  };


  initActions();
}
