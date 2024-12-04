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
