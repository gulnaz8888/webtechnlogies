document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reviewForm");
  const errorMsg = document.getElementById("errorMsg");
  const successMsg = document.getElementById("successMsg");

  let reviewsContainer = document.getElementById("reviewsContainer");
  if (!reviewsContainer) {
    reviewsContainer = document.createElement("div");
    reviewsContainer.id = "reviewsContainer";
    reviewsContainer.classList.add("mt-4");
    form.parentNode.appendChild(reviewsContainer);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();


    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const bookTitle = document.getElementById("bookTitle").value.trim();
    const review = document.getElementById("review").value.trim();
    const rating = document.getElementById("rating").value;

    errorMsg.textContent = "";
    successMsg.textContent = "";


    if (!name || !email || !bookTitle || !review || !rating) {
      errorMsg.textContent = "Please fill in all fields before submitting.";
      return;
    }


    if (!email.includes("@") || !email.includes(".")) {
      errorMsg.textContent = "Please enter a valid email address.";
      return;
    }


    if (review.length < 10) {
      errorMsg.textContent = "Your review must be at least 10 characters long.";
      return;
    }


    const reviewCard = document.createElement("div");
    reviewCard.classList.add("card", "p-3", "mb-3", "shadow-sm");

    reviewCard.innerHTML = `
      <h5 class="mb-1">${bookTitle}</h5>
      <p class="mb-1"><strong>${name}</strong> — ${rating}★</p>
      <p class="mb-0">${review}</p>
    `;


    reviewsContainer.prepend(reviewCard);


    successMsg.textContent = "Thank you! Your review has been submitted successfully.";


    form.reset();


    setTimeout(() => {
      successMsg.textContent = "";
    }, 4000);
  });
});


    const sortRatingAsc = document.getElementById("sortRatingAsc");
    const sortRatingDesc = document.getElementById("sortRatingDesc");
    const sortProgressAsc = document.getElementById("sortProgressAsc");
    const sortProgressDesc = document.getElementById("sortProgressDesc");
    const sortedBooksList = document.getElementById("sortedBooksList");
    const originalBooksList = document.getElementById("originalBooksList");
    const bookSortError = document.getElementById("bookSortError");

 
    const booksData = [
        { name: "The Hobbit", rating: 4.9, progress: 95, author: "J.R.R. Tolkien", genre: "Fantasy" },
        { name: "Sherlock Holmes", rating: 4.8, progress: 92, author: "Arthur Conan Doyle", genre: "Mystery" },
        { name: "Harry Potter", rating: 4.8, progress: 98, author: "J.K. Rowling", genre: "Fantasy" },
        { name: "The Book Thief", rating: 4.7, progress: 78, author: "Markus Zusak", genre: "Historical" },
        { name: "Little Women", rating: 4.6, progress: 88, author: "Louisa May Alcott", genre: "Fiction" },
        { name: "The Little Women", rating: 4.5, progress: 85, author: "Louisa May Alcott", genre: "Fiction" },
        { name: "IT", rating: 4.4, progress: 55, author: "Stephen King", genre: "Horror" },
        { name: "Notebook", rating: 4.3, progress: 65, author: "Nicholas Sparks", genre: "Romance" },
        { name: "The Martian", rating: 4.3, progress: 70, author: "Andy Weir", genre: "Sci-Fi" },
        { name: "The Silent Forest", rating: 4.2, progress: 45, author: "Jane Doe", genre: "Mystery" },
        { name: "Dreamcatcher", rating: 4.1, progress: 35, author: "Stephen King", genre: "Horror" },
        { name: "Three Comrades", rating: 4.0, progress: 40, author: "Erich Maria Remarque", genre: "Fiction" }
    ];

    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
    }

    function getProgressColor(progress) {
        if (progress >= 90) return '#28a745';
        if (progress >= 70) return '#20c997';
        if (progress >= 50) return '#ffc107';
        if (progress >= 30) return '#fd7e14';
        return '#dc3545';
    }

    function getProgressText(progress) {
        if (progress >= 90) return 'Completed';
        if (progress >= 70) return 'Almost done';
        if (progress >= 50) return 'In progress';
        if (progress >= 30) return 'Started';
        return 'Just began';
    }

   
    function displayOriginalBooks() {
        if (!originalBooksList) return;
        
        originalBooksList.innerHTML = "";
        
        booksData.forEach((book, index) => {
            const bookCol = document.createElement("div");
            bookCol.className = "col-lg-3 col-md-4 col-6";
            bookCol.innerHTML = `
                <div class="book-mini-card text-center p-3 rounded">
                    <div class="book-emoji mb-2 fs-4">📚</div>
                    <h6 class="book-title-small mb-1">${book.name}</h6>
                    <small class="text-muted d-block mb-1">${book.author}</small>
                    <div class="rating-small text-warning mb-1">
                        ${generateStars(book.rating)}
                    </div>
                    <div class="progress" style="height: 6px;">
                        <div class="progress-bar" 
                             style="width: ${book.progress}%; background-color: ${getProgressColor(book.progress)}">
                        </div>
                    </div>
                    <small class="text-muted">${book.progress}%</small>
                </div>
            `;
            originalBooksList.appendChild(bookCol);
        });
    }


    function displaySortedBooks(books, sortBy, order) {
        if (!sortedBooksList) return;
        
        sortedBooksList.innerHTML = "";
        
        books.forEach((book, index) => {
            const bookItem = document.createElement("div");
            bookItem.className = "list-group-item d-flex justify-content-between align-items-center book-item";
            bookItem.innerHTML = `
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <strong class="book-title">${book.name}</strong>
                            <br>
                            <small class="text-muted author">by ${book.author}</small>
                            <span class="badge bg-secondary ms-2">${book.genre}</span>
                        </div>
                        <span class="badge bg-primary rounded-pill rank-badge">#${index + 1}</span>
                    </div>
                    
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <small class="text-muted">
                                <strong>Rating:</strong> 
                                <span class="rating-stars">${generateStars(book.rating)}</span> 
                                (${book.rating})
                            </small>
                        </div>
                        <div class="col-md-6">
                            <small class="text-muted">
                                <strong>Progress:</strong> ${book.progress}% - <em>${getProgressText(book.progress)}</em>
                            </small>
                        </div>
                    </div>
                    
                    <div class="progress mt-2" style="height: 8px;">
                        <div class="progress-bar" 
                             style="width: ${book.progress}%; background-color: ${getProgressColor(book.progress)}">
                        </div>
                    </div>
                </div>
            `;
            sortedBooksList.appendChild(bookItem);
        });

    
        if (bookSortError) {
            const sortText = sortBy === 'rating' ? 'Rating' : 'Reading Progress';
            const orderText = order === 'asc' ? 'Lowest first' : 'Highest first';
            bookSortError.textContent = `✅ Sorted by ${sortText} (${orderText})`;
            bookSortError.className = "text-success mt-3 text-center";
            setTimeout(() => {
                bookSortError.textContent = "";
            }, 3000);
        }
    }

    function sortBooks(sortBy, order) {
        const sorted = [...booksData];
        
        if (sortBy === 'rating') {
            sorted.sort((a, b) => order === 'asc' ? a.rating - b.rating : b.rating - a.rating);
        } else if (sortBy === 'progress') {
            sorted.sort((a, b) => order === 'asc' ? a.progress - b.progress : b.progress - a.progress);
        }

        displaySortedBooks(sorted, sortBy, order);
    }


    if (originalBooksList && sortedBooksList) {
        displayOriginalBooks();
        sortBooks('rating', 'desc'); 
    }

    
    if (sortRatingAsc) {
        sortRatingAsc.addEventListener("click", () => sortBooks('rating', 'asc'));
    }
    if (sortRatingDesc) {
        sortRatingDesc.addEventListener("click", () => sortBooks('rating', 'desc'));
    }
    if (sortProgressAsc) {
        sortProgressAsc.addEventListener("click", () => sortBooks('progress', 'asc'));
    }
    if (sortProgressDesc) {
        sortProgressDesc.addEventListener("click", () => sortBooks('progress', 'desc'));
    }
;


function updateDateTime() {
  const now = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: false 
  };
  const formatted = now.toLocaleString('en-US', options);
  document.getElementById("dateTime").textContent = formatted;
}

setInterval(updateDateTime, 1000);
updateDateTime();


document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const taskError = document.getElementById("taskError");

  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      taskError.textContent = "Please enter a task!";
      return;
    }

    taskError.textContent = "";

    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    li.innerHTML = `
      <span class="task-text">${taskText}</span>
      <div>
        <button class="btn btn-success btn-sm me-2 complete-btn">✔</button>
        <button class="btn btn-danger btn-sm delete-btn">✖</button>
      </div>
    `;


    li.querySelector(".complete-btn").addEventListener("click", () => {
      li.querySelector(".task-text").classList.toggle("text-decoration-line-through");
      li.querySelector(".task-text").classList.toggle("text-muted");
    });


    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
    });

    taskList.appendChild(li);
    taskInput.value = "";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  const guessInput = document.getElementById("guessInput");
  const guessBtn = document.getElementById("guessBtn");
  const feedback = document.getElementById("guessFeedback");
  const attemptsDisplay = document.getElementById("guessAttempts");

  guessBtn.addEventListener("click", () => {
    const guess = Number(guessInput.value);
    attempts++;

    if (!guess || guess < 1 || guess > 100) {
      feedback.textContent = "Please enter a number between 1 and 100!";
      feedback.className = "text-danger";
      return;
    }

    if (guess === randomNumber) {
      feedback.textContent = `🎉 Congratulations! You guessed it in ${attempts} attempts!`;
      feedback.className = "text-success";
    } else if (guess < randomNumber) {
      feedback.textContent = "Too low! Try again.";
      feedback.className = "text-warning";
    } else {
      feedback.textContent = "Too high! Try again.";
      feedback.className = "text-warning";
    }

    attemptsDisplay.textContent = `Attempts: ${attempts}`;
    guessInput.value = "";
    guessInput.focus();
  });
});

