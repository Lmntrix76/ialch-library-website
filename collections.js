// Collections Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample data for new arrivals
    const newArrivals = [
        {
            title: "Clinical Nursing Procedures",
            author: "Smith & Johnson",
            type: "Book",
            category: "Nursing"
        },
        {
            title: "Advanced Cardiac Life Support",
            author: "American Heart Association",
            type: "Book",
            category: "Cardiology"
        },
        {
            title: "Pediatric Emergency Medicine",
            author: "Dr. Lisa Williams",
            type: "Book",
            category: "Pediatrics"
        },
        {
            title: "Journal of Advanced Nursing (Vol. 45)",
            author: "Various",
            type: "Journal",
            category: "Nursing"
        },
        {
            title: "Surgical Techniques Illustrated",
            author: "Dr. Robert Chen",
            type: "Book",
            category: "Surgery"
        },
        {
            title: "Pharmacology for Nurses",
            author: "Adams & Urban",
            type: "Book",
            category: "Nursing"
        },
        {
            title: "The Lancet (Latest Issue)",
            author: "Various",
            type: "Journal",
            category: "Medicine"
        },
        {
            title: "Neurology Case Studies",
            author: "Dr. Sarah Klein",
            type: "Book",
            category: "Neurology"
        }
    ];

    // Initialize new arrivals slider
    const arrivalsTrack = document.querySelector('.arrivals-track');
    
    newArrivals.forEach(item => {
        const arrivalItem = document.createElement('div');
        arrivalItem.className = 'arrival-item';
        arrivalItem.innerHTML = `
            <div class="book-cover" style="background: ${getRandomColor()}"></div>
            <h4>${item.title}</h4>
            <p>${item.author}</p>
            <small>${item.type} • ${item.category}</small>
        `;
        arrivalsTrack.appendChild(arrivalItem);
    });

    // Slider functionality
    const sliderContainer = document.querySelector('.arrivals-container');
    const sliderTrack = document.querySelector('.arrivals-track');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const itemWidth = 200; // Width of each item + gap
    let currentPosition = 0;
    const maxPosition = -(newArrivals.length * itemWidth - sliderContainer.offsetWidth);

    nextBtn.addEventListener('click', () => {
        if (currentPosition > maxPosition) {
            currentPosition -= itemWidth;
            sliderTrack.style.transform = `translateX(${currentPosition}px)`;
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPosition < 0) {
            currentPosition += itemWidth;
            sliderTrack.style.transform = `translateX(${currentPosition}px)`;
        }
    });

    // Journal tabs functionality
    const journalTabs = document.querySelectorAll('.journal-tab');
    
    journalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            journalTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.journal-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Category cards interaction
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            // In a real implementation, this would filter the collection
            alert(`Showing items for ${category}. This would filter the collection in a full implementation.`);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('collection-search');
    const searchResults = document.getElementById('search-results');
    
    searchInput.addEventListener('input', () => {
        if (searchInput.value.length > 2) {
            // Simulate search results
            searchResults.innerHTML = `
                <h4>Search Results for "${searchInput.value}"</h4>
                <p>5 items found</p>
                <ul>
                    <li>Clinical ${searchInput.value} Procedures</li>
                    <li>Advanced ${searchInput.value} Techniques</li>
                    <li>Journal of ${searchInput.value} Studies</li>
                    <li>${searchInput.value} for Nurses</li>
                    <li>Case Studies in ${searchInput.value}</li>
                </ul>
            `;
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    });

    // Helper function for random colors
    function getRandomColor() {
        const colors = ['#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#073B4C'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});