document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        }
        
        themeToggle.addEventListener('click', () => {
            if (document.documentElement.getAttribute('data-theme') === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Close mobile nav when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link, .cta-btn');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }

    // Sticky Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Current Year for Footer
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Countdown Timer Logic
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        // Set a random date in the future (e.g., 30 days from now)
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 30);
        countdownDate.setHours(14, 0, 0, 0); // 2:00 PM

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countdownDate.getTime() - now;

            if (distance < 0) {
                countdownEl.innerHTML = "<div>Event Started!</div>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('mins').textContent = mins.toString().padStart(2, '0');
            document.getElementById('secs').textContent = secs.toString().padStart(2, '0');
        };

        updateCountdown(); // Initial call
        setInterval(updateCountdown, 1000); // Update every second
    }

    // Form Validation
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            // Name Validation
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                nameInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                nameInput.parentElement.classList.remove('error');
            }
            
            // Date Validation
            const dateInput = document.getElementById('eventDate');
            const selectedDate = new Date(dateInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (dateInput.value === '' || selectedDate <= today) {
                dateInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                dateInput.parentElement.classList.remove('error');
            }
            
            // Guest Count Validation
            const guestInput = document.getElementById('guestCount');
            if (guestInput.value === '' || parseInt(guestInput.value) < 1) {
                guestInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                guestInput.parentElement.classList.remove('error');
            }
            
            // Event Type Validation
            const typeInput = document.getElementById('eventType');
            if (typeInput.value === '') {
                typeInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                typeInput.parentElement.classList.remove('error');
            }
            
            // On Success
            if (isValid) {
                const btn = bookingForm.querySelector('.submit-btn');
                btn.textContent = 'Sending...';
                btn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    bookingForm.reset();
                    document.getElementById('formSuccess').style.display = 'block';
                    btn.textContent = 'Submit Request';
                    btn.disabled = false;
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        document.getElementById('formSuccess').style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });

        // Clear errors on input
        const inputs = bookingForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('error');
            });
        });
    }
});
