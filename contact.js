// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const contactForm = document.getElementById('library-contact-form');
    const formSuccess = document.getElementById('form-success');
    
    contactForm.addEventListener('submit', function(e) {
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
            // In a real implementation, this would send the form data to a server
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset form after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
            }, 5000);
        }
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
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
    
    // Animate contact info items
    const infoItems = document.querySelectorAll('.info-item');
    
    infoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100);
    });
});

