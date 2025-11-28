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

function showProjectDetail(projectId) {
  // Hide projects grid
  document.getElementById('projects-grid').style.display = 'none';
  
  // Hide all project details
  document.querySelectorAll('.project-detail').forEach(detail => {
    detail.classList.remove('active');
  });
  
  // Show selected project detail
  document.getElementById(`project-${projectId}`).classList.add('active');
}

function showProjectsGrid() {
  // Show projects grid
  document.getElementById('projects-grid').style.display = 'block';
  
  // Hide all project details
  document.querySelectorAll('.project-detail').forEach(detail => {
    detail.classList.remove('active');
  });
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

// Function to switch tabs based on hash or tab name
function switchToTab(tabName) {
  // Remove active class from all buttons and panels
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  
  // Find and activate the correct tab
  const tabButton = document.querySelector(`[data-tab="${tabName}"]`);
  const tabPanel = document.getElementById(tabName);
  
  if (tabButton && tabPanel) {
    tabButton.classList.add('active');
    tabPanel.classList.add('active');
    
    // If switching to projects tab, show the grid view
    if (tabName === 'projects') {
      showProjectsGrid();
    }
  }
}

// Function to handle URL hash changes
function handleHashChange() {
  const hash = window.location.hash.slice(1);
  
  if (hash) {
    // Check if it's a project detail
    if (hash.startsWith('project-')) {
      const projectId = hash.replace('project-', '');
      switchToTab('projects');
      setTimeout(() => showProjectDetail(projectId), 100);
    } else {
      switchToTab(hash);
    }
  } else {
    switchToTab('landing');
  }
}

// Tab switching functionality
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;
    switchToTab(tabName);
    // Update URL hash
    window.location.hash = tabName;
  });
});

// Project card click handlers
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const projectId = card.dataset.project;
    showProjectDetail(projectId);
    // Update URL hash for deep linking
    window.location.hash = `project-${projectId}`;
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

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('nav-open');
      hamburger.classList.remove('active');
    }

  });
});

document.addEventListener('click', (e) => {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger');
  
  if (window.innerWidth <= 768 && 
      !sidebar.contains(e.target) && 
      sidebar.classList.contains('nav-open')) {
    sidebar.classList.remove('nav-open');
    hamburger.classList.remove('active');
  }
});