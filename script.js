document.addEventListener('DOMContentLoaded', function() {
    // Hide the main content initially
    console.log('DOMContentLoaded: Main content hidden.');
});

// Function to dynamically load content
function loadContent(page) {
    fetch(page)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('main-content').innerHTML = data;
        document.getElementById('main-content').style.display = 'block';
        window.scrollTo(0, 0); // Scroll to the top of the page
        console.log(`${page} content loaded.`);
    })
    .catch(error => console.error('Error loading content:', error));
}

// Function to load header.html
async function loadHeader() {
    try {
        const response = await fetch('header.html');
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        document.getElementById('header-placeholder').innerHTML = text;
        console.log('Header loaded.');
    } catch (error) {
        console.error('Error loading header:', error);
    }
}
loadHeader();

// Function to load footer.html
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        document.getElementById('footer-placeholder').innerHTML = text;
        console.log('Footer loaded.');
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}
loadFooter();

// Function to show the contact form modal
function showContactForm() {
    document.getElementById('contact-modal').style.display = 'flex';
    init3DScene();
}

// Function to close the contact form modal
function closeContactForm() {
    document.getElementById('contact-modal').style.display = 'none';
}

// Initialize 3D scene
function init3DScene() {
    const canvas = document.getElementById('3d-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();
}

// Handle the loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.querySelector('header').style.display = 'block';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('footer-placeholder').style.display = 'block';
        loadContent('about.html'); // Load the "About Me" content by default after loading screen
        console.log('Loading screen hidden, About Me content loaded.');
        document.body.style.overflow = 'auto'; // Allow scrolling after loading screen
    }, 2000); // 5 seconds
});

// Initialize footer actions after loading
        const timeDisplay = document.getElementById("time-display");
        if (timeDisplay) {
            updateTime();
            setInterval(updateTime, 1000); // Update time every second
        }

// Function to update date and time
function updateTime() {
    const timeDisplay = document.getElementById("time-display");
    if (timeDisplay) {
        const now = new Date();
        const dateString = now.toLocaleDateString();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        timeDisplay.textContent = `${dateString} ${timeString}`;
    }
}

// Search functionality
const searchData = [
    { title: "UEFA Champions League Dashboard", page: "uefa", keywords: ["football", "UEFA", "dashboard", "analysis", "champions"] },
    { title: "Netflix Data Analysis", page: "netflix", keywords: ["Netflix", "data analysis", "SQL", "Python"] },
    { title: "IoT Embedded Systems", page: "iot", keywords: ["IoT", "embedded systems", "devices", "data collection"] },
    { title: "AI-Powered Fraud Detection", page: "fraud", keywords: ["fraud detection", "AI", "machine learning"] },
    { title: "Supply Chain Management Dashboard", page: "supply-chain", keywords: ["supply chain", "Power BI", "inventory", "dashboard"] },
    { title: "AI-Based Predictive Maintenance", page: "predictive-maintenance", keywords: ["AI", "predictive maintenance", "machine learning"] }
];

// Show search suggestions based on input
function showSuggestions(value) {
    const suggestionsBox = document.getElementById('search-suggestions');
    suggestionsBox.innerHTML = ''; // Clear previous suggestions
    const results = value.length === 0
        ? searchData // Show all suggestions if input is empty
        : searchData.filter(item => item.keywords.some(keyword => keyword.toLowerCase().includes(value.toLowerCase())));

    if (results.length > 0) {
        results.forEach(result => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.innerHTML = `<strong>${result.title}</strong>`;
            suggestionDiv.onclick = function () {
                loadContent(result.page); // Load page dynamically
                suggestionsBox.style.display = 'none'; // Hide suggestions
                clearSearchInput(); // Clear search input
            };
            suggestionsBox.appendChild(suggestionDiv);
        });
        suggestionsBox.style.display = 'block'; // Show suggestions
    } else {
        suggestionsBox.style.display = 'none'; // Hide if no matches
    }
}

// Clear search input
function clearSearchInput() {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) searchInput.value = '';
}

// Detect clicks outside of sideNav and close it
document.addEventListener('click', function (event) {
    const sideNav = document.getElementById("sideNav");
    const hamburger = document.querySelector('.hamburger');
    if (sideNav && sideNav.style.width === "150px" && !sideNav.contains(event.target) && !hamburger.contains(event.target)) {
        closeNav();
    }
});

// START SCREEN ASSISTANT 

// Initial zoom percentage
let zoomPercentage = 100;

function toggleAssistantMenu() {
    const menu = document.getElementById('assistantMenu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

function updateZoomDisplay() {
    document.getElementById('zoomPercentage').innerText = zoomPercentage + '%';
}

function zoomIn() {
    if (zoomPercentage < 500) {
        zoomPercentage += 25;
        document.body.style.transform = `scale(${zoomPercentage / 100})`;
        document.body.style.transformOrigin = '0 0'; /* Keeps the zoom centered */
        updateZoomDisplay();
    }
}

function zoomOut() {
    if (zoomPercentage > 25) {
        zoomPercentage -= 25;
        document.body.style.transform = `scale(${zoomPercentage / 100})`;
        document.body.style.transformOrigin = '0 0'; /* Keeps the zoom centered */
        updateZoomDisplay();
    }
}

function toggleReadableFont() {
    const currentFont = document.body.style.fontFamily;
    document.body.style.fontFamily = (currentFont === 'Arial, sans-serif') ? '' : 'Arial, sans-serif';
}

function toggleUnderlineLinks() {
    const links = document.querySelectorAll('a');
    links.forEach(link => link.style.textDecoration = link.style.textDecoration === 'underline' ? 'none' : 'underline');
}

function highlightLinks() {
    const links = document.querySelectorAll('a');
    links.forEach(link => link.style.backgroundColor = 'yellow');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function toggleGreyscale() {
    const images = document.querySelectorAll('img');
    images.forEach(img => img.classList.toggle('greyscale'));
}

function removeAnimations() {
    const animatedElements = document.querySelectorAll('*');
    animatedElements.forEach(elem => {
        elem.style.animation = 'none';
        elem.style.transition = 'none';
    });
}

function clearCookies() {
    document.cookie.split(";").forEach(function(c) {
        document.cookie = c.split("=")[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
    alert('Cookies cleared and settings reset!');

    // Reset all adjustments made by the assistant
    document.body.style.transform = 'scale(1)';
    zoomPercentage = 100;
    updateZoomDisplay();
    document.body.style.fontFamily = '';
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.style.textDecoration = 'none';
        link.style.backgroundColor = '';
    });
    document.body.classList.remove('dark-mode');
    const images = document.querySelectorAll('img');
    images.forEach(img => img.classList.remove('greyscale'));
    const animatedElements = document.querySelectorAll('*');
    animatedElements.forEach(elem => {
        elem.style.animation = '';
        elem.style.transition = '';
    });
}


//END SCREEN ASSISTANT
