// Highlight active navigation link correctly
const navLinks = document.querySelectorAll("nav ul li a");
let currentPath = window.location.pathname.split("/").pop();

// If no file is specified, assume index.html
if (currentPath === "" || currentPath === "/") {
    currentPath = "index.html";
}

navLinks.forEach(link => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (linkPath === currentPath) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});

// Fix "Go to About Page" button not working
document.querySelectorAll('a[href="about.html"]').forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "about.html";
    });
});

// Smooth scrolling when clicking internal links
document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Ensure external links open in a new tab
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener("click", function(event) {
        window.open(this.href, "_blank");
        event.preventDefault();
    });
});

// Fix for active link when scrolling
window.addEventListener("scroll", () => {
    let currentSection = "";

    document.querySelectorAll("section").forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (currentSection && link.getAttribute("href").includes(currentSection)) {
            link.classList.add("active");
        }
    });
});
