/*=============== SEARCH ===============*/
const searchButton = document.getElementById("search-button");
const searchClose = document.getElementById("search-close");
const searchContent = document.getElementById("search-content");
const searchForm = document.getElementById("search-form");

/*====== MENU SHOW =======*/
if (searchButton) {
  searchButton.addEventListener("click", () => {
    searchContent.classList.add("show-search");
  });
}

/*====== MENU HIDE =======*/
if (searchClose) {
  searchClose.addEventListener("click", () => {
    searchContent.classList.remove("show-search");
  });
}

/*====== SEARCH FUNCTIONALITY =======*/
if (searchForm) {
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form submission

    // Get the value entered in the search input
    const searchInputValue = document.getElementById("search-input").value.trim();

    try {
      // Make an AJAX request to the server
      const response = await fetch(`http://localhost:3000/search?q=${searchInputValue}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const searchResults = await response.json();
      
      // Display search results
      displaySearchResults(searchResults);
    } catch (error) {
      console.error("Error searching:", error);
    }
  });
}

function displaySearchResults(results) {
  // Assuming results is an array of book objects with a "title" property
  const resultList = document.getElementById("search-results");
  resultList.innerHTML = ""; // Clear previous results

  results.forEach(book => {
    const listItem = document.createElement("li");
    listItem.textContent = book.title;
    resultList.appendChild(listItem);
  });
}



function displaySearchResults(results) {
  // Assuming results is an array of book objects with a "title" property
  const resultList = document.getElementById("search-results");
  resultList.innerHTML = ""; // Clear previous results

  results.forEach(book => {
    const listItem = document.createElement("li");
    listItem.textContent = book.title;
    resultList.appendChild(listItem);
  });
}

/*=============== LOGIN ===============*/
const userButton = document.getElementById("user-button"),
  loginClose = document.getElementById("login-close"),
  loginContent = document.getElementById("login-content");
/*====== LOGIN SHOW =======*/
if (userButton) {
  userButton.addEventListener("click", () => {
    loginContent.classList.add("show-login");
  });
}
/*====== LOGIN HIDE =======*/
if (loginClose) {
  loginClose.addEventListener("click", () => {
    loginContent.classList.remove("show-login");
  });
}


// /*=============== SIGN UP ===============*/

// const closeIcon = document.getElementById('signup-close');

// closeIcon.addEventListener('click', function() {
//     // Redirect to the home page
//     window.location.href = 'index.html';
// });

// JavaScript code

// Get the close icon element


/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () => {
  const header = document.getElementById("header");
  // When scroll is greater than 50 viewport height, add the scroll-header class to header tag.
  this.scrollY >= 50
    ? header.classList.add("shadow-header")
    : header.classList.remove("shadow-header");
};
window.addEventListener("scroll", shadowHeader);
/*=============== HOME SWIPER ===============*/
let swiperHome = new Swiper(".home__swiper", {
  loop: true,
  spaceBetween: -24,
  grabCursor: true,
  slidesPerView: "auto",
  centeredSlides: "auto",

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  breakpoints: {
    1220: {
      spaceBetween: -32,
    },
  },
});

/*=============== FEATURED SWIPER ===============*/
let swiperFeatured = new Swiper(".featured__swiper", {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,
  slidesPerView: "auto",
  centeredSlides: "auto",

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1150: {
      slidesPerView: 4,
      centeredSlides: false,
    },
  },
});

/*=============== NEW SWIPER ===============*/
let swiperNew = new Swiper(".new__swiper", {
  loop: true,
  spaceBetween: 16,
  slidesPerView: "auto",

  breakpoints: {
    1150: {
      slidesPerView: 3,
    },
  },
});
/*=============== TESTIMONIAL SWIPER ===============*/
let swiperTestimonial = new Swiper(".testimonial__swiper", {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,
  slidesPerView: "auto",
  centeredSlides: "auto",

  breakpoints: {
    1150: {
      slidesPerView: 3,
      centeredSlides: false,
    },
  },
});
/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // When scroll is higher than 350 viewport height, add the show-scroll class to the a tag with scrollup class.
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionClass = document.querySelector(
        `.nav__menu a[href*= ${sectionId}]`
      );
    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionClass.classList.add("active_link");
    } else {
      sectionClass.classList.remove("active_link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-sun-line" : "ri-moon-line";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: "2500",
  delay: "400",
  reset: true,
});

sr.reveal(`.home__data, .featured__container, .new__container,
            .join__data, .testimonial__container, .footer`);
sr.reveal(`.home__images`, { delay: 600 });
sr.reveal(`.services__card`, { interval: 100 });
sr.reveal(`.discount__data`, { origin: "left" });
sr.reveal(`.discount__images`, { origin: "right" });


// ===============================================Loder
// Wait for the page to fully load
window.addEventListener('load', function () {
    // Hide the loader wrapper
    document.querySelector('.loader-wrapper').style.display = 'none';
    // Show the content
    document.getElementById('content').style.display = 'block';
  });
  
  // ==================Add to Cart
 // Get all "Add to Cart" buttons
 const addToCartButtons = document.querySelectorAll('.featured__card button');

 // Add click event listener to each button
 addToCartButtons.forEach(button => {
   button.addEventListener('click', () => {
     // Redirect to the cart page
     window.location.href = 'cart.html';
   });
 });

// Function to initialize cart items in local storage
function initializeCart() {
  const cartItems = localStorage.getItem('cartItems');
  if (!cartItems) {
    localStorage.setItem('cartItems', JSON.stringify({ count: 0, total: 0 }));
  }
}

// Function to update counter and total amount
function updateCounterAndTotal() {
  const { count, total } = JSON.parse(localStorage.getItem('cartItems'));
  const counterElement = document.getElementById('cartCounter');
  const totalElement = document.getElementById('totalAmount');

  // Update counter and total amount display
  counterElement.textContent = count;
  totalElement.textContent = total.toFixed(2);
}

// Function to add book to cart
function addToCart(price) {
  const cartData = JSON.parse(localStorage.getItem('cartItems'));
  const { count, total } = cartData;
  const updatedCount = count + 1;
  const updatedTotal = total + price;
  const updatedCartData = { count: updatedCount, total: updatedTotal };
  localStorage.setItem('cartItems', JSON.stringify(updatedCartData));
  updateCounterAndTotal();
}

// Function to remove book from cart
function removeFromCart() {
  const cartData = JSON.parse(localStorage.getItem('cartItems'));
  const { count, total } = cartData;
  if (count > 0) {
    const updatedCount = count - 1;
    const updatedTotal = total - 11.99; // Assuming the price is fixed at 11.99 for each book
    const updatedCartData = { count: updatedCount, total: updatedTotal };
    localStorage.setItem('cartItems', JSON.stringify(updatedCartData));
    updateCounterAndTotal();
  }
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeCart();
  updateCounterAndTotal();
});




// =======================Payment 

function showPaymentMethods() {
  document.getElementById("paymentMethods").style.display = "block";
}

function processPayment() {
  // Add your payment processing logic here
  const totalAmountElement = document.getElementById("totalAmount");
  let currentAmount = parseFloat(totalAmountElement.textContent.replace("$", ""));
  currentAmount += 100; // Add $100 shipping charge
  totalAmountElement.textContent = "$" + currentAmount.toFixed(2);
  const notificationMessage = "Payment processed successfully!\nTotal Amount With $100 Shipping charges: $" + currentAmount.toFixed(2);
  alert(notificationMessage);
}