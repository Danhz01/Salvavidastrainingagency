// JavaScript for Slideshow functionality
let slideIndex = 0; // Initial slide index

function showSlides() {
    let slides = document.getElementsByClassName("slide");

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Increment slide index and loop back to 0 if it exceeds the total slides
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // Display the current slide
    slides[slideIndex - 1].style.display = "block";

    // Set the slideshow to transition every 5 seconds
    setTimeout(showSlides, 5000); // Change slide every 5 seconds
}

// Initialize slideshow
showSlides();
