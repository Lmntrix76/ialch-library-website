// Main JavaScript for all pages
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }
  
  function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    if (nav) {
      nav.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    }
  }
  
  // Tab functionality (Services page)
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }
  
  // Journal tabs (Collections page)
  const journalTabs = document.querySelectorAll('.journal-tab');
  const journalContents = document.querySelectorAll('.journal-content');
  
  if (journalTabs.length > 0) {
    journalTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        journalTabs.forEach(t => t.classList.remove('active'));
        journalContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
  }
  
  // FAQ accordion (Contact page)
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = question.nextElementSibling;
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
          if (item !== faqItem) {
            item.querySelector('.faq-question').classList.remove('active');
            item.querySelector('.faq-answer').classList.remove('active');
          }
        });
        
        // Toggle current item
        question.classList.toggle('active');
        answer.classList.toggle('active');
      });
    });
  }
  
  // 3D Book Flip (Collections page)
  const flipBtn = document.querySelector('.flip-btn');
  if (flipBtn) {
    flipBtn.addEventListener('click', () => {
      document.getElementById('featured-book').classList.toggle('flipped');
    });
  }
  
  // Book Availability Checker (Collections page)
  const checkAvailabilityBtn = document.getElementById('check-availability');
  if (checkAvailabilityBtn) {
    checkAvailabilityBtn.addEventListener('click', checkBookAvailability);
  }
  
  function checkBookAvailability() {
    const isbnInput = document.getElementById('book-isbn');
    const resultDiv = document.querySelector('.availability-result');
    
    if (!isbnInput.value) {
      resultDiv.innerHTML = '<p class="error">Please enter an ISBN or title</p>';
      resultDiv.style.display = 'block';
      return;
    }
    
    // Simulate loading
    resultDiv.innerHTML = '<p>Checking availability...</p>';
    resultDiv.style.display = 'block';
    
    // Simulate API call
    setTimeout(() => {
      const books = {
        "123456789": { title: "Clinical Nursing", available: true, location: "Shelf 4A" },
        "987654321": { title: "Advanced Cardiology", available: false, due: "2023-12-15" },
        "456789123": { title: "Pediatric Care", available: true, location: "Shelf 2B" }
      };
      
      // Try to find by ISBN first, then by title
      const book = books[isbnInput.value] || 
        Object.values(books).find(b => b.title.toLowerCase().includes(isbnInput.value.toLowerCase()));
      
      if (book) {
        resultDiv.innerHTML = `
          <h3>${book.title}</h3>
          <p>Status: ${book.available ? 
            `<span class="available">Available</span> (${book.location})` : 
            `<span class="unavailable">Checked Out</span> (Due: ${book.due})`}
          </p>
        `;
      } else {
        resultDiv.innerHTML = '<p class="error">Book not found in our collection</p>';
      }
    }, 1500);
  }
  
  // Search functionality (Collections page)
  const searchInput = document.getElementById('collection-search');
  const searchResults = document.getElementById('search-results');
  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 300));
  }
  
  function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    if (query.length < 2) {
      searchResults.style.display = 'none';
      return;
    }
    
    // Simulate search results
    const results = [
      "Clinical Nursing Procedures",
      "Advanced Cardiac Life Support",
      "Pediatric Emergency Medicine",
      "Journal of Advanced Nursing",
      "Surgical Techniques Illustrated",
      "Pharmacology for Nurses",
      "The Lancet",
      "Neurology Case Studies"
    ].filter(item => item.toLowerCase().includes(query));
    
    displayResults(results);
  }
  
  function displayResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = '<p>No results found</p>';
      searchResults.style.display = 'block';
      return;
    }
    
    searchResults.innerHTML = `
      <h3>Search Results</h3>
      <ul class="results-list">
        ${results.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
    searchResults.style.display = 'block';
  }
  
  // Debounce function for search
  function debounce(func, delay) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
  }
  
  // Form validation (Contact page)
  const contactForm = document.getElementById('library-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  function handleFormSubmit(e) {
    e.preventDefault();
    let isValid = true;
    
    // Reset error states
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('error');
    });
    
    // Validate name
    const nameInput = document.getElementById('name');
    if (nameInput.value.trim() === '') {
      nameInput.parentElement.classList.add('error');
      isValid = false;
    }
    
    // Validate email
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.parentElement.classList.add('error');
      isValid = false;
    }
    
    // Validate subject
    const subjectInput = document.getElementById('subject');
    if (subjectInput.value === '') {
      subjectInput.parentElement.classList.add('error');
      isValid = false;
    }
    
    // Validate message
    const messageInput = document.getElementById('message');
    if (messageInput.value.trim() === '') {
      messageInput.parentElement.classList.add('error');
      isValid = false;
    }
    
    if (isValid) {
      // Show success message
      contactForm.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
      
      // Reset form after 5 seconds
      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        document.getElementById('form-success').style.display = 'none';
      }, 5000);
    }
  }
  
  // Initialize new arrivals slider
  const arrivalsTrack = document.querySelector('.arrivals-track');
  if (arrivalsTrack) {
    const newArrivals = [
      "Clinical Nursing Procedures",
      "Advanced Cardiac Life Support",
      "Pediatric Emergency Medicine",
      "Journal of Advanced Nursing",
      "Surgical Techniques Illustrated",
      "Pharmacology for Nurses",
      "The Lancet",
      "Neurology Case Studies"
    ];
    
    newArrivals.forEach(title => {
      const arrivalItem = document.createElement('div');
      arrivalItem.className = 'arrival-item';
      arrivalItem.innerHTML = `
        <div class="book-cover-placeholder" style="background: ${getRandomColor()}"></div>
        <h4>${title}</h4>
        <p>New arrival</p>
      `;
      arrivalsTrack.appendChild(arrivalItem);
    });
    
    // Slider functionality
    const sliderContainer = document.querySelector('.arrivals-container');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const itemWidth = 220; // Width of each item + gap
    let currentPosition = 0;
    const maxPosition = -(newArrivals.length * itemWidth - sliderContainer.offsetWidth);
    
    nextBtn.addEventListener('click', () => {
      if (currentPosition > maxPosition) {
        currentPosition -= itemWidth;
        arrivalsTrack.style.transform = `translateX(${currentPosition}px)`;
      }
    });
    
    prevBtn.addEventListener('click', () => {
      if (currentPosition < 0) {
        currentPosition += itemWidth;
        arrivalsTrack.style.transform = `translateX(${currentPosition}px)`;
      }
    });
  }
  
  // Helper function for random colors
  function getRandomColor() {
    const colors = ['#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#073B4C'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
});