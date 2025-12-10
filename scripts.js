function toggleDarkMode() {
  document.documentElement.classList.toggle('dark-mode');
  
  // Save preference to localStorage
  const isDarkMode = document.documentElement.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
}

function shouldUseDarkMode() {
  const now = new Date();
  const hour = now.getHours();
  
  return hour >= 18 || hour < 8;
}

// Typewriter effect function
function typeWriter(element, text, speed = 50) {
  return new Promise((resolve) => {
    element.textContent = '';
    let i = 0;
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        element.classList.add('done');
        resolve();
      }
    }
    
    type();
  });
}

// Landing page animation sequence
async function runLandingAnimation() {
  const h2 = document.querySelector('.landing-text .typewriter[data-text]');
  const paragraphs = document.querySelectorAll('.landing-text p.typewriter[data-text]');
  const fadeElements = document.querySelectorAll('.fade-in-element');
  
  if (!h2) return;
  
  // Get text from data attributes
  const h2Text = h2.dataset.text;
  const p1Text = paragraphs[0]?.dataset.text || '';
  const p2Text = paragraphs[1]?.dataset.text || '';
  
  // Clear initial content
  h2.textContent = '';
  paragraphs.forEach(p => p.textContent = '');
  
  // Type the h2 title
  await typeWriter(h2, h2Text, 60);
  
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Type first paragraph
  if (paragraphs[0]) {
    await typeWriter(paragraphs[0], p1Text, 15);
  }
  
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Type second paragraph
  if (paragraphs[1]) {
    await typeWriter(paragraphs[1], p2Text, 15);
  }
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Fade in the video/image
  fadeElements.forEach(el => {
    el.classList.add('visible');
  });
}

function showProjectDetail(projectId) {
  // Hide projects grid
  document.getElementById('projects-grid').style.display = 'none';
  
  // Hide all project details
  document.querySelectorAll('.project-detail').forEach(detail => {
    detail.classList.remove('active');
  });
  
  // Show selected project detail
  document.getElementById(`project-${projectId}`).classList.add('active');
  
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function showProjectsGrid() {
  // Show projects grid
  document.getElementById('projects-grid').style.display = 'block';
  
  // Hide all project details
  document.querySelectorAll('.project-detail').forEach(detail => {
    detail.classList.remove('active');
  });
  
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function copyEmail() {
  const email = 'cordi.cristiano@gmail.com';
  const copyText = document.getElementById('copy-text');
  
  // Copy to clipboard
  navigator.clipboard.writeText(email).then(function() {
    copyText.textContent = 'Copied to clipboard!';
    copyText.classList.add('copied');
    copyText.classList.add('show');
    
    // Reset after 2 seconds
    setTimeout(function() {
      copyText.textContent = 'Copy to clipboard';
      copyText.classList.remove('copied');
      copyText.classList.remove('show');
    }, 1000);
  }).catch(function(err) {
    console.error('Could not copy text: ', err);
    alert('Email: ' + email);
  });
}

function showCopyText() {
  const copyText = document.getElementById('copy-text');
  if (!copyText.classList.contains('copied')) {
    copyText.classList.add('show');
  }
}

function hideCopyText() {
  const copyText = document.getElementById('copy-text');
  if (!copyText.classList.contains('copied')) {
    copyText.classList.remove('show');
  }
}

// Track if landing animation has run
let landingAnimationRun = false;

// Function to switch tabs based on hash or tab name
function switchToTab(tabName) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  
  // Find and activate the correct tab
  const tabButton = document.querySelector(`[data-tab="${tabName}"]`);
  const tabPanel = document.getElementById(tabName);
  
  if (tabButton && tabPanel) {
    tabButton.classList.add('active');
    tabPanel.classList.add('active');
    
    if (tabName === 'projects') {
      showProjectsGrid();
    }
    
    // Run landing animation when switching to landing tab (only once)
    if (tabName === 'landing' && !landingAnimationRun) {
      landingAnimationRun = true;
      setTimeout(runLandingAnimation, 100);
    }
  }
  
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Function to handle URL hash changes
function handleHashChange() {
  const hash = window.location.hash.slice(1);
  
  if (hash) {
    // Check if it's a project detail
    if (hash.startsWith('project-')) {
      const projectId = hash.replace('project-', '');
      switchToTab('projects');
      setTimeout(() => {
        showProjectDetail(projectId);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 100);
    } else {
      switchToTab(hash);
    }
  } else {
    switchToTab('landing');
  }
  
  // Prevent scroll to hash target
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 0);
}

// Tab switching functionality
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const tabName = btn.dataset.tab;
    switchToTab(tabName);
    
    // Update URL hash without scrolling
    history.pushState(null, null, `#${tabName}`);
  });
});

// Project card click handlers
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    
    const projectId = card.dataset.project;
    showProjectDetail(projectId);
    
    // Update URL hash without scrolling
    history.pushState(null, null, `#project-${projectId}`);
  });
});

// Handle initial page load and hash changes
window.addEventListener('hashchange', handleHashChange);

document.addEventListener('DOMContentLoaded', function() {
  handleHashChange();
  
  const posterImage = document.querySelector('.poster-image');
  if (posterImage) {
    posterImage.addEventListener('click', function() {
      window.open(this.src, '_blank');
    });
  }
});

function toggleMobileNav() {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger');
  
  sidebar.classList.toggle('nav-open');
  hamburger.classList.toggle('active');
}

// Close mobile nav when clicking a tab button
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth <= 1400) {
      sidebar.classList.remove('nav-open');
      hamburger.classList.remove('active');
    }
  });
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger');
  
  if (window.innerWidth <= 1400 && 
      !sidebar.contains(e.target) && 
      sidebar.classList.contains('nav-open')) {
    sidebar.classList.remove('nav-open');
    hamburger.classList.remove('active');
  }
});