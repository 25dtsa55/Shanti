document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('form');
    const responseMessage = document.getElementById('form-response');

    contactForm.addEventListener('submit', async (e) => {
        // Prevent traditional form submission
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (!name || !email || !message) {
            showMessage('error', 'Please fill in all fields.');
            return;
        }

        // Prepare data to send
        const formData = { name, email, message };

        try {
            // Update button UI
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Make POST request to backend API
            const response = await fetch('http://localhost:5000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            // Restore button UI
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            if (response.ok) {
                // Success message
                showMessage('success', data.message);
                contactForm.reset(); // clear the form
            } else {
                // Error message from server
                showMessage('error', data.error || 'Something went wrong.');
            }

        } catch (error) {
            console.error('Fetch error:', error);
            // Network or other fetch-related error
            showMessage('error', 'Failed to connect to the server. Please check if the backend is running.');
            contactForm.querySelector('button[type="submit"]').textContent = 'Send';
            contactForm.querySelector('button[type="submit"]').disabled = false;
        }
    });

    /**
     * Display response message
     * @param {string} type 'success' or 'error'
     * @param {string} text The message text to display
     */
    function showMessage(type, text) {
        responseMessage.textContent = text;
        responseMessage.className = `response-message ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            responseMessage.className = 'response-message hidden';
        }, 5000);
    }
});

// Function called by the hero button
function scrollToSection() {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
}
