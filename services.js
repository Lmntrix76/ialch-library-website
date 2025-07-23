// Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
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
    
    // Simulate computer availability changes
    const computers = document.querySelectorAll('.computer');
    if (computers.length > 0) {
        setInterval(() => {
            computers.forEach(comp => {
                if (Math.random() > 0.7) { // 30% chance to change status
                    const statuses = ['free', 'in-use', 'reserved'];
                    const currentStatus = comp.classList[1];
                    let newStatus;
                    
                    do {
                        newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                    } while (newStatus === currentStatus);
                    
                    comp.classList.remove(currentStatus);
                    comp.classList.add(newStatus);
                }
            });
        }, 5000); // Change every 5 seconds
    }
});