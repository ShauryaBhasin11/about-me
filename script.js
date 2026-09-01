console.log("SB Portfolio Loaded");

/* ==========================================================
PAGE NAVIGATION
========================================================== */

const container = document.querySelector(".container");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

let currentSection = 0;
let scrolling = false;

function goToSection(index) {
    if (!container || sections.length === 0) return;

    index = Math.max(0, Math.min(index, sections.length - 1));

    currentSection = index;

    container.style.transform = `translateX(-${index * 100}vw)`;

    sections.forEach((section, i) => {
        section.classList.toggle("active", i === index);
    });
}

/* ==========================================================
INITIAL PAGE
========================================================== */

goToSection(0);

window.goToSection = goToSection;
window.goHome = () => goToSection(0);

/* ==========================================================
MOUSE WHEEL NAVIGATION
========================================================== */

window.addEventListener("wheel", (event) => {
    if (scrolling) return;

    if (Math.abs(event.deltaY) < 25) return;

    event.preventDefault();

    scrolling = true;

    if (event.deltaY > 0) {
        goToSection(currentSection + 1);
    } else {
        goToSection(currentSection - 1);
    }

    setTimeout(() => {
        scrolling = false;
    }, 650);
}, { passive: false });

/* ==========================================================
KEYBOARD NAVIGATION
========================================================== */

window.addEventListener("keydown", (event) => {
    const activeElement = document.activeElement;

    if (
        activeElement &&
        (
            activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA"
        )
    ) {
        return;
    }

    switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
            goToSection(currentSection + 1);
            break;

        case "ArrowLeft":
        case "ArrowUp":
            goToSection(currentSection - 1);
            break;

        case "Home":
            goToSection(0);
            break;

        case "End":
            goToSection(sections.length - 1);
            break;
    }
});

/* ==========================================================
NAVBAR LINKS
========================================================== */

navLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        goToSection(index);
    });
});

/* ==========================================================
HERO BUTTONS
========================================================== */

const projectButton = document.getElementById("projectsBtn");
const contactButton = document.getElementById("contactBtn");

if (projectButton) {
    projectButton.addEventListener("click", () => {
        goToSection(3);
    });
}

if (contactButton) {
    contactButton.addEventListener("click", () => {
        goToSection(4);
    });
}

/* ==========================================================
LOGO
========================================================== */

const logo = document.querySelector(".logo");

if (logo) {
    logo.addEventListener("click", (event) => {
        event.preventDefault();
        goToSection(0);
    });
}

/* ==========================================================
WINDOW RESIZE
========================================================== */

window.addEventListener("resize", () => {
    if (!container) return;

    container.style.transform = `translateX(-${currentSection * 100}vw)`;
});

/* ==========================================================
VISITOR COUNTER
========================================================== */

const visitorCounter = document.getElementById("visitor-count");

if (visitorCounter) {
    fetch("https://api.countapi.xyz/hit/shaurya-portfolio/portfolio")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Counter request failed");
            }

            return response.json();
        })
        .then((data) => {
            if (typeof data.value === "number") {
                visitorCounter.textContent = data.value.toLocaleString();
            } else {
                visitorCounter.textContent = "--";
            }
        })
        .catch(() => {
            visitorCounter.textContent = "--";
        });
}

/* ==========================================================
DARK MODE
========================================================== */

const themeToggle = document.getElementById("themeToggle");

function updateThemeButton() {
    if (!themeToggle) return;

    const darkMode = document.body.classList.contains("dark");

    themeToggle.textContent = darkMode ? "☀️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        darkMode ? "Switch to light mode" : "Switch to dark mode"
    );
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

updateThemeButton();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const darkMode = document.body.classList.contains("dark");

        localStorage.setItem("theme", darkMode ? "dark" : "light");
        updateThemeButton();
    });
}

/* ==========================================================
BACKGROUND MUSIC
========================================================== */

const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

if (music && musicToggle) {
    music.volume = 0.2;

    function updateMusicButton() {
        musicToggle.textContent = music.paused ? "🎵" : "🔊";
        musicToggle.setAttribute(
            "aria-label",
            music.paused ? "Play background music" : "Pause background music"
        );
    }

    const savedMusic = localStorage.getItem("music");
    if (savedMusic === "on") {
        music.play().catch(() => {
            console.log("Music could not be played.");
        });
    }

    updateMusicButton();

    musicToggle.addEventListener("click", async () => {
        try {
            if (music.paused) {
                await music.play();
                localStorage.setItem("music", "on");
            } else {
                music.pause();
                localStorage.setItem("music", "off");
            }

            updateMusicButton();
        } catch (error) {
            console.log("Music could not be played.");
        }
    });
}

/* ==========================================================
IMAGE FALLBACK
========================================================== */

document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
        image.style.display = "none";
    });
});

/* ==========================================================
FINISHED
========================================================== */

console.log("SB Portfolio Loaded Successfully");
