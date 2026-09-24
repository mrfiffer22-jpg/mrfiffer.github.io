// Add future project cards to this list; the grid below updates automatically.
const projects = [
    { icon: '</>', category: 'Coding Projects', title: 'Web development', description: 'Websites, JavaScript projects, and future applications built while learning by doing.' },
    { icon: '$', category: 'Finance & Data', title: 'Finance projects', description: 'Personal finance spreadsheets, budgeting tools, data analysis, and business finance projects.' },
    { icon: 'DJ', category: 'Music & DJ', title: 'Music projects', description: 'DJ mixes, music production, beat-making, and audio projects made for the love of sound.' }
];

const projectGrid = document.querySelector('#project-grid');
projectGrid.innerHTML = projects.map((project) => `
    <article class="project-card reveal">
        <div>
            <span class="project-icon" aria-hidden="true">${project.icon}</span>
            <p class="eyebrow">${project.category}</p>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        </div>
        <a class="project-link" href="#contact" aria-label="Ask about ${project.title}">View project <span aria-hidden="true">-></span></a>
    </article>
`).join('');

const html = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const savedTheme = localStorage.getItem('omari-theme');

if (savedTheme) html.dataset.theme = savedTheme;
updateThemeLabel();

themeToggle.addEventListener('click', () => {
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('omari-theme', html.dataset.theme);
    updateThemeLabel();
});

function updateThemeLabel() {
    const lightMode = html.dataset.theme === 'light';
    themeLabel.textContent = lightMode ? 'Dark mode' : 'Light mode';
    themeToggle.setAttribute('aria-label', lightMode ? 'Switch to dark mode' : 'Switch to light mode');
}

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
});
siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelector('#contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.querySelector('#form-status');
    if (!form.checkValidity()) {
        status.textContent = 'Please complete each field before sending.';
        form.reportValidity();
        return;
    }
    status.textContent = 'Thanks. This form is ready to connect to an email service when you choose one.';
    form.reset();
});

document.querySelector('#back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
