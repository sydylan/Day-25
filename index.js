////SELECTORS
let homeButton = document.querySelector(".home");

//Book render, wrapper render selectors
let bookArr = bookData;
let bookTilesAll = document.querySelectorAll("ul");
let bookWrapper = document.createElement("div");

//Search feature selectors
let searchButton = document.querySelector(".searchButton");
let searchInput = document.querySelector(".searchInput");

//Favorite feature selectors
let favSection = document.querySelector(".favorites");
let favCount = document.querySelector(".favCount");

//Sort feature selectors
let sort1 = document.querySelector(".sort1");
let sort2 = document.querySelector(".sort2");
let sort3 = document.querySelector(".sort3");
let sort4 = document.querySelector(".sort4");
let sort5 = document.querySelector(".sort5");
let sort6 = document.querySelector(".sort6");
let sortButton = document.querySelector(".sortButton");
let sortMenu = document.getElementById("list-items");

//REFRESH HOME
homeButton.addEventListener("click", () => {
  window.location.reload("Refresh");
});

////BOOK RENDERING ARROW FUNCTION
//append attributes of a book to a tile
let bookRender = (book) => {
  let bookTile = document.createElement("ul");

  ///Make favoriteButton
  let favoriteButton = document.createElement("button");
  favoriteButton.classList.add("favButton");
  favoriteButton.innerHTML = "✔";

  favoriteButton.addEventListener("click", () => {
    //Add book to favorites section
    let favoriteTile = bookRender(book);
    favSection.appendChild(favoriteTile);

    //Count favorites
    let countDom = document.querySelector(".count");
    let countNum = Array.from(favSection.children).reduce(
      (count) => count + 1,
      0
    );
    countDom.innerHTML = `Favorites: ${countNum}`;
  });

  ///Make commentButton
  let commentButton = document.createElement("button");
  commentButton.classList.add("commentButton");
  commentButton.innerHTML = "Comment";
  commentButton.addEventListener("click", () => {
    let commentInput = document.createElement("input");
    commentInput.classList.add("commentInput");

    let commentSend = document.createElement("button");
    commentSend.classList.add("commentSend");
    commentSend.innerHTML = "Send";
    bookTile.append(commentInput, commentSend);

    commentSend.addEventListener("click", () => {
      let comment = commentInput.value;
      if (comment.length <= 280) {
        book.comments = book.comments || [];
        book.comments.push(comment);
        wrapperRender();
      }
    });
  });

  ///Organize the other properties in "order" and append
  let bookTitle = document.createElement("li");
  bookTitle.textContent = book.title;

  let bookAuthor = document.createElement("li");
  bookAuthor.textContent = book.author;

  let bookLang = document.createElement("li");
  bookLang.textContent = book.language;

  let bookSubj = document.createElement("li");
  bookSubj.textContent = book.subject;

  //Comments:
  let bookSeperator = document.createElement("li");
  bookSeperator.classList.add("seperator");
  bookSeperator.textContent = "Comments:";

  //Create a place for comments underneath other properties and append
  let bookCommentList = document.createElement("ol");
  bookCommentList.classList.add("commentList");
  if (book.comments) {
    book.comments.forEach((comment) => {
      let commentItem = document.createElement("li");
      commentItem.textContent = `New: ` + comment;
      bookCommentList.appendChild(commentItem);
    });
  }

  bookTile.append(
    favoriteButton,
    commentButton,
    bookTitle,
    bookAuthor,
    bookLang,
    bookSubj,
    bookSeperator,
    bookCommentList
  );
  return bookTile;
};

////WRAPPER RENDERING ARROW FUNCTION
//append tiles to bookWrapper
const wrapperRender = () => {
  bookWrapper.classList.add("bookWrapper");

  //for each object, return a new equivalent into new array
  let bookTilesArr = bookArr.map((book) => {
    return bookRender(book);
  });

  //iterate through arr and append to bookWrapper, then append to body
  bookWrapper.replaceChildren(...bookTilesArr);
  document.body.appendChild(bookWrapper);

  bookTilesAll = document.querySelectorAll("ul"); //update everytime render tiles: searching or adding new books
  return bookWrapper;
};

////ADD BOOKS
//take input, add to the top of bookArr
let addAuthor = document.querySelector(".bookAuthorInput");
let addLang = document.querySelector(".bookLangInput");
let addSubj = document.querySelector(".bookSubjInput");
let addTitle = document.querySelector(".bookTitleInput");
let addButton = document.querySelector(".addBookButton");

addButton.addEventListener("click", () => {
  let authorArr = [addAuthor.value];
  let subjectArr = [addSubj.value];

  //Make a new book object from inputs
  const newBook = {
    author: authorArr,
    language: addLang.value,
    subject: subjectArr,
    title: addTitle.value,
  };
  bookArr.unshift(newBook); //Add to top of bookArr

  //inspired from wrapperRender: unique render
  let addBooksRendered = bookArr.map((book) => {
    return bookRender(book);
  });
  bookWrapper.replaceChildren(...addBooksRendered);
  document.body.appendChild(bookWrapper);

  //update everytime render tiles
  bookTilesAll = document.querySelectorAll("ul");

  return bookWrapper;
});

////COUNT FAVORITES
//Create a new div, add class 'count', then append to parent
let countDom = document.createElement("div");
countDom.classList.add("count");
favCount.append(countDom);

////SEARCH CODE
searchButton.addEventListener("click", () => {
  let searchString = document.querySelector(".searchInput").value.toLowerCase();
  bookTilesAll.forEach((tile) => {
    if (tile.textContent.toLowerCase().includes(searchString)) {
      tile.style.display = "block";
    } else {
      tile.style.display = "none";
    }
  });
});

////SORT CODE
sortButton.addEventListener("click", () => {
  if (sortMenu.style.display === "none") {
    sortMenu.style.display = "block";
  } else {
    sortMenu.style.display = "none";
  }
});

//Sort by (A-Z) Title
sort1.addEventListener("click", () => {
  bookArr.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  wrapperRender();
});

//Sort by (Z-A) Title
sort2.addEventListener("click", () => {
  bookArr.sort((a, b) => {
    if (b.title < a.title) {
      return -1;
    }
    if (b.title > a.title) {
      return 1;
    }
    return 0;
  });
  wrapperRender();
});

//Sort by (A-Z) Author
sort3.addEventListener("click", () => {
  bookArr.sort((a, b) => {
    if (a.author < b.author) {
      return -1;
    }
    if (a.author > b.author) {
      return 1;
    }
    return 0;
  });
  wrapperRender();
});

//Sort by (Z-A) Author
sort4.addEventListener("click", () => {
  bookArr.sort((a, b) => {
    if (b.author < a.author) {
      return -1;
    }
    if (b.author > a.author) {
      return 1;
    }
    return 0;
  });
  wrapperRender();
});

//Sort by number of topics (low to high)
sort5.addEventListener("click", () => {
  bookArr.sort((a, b) => {
    if (a.subject.length < b.subject.length) {
      return -1;
    }
    if (a.subject.length > b.subject.length) {
      return 1;
    }
    return 0;
  });
  wrapperRender();
});

//Sort by number of topics (high to low)
sort6.addEventListener("click", () => {
  bookArr.sort((a, b) => {
    if (b.subject.length < a.subject.length) {
      return -1;
    }
    if (b.subject.length > a.subject.length) {
      return 1;
    }
    return 0;
  });
  wrapperRender();
});

////INVOKE FUNCTION ON DATA SET
wrapperRender(bookArr);
