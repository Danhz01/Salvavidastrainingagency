document.addEventListener("DOMContentLoaded", function() {
    // Mobile Navigation Toggle with Animation
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function() {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active"); // Optional: Add an active class to the hamburger menu for animation
    });

    // Slideshow Gallery with smooth fade transition
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let slides = document.querySelectorAll(".slide");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  // Hide all slides
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1; }
        slides[slideIndex - 1].style.display = "block";  // Show the current slide

        // Fade effect: Add a class for smooth transition (CSS needs to handle the fade)
        const activeSlide = slides[slideIndex - 1];
        activeSlide.classList.add("fade-active");

        setTimeout(showSlides, 4000); // Change slide every 4 seconds
    }
});
