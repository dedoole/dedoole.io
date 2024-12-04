document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded: Main content hidden.');
});

async function loadContent(page, containerId) {
    try {
        const response = await fetch(page);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        document.getElementById(containerId).innerHTML = text;
        document.getElementById(containerId).style.display = 'block';
        console.log(`${page} content loaded.`);
    } catch (error) {
        console.error(`Error loading ${page}:`, error);
    }
}

async function loadHeader() {
    await loadContent('header.html', 'header-placeholder');
}

async function loadFooter() {
    await loadContent('footer.html', 'footer-placeholder');
}

function showContentAfterLoad() {
    document.getElementById('loading-screen').style.display = 'none';
    document.querySelector('header').style.display = 'block';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('footer-placeholder').style.display = 'block';
    document.body.style.overflow = 'auto'; // Allow scrolling after loading screen
    loadContent('about.html', 'main-content'); // Load the "About Me" content by default
    console.log('Loading screen hidden, About Me content loaded.');
}

async function init() {
    await loadHeader();
    await loadFooter();
    window.addEventListener('load', () => {
        setTimeout(showContentAfterLoad, 5000); // 5 seconds
    });
}

init();

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
