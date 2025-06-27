'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
if (navigationLinks && pages) {
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior
      
      // Get the target page from the button's text content
      const targetPage = this.textContent.trim().toLowerCase();
      
      // Update active states
      for (let j = 0; j < pages.length; j++) {
        if (targetPage === pages[j].dataset.page) {
          pages[j].classList.add("active");
          // Remove active class from all navigation links first
          navigationLinks.forEach(link => link.classList.remove("active"));
          // Add active class to the clicked link
          this.classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[j].classList.remove("active");
        }
      }
    });
  }

  // Initialize the first page as active on load
  document.addEventListener("DOMContentLoaded", function() {
    // Check if there's a hash in the URL
    const hash = window.location.hash.substring(1);
    
    if (hash) {
      // Find the corresponding page and activate it
      const targetPage = document.querySelector(`[data-page="${hash}"]`);
      if (targetPage) {
        // Remove active class from all pages and links first
        pages.forEach(page => page.classList.remove("active"));
        navigationLinks.forEach(link => link.classList.remove("active"));
        
        // Activate the target page
        targetPage.classList.add("active");
        
        // Find and activate the corresponding nav link
        const correspondingLink = Array.from(navigationLinks).find(link => 
          link.textContent.trim().toLowerCase() === hash
        );
        if (correspondingLink) {
          correspondingLink.classList.add("active");
        }
      }
    } else {
      // Default to the first page if no hash
      if (pages.length > 0) {
        pages[0].classList.add("active");
        if (navigationLinks.length > 0) {
          navigationLinks[0].classList.add("active");
        }
      }
    }
  });
}

// Filter functionality (only if filter elements exist)
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

if (selectItems.length > 0) {
  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      if (select) elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

const filterFunc = function (selectedValue) {
  if (!filterItems || filterItems.length === 0) return;
  
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

if (filterBtn.length > 0) {
  // add event in all filter button items for large screen
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}



const form = document.querySelector('[data-form]');
  const sendBtn = document.querySelector('[data-form-btn]');
  const inputs = document.querySelectorAll('[data-form-input]');

  // Enable button when all fields are filled
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
      sendBtn.disabled = !allFilled;
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('service_iud3pai', 'template_i7uxn2a', form)
      .then(() => {
        alert('Message sent successfully!');
        form.reset();
        sendBtn.disabled = true;
      }, (error) => {
        console.error('FAILED...', error);
        alert('Failed to send message. Try again!');
      });
  });