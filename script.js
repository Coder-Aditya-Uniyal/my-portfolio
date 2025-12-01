/* Theme manager: auto-detects system preference and supports toggle with persistence */
(function(){
  const root = document.documentElement;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = localStorage.getItem('theme'); // 'dark'|'light' or null
  function applyTheme(theme){
    if(theme === 'dark'){
      root.classList.add('dark');
      document.getElementById('themeToggle').textContent = '☀️';
    } else {
      root.classList.remove('dark');
      document.getElementById('themeToggle').textContent = '🌙';
    }
  }
  // initial
  if(stored === 'dark' || (stored === null && prefersDark)){
    applyTheme('dark');
  } else {
    applyTheme('light');
  }
  // toggle
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      const next = isDark ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  });
})();

/* Projects data - empty for now; user can populate */
const PROJECTS = [];

function renderProjects(){
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  if(PROJECTS.length === 0){
    const empty = document.createElement('div');
    empty.className = 'project-card';
    empty.innerHTML = '<h4>No projects yet</h4><p class="muted">Add screenshots to /public/assets/projects and populate PROJECTS in script.js</p>';
    grid.appendChild(empty);
    return;
  }
  PROJECTS.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `<h4>${p.title}</h4><p>${p.short}</p><div style="margin-top:10px"><small>${p.tech.join(' · ')}</small></div>`;
    grid.appendChild(card);
  });
}

/* Contact form: uses mailto fallback */
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !email || !message){
      status.textContent = 'Please fill all fields.';
      return;
    }
    const subject = encodeURIComponent('Portfolio inquiry from ' + name);
    const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>');
    window.location.href = `mailto:raftar@example.com?subject=${subject}&body=${body}`;
    status.textContent = 'Opening mail client...';
  });
});
