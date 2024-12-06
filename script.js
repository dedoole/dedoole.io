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

/* Initial State */
.screen-assistant img {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    cursor: pointer;
}

/* Expanded State */
.assistant-menu {
    display: none;
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    z-index: 1000;
    zoom: 1; /* Keep the assistant menu zoom level at 1 */
}

.assistant-header {
    display: flex;
    justify-content: flex-end;
}

.assistant-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.assistant-menu ul li {
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
}

.assistant-menu ul li span {
    margin: 0 5px;
}

.assistant-menu ul li:hover {
    background: #f0f0f0;
}

/* Dark Mode */
.dark-mode {
    background-color: #121212;
    color: #ffffff;
}

/* Greyscale Images */
img.greyscale {
    filter: grayscale(100%);
}


//END SCREEN ASSISTANT
