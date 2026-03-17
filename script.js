document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. Loading Screen
    ========================================= */
    const loader = document.getElementById('loader');
    
    // Hide loader after a short delay to show the animation
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500); // Wait for opacity transition
    }, 1500);

    /* =========================================
       2. Sticky Navigation Bar & Active Links
    ========================================= */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        // Active State on Scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* =========================================
       3. Mobile Menu Toggle
    ========================================= */
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const navLinksContainer = document.querySelector('.nav-links');
    const navBtn = document.querySelector('.nav-btn');

    mobileMenuIcon.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        navBtn.classList.toggle('active');
        
        // Toggle icon between bars and times
        const icon = mobileMenuIcon.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            navBtn.classList.remove('active');
            mobileMenuIcon.querySelector('i').classList.remove('fa-times');
            mobileMenuIcon.querySelector('i').classList.add('fa-bars');
        });
    });

    /* =========================================
       4. Fade-in Scroll Animations (Intersection Observer)
    ========================================= */
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* =========================================
       5. Booking Form Validation & Submission
    ========================================= */
    const bookingForm = document.getElementById('bookingForm');
    const formStatus = document.getElementById('formStatus');

    if(bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic Validation
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const shootType = document.getElementById('shootType').value;
            const date = document.getElementById('date').value;
            const location = document.getElementById('location').value;

            if(!name || !phone || !email || !shootType || !date || !location) {
                formStatus.textContent = 'Please fill in all required fields.';
                formStatus.className = 'form-status error';
                return;
            }

            // Simulate form submission delay
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                formStatus.textContent = `Thank you, ${name}! Your booking request for a ${shootType} shoot on ${date} has been received. We will contact you at ${email} shortly.`;
                formStatus.className = 'form-status success';
                bookingForm.reset();
                
                // Reset select active styling by removing 'active' class on date label if possible, though date usually works automatically
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 5000);
                
            }, 1500);
        });
    }

    /* =========================================
       6. Form Input Label Interaction
    ========================================= */
    // Add active class to date label specifically because it has a placeholder that tricks CSS focus-within sometimes
    const dateInput = document.getElementById('date');
    if(dateInput) {
        // Automatically give date input active class in CSS (already done via HTML class="active") or JS if needed
    }
});
