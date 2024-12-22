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

// Function to load contact form 
function showContactForm() { 
    loadContent('contact.html'); 
} 
// Function to close the contact form 
function closeContactForm() { 
     document.getElementById('main-content').innerHTML = '';
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


// Function to show a specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }
}


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


// START SCREEN ASSISTANT 

// Initial font size percentage
let fontSizePercentage = 100;

function toggleAssistantMenu() {
    const menu = document.getElementById('assistantMenu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

function updateZoomDisplay() {
    document.getElementById('zoomPercentage').innerText = fontSizePercentage + '%';
}

function zoomIn() {
    if (fontSizePercentage < 500) {
        fontSizePercentage += 25;
        document.body.style.fontSize = fontSizePercentage + '%';
        updateZoomDisplay();
    }
}

function zoomOut() {
    if (fontSizePercentage > 25) {
        fontSizePercentage -= 25;
        document.body.style.fontSize = fontSizePercentage + '%';
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
    links.forEach(link => {
        if (link.style.backgroundColor === 'yellow') {
            link.style.backgroundColor = '';
        } else {
            link.style.backgroundColor = 'yellow';
        }
    });
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
    document.body.style.fontSize = '100%';
    fontSizePercentage = 100;
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

function toggleNightMode() {
    document.body.classList.toggle('night-mode');
    const assistantMenu = document.getElementById('assistantMenu');
    assistantMenu.classList.toggle('night-mode');
}

let scrollPosition = 'top';

function toggleScroll() {
    if (scrollPosition === 'top') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        scrollPosition = 'bottom';
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        scrollPosition = 'top';
    }
}

function updateBrightness(value) { 
    const content = document.querySelector('.page-content'); 
    if (content) { content.style.filter = `brightness(${value})`;
  } 
}

//***END SCREEN ASSISTANT

//START JOB-ALERT SECTION
// Function to dynamically load job-alert.html
async function loadJobAlerts() {
  const response = await fetch('job-alert.html');
  const html = await response.text();
  document.getElementById('job-alerts-container').innerHTML = html;

  // Add event listener for LinkedIn login button
  const linkedinLoginButton = document.getElementById('linkedin-login');
  if (linkedinLoginButton) {
    linkedinLoginButton.addEventListener('click', function() {
      const clientId = '777qa7z9c32gly';
      const redirectUri = encodeURIComponent('https://dedoole.github.io/dedoole.io/auth/linkedin/callback');
      const state = '987654321'; // Unique identifier for CSRF protection
      const scope = 'r_liteprofile%20r_emailaddress%20w_member_social';
      const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
      console.log('Redirecting to:', authUrl); // Log message for debugging
      window.location.href = authUrl; // Redirect to LinkedIn authorization URL
    });
  }

  // Function to extract query parameters from URL
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      code: params.get('code'),
      state: params.get('state')
    };
  }

  async function fetchAccessToken(authCode) {
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: 'https://dedoole.github.io/dedoole.io/auth/linkedin/callback',
        client_id: '777qa7z9c32gly',
        client_secret: 'WPL_AP1.Tjvrme4L3MatBRsx.osKeJg=='
      })
    });
    const data = await response.json();
    console.log('Access Token:', data.access_token);
    return data.access_token;
  }

  async function fetchJobAlerts(token) {
    try {
      const response = await fetch('https://api.linkedin.com/v2/jobAlerts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      const jobsContainer = document.getElementById('jobs');
      if (jobsContainer) {
        jobsContainer[_{{{CITATION{{{_1{](https://github.com/up730418/scuba-time/tree/9b4d6256a967ae706cbc6281e4531d77030e249f/src%2Fapp%2Fapp.component.ts)


// END JOB-ALERT SECTION
