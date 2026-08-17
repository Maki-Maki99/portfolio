// Tab Navigation
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-section").forEach(s => s.classList.add("hidden"));

    btn.classList.add("active");
    const section = document.getElementById(btn.dataset.tab);
    section.classList.remove("hidden");
    
    // Trigger skill bar animation when About tab is shown
    if(btn.dataset.tab === 'about') {
      setTimeout(animateSkills, 100);
    }
  });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  html.classList.add('dark');
  themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  const isDark = html.classList.contains('dark');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('scroll-progress').style.width = scrolled + '%';
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Number Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 30);
  });
}

// Skill Bar Animation
function animateSkills() {
  const skillFills = document.querySelectorAll('.skill-fill');
  skillFills.forEach(fill => {
    const width = fill.getAttribute('data-width');
    fill.style.width = width + '%';
  });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('counter')) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.5 });

// Observe counters
document.querySelectorAll('.counter').forEach(counter => observer.observe(counter));

// Trigger counter animation on load
setTimeout(animateCounters, 500);

// Trigger skill animation on load (for About section which is visible by default)
setTimeout(animateSkills, 800);

// Copy Email to Clipboard
function copyEmail() {
  const email = 'danomarkanthony30@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    const copyText = document.getElementById('copy-text');
    const copyIcon = document.getElementById('copy-icon-quick');
    
    if(copyText) {
      const originalText = copyText.textContent;
      copyText.textContent = 'Copied!';
      setTimeout(() => copyText.textContent = originalText, 2000);
    }
    
    if(copyIcon) {
      const originalIcon = copyIcon.textContent;
      copyIcon.textContent = '✓';
      setTimeout(() => copyIcon.textContent = originalIcon, 2000);
    }
  });
}

// Track Resume Download
function trackDownload() {
  console.log('Resume downloaded at:', new Date().toISOString());
  // You can add analytics tracking here if needed
}

// Project Modal
const projectData = {
  ebalota: {
    title: 'eBalota - E-Voting System',
    icon: '🗳️',
    category: 'Capstone Project',
    description: 'A comprehensive web-based e-voting system designed for Cavite State University – Indang Campus to conduct secure, transparent, and efficient university elections.',
    features: [
      'Secure voter authentication and authorization',
      'Real-time vote counting and results',
      'Admin dashboard for election management',
      'Vote verification system',
      'Mobile-responsive design'
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Chart.js'],
    duration: '8 months',
    role: 'Full Stack Developer',
    liveLink: 'https://ebalota.freedev.app/',
    challenges: 'Implementing secure voting mechanisms and ensuring data integrity throughout the election process.',
    outcome: 'Successfully deployed for university elections with 500+ active voters.'
  },
  
  bliss: {
    title: 'Bliss Bistro & Social Reservation System',
    icon: '🍽️',
    category: 'Freelance Project',
    description: 'Online reservation management system for a bistro and social restaurant in Sanford, Florida, streamlining booking operations.',
    features: [
      'Real-time table availability',
      'Reservation booking and management',
      'Customer notification system',
      'Admin panel for restaurant staff',
      'Booking history and analytics'
    ],
    tech: ['PHP', 'MySQL', 'Bootstrap', 'jQuery', 'AJAX'],
    duration: '2 weeks',
    role: 'Freelance Website Developer',
    liveLink: 'https://bliss-sanford.com/',
    challenges: 'Managing real-time table availability and handling concurrent bookings without conflicts.',
    outcome: 'Deployed successfully and actively used by the restaurant with positive client feedback.'
  },
  gpl: {
    title: 'GPL Trading OPC Payroll System',
    icon: '💰',
    category: 'Internship Project',
    description: 'An automated payroll system developed to streamline employee payroll processing, salary computation, attendance tracking, and payroll report generation.',
    features: [
      'Employee management system',
      'Automated salary computation',
      'Attendance tracking integration',
      'Payroll report generation',
      'Tax and deduction calculations'
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    duration: '2 months',
    role: 'Payroll System Developer & Technical Support Intern',
    liveLink: 'https://gpl-payroll-system.page.gd/',
    challenges: 'Implementing accurate salary computation with complex deductions and tax calculations.',
    outcome: 'Successfully deployed and used by the company for efficient payroll processing.'
  }
};

function openProjectModal(projectId) {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const project = projectData[projectId];

  if (!project) return;

  modalTitle.textContent = project.title;
  modalBody.innerHTML = `
    <div class="space-y-6">
      <div class="flex items-start gap-4">
        <div class="text-4xl">${project.icon}</div>
        <div>
          <div class="text-xs text-[color:var(--muted)] bg-[color:var(--panel)] inline-block px-3 py-1 rounded-full mb-2">
            ${project.category}
          </div>
          <p class="text-[color:var(--muted)]">${project.description}</p>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4 text-sm">
        <div class="rounded-2xl bg-[color:var(--panel)] p-4">
          <div class="font-semibold mb-1">Duration</div>
          <div class="text-[color:var(--muted)]">${project.duration}</div>
        </div>
        <div class="rounded-2xl bg-[color:var(--panel)] p-4">
          <div class="font-semibold mb-1">Role</div>
          <div class="text-[color:var(--muted)]">${project.role}</div>
        </div>
      </div>

      <div>
        <div class="font-semibold mb-3">✨ Key Features</div>
        <ul class="space-y-2">
          ${project.features.map(feature => `
            <li class="flex gap-2 text-sm text-[color:var(--muted)]">
              <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--primary)] flex-shrink-0"></span>
              <span>${feature}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div>
        <div class="font-semibold mb-3">🛠️ Tech Stack</div>
        <div class="flex flex-wrap gap-2">
          ${project.tech.map(tech => `
            <span class="px-3 py-1 rounded-full text-xs bg-[color:var(--panel)] border border-black/5 dark:border-white/5">
              ${tech}
            </span>
          `).join('')}
        </div>
      </div>

      ${project.liveLink ? `
      <a href="${project.liveLink}" target="_blank" 
         class="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-sm
         bg-[color:var(--primary)] text-white hover:opacity-90 transition w-full justify-center">
        🔗 View Live Project
      </a>
      ` : ''}

      <div class="rounded-2xl bg-[color:var(--panel)] p-4">
        <div class="font-semibold mb-2">💡 Challenges & Solutions</div>
        <p class="text-sm text-[color:var(--muted)]">${project.challenges}</p>
      </div>

      <div class="rounded-2xl bg-[color:var(--primary)] bg-opacity-10 border border-[color:var(--primary)] border-opacity-30 p-4">
        <div class="font-semibold mb-2 text-[color:var(--primary)]">🎯 Outcome</div>
        <p class="text-sm">${project.outcome}</p>
      </div>
    </div>
  `;

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Close modal on outside click
document.getElementById('project-modal').addEventListener('click', (e) => {
  if (e.target.id === 'project-modal') {
    closeProjectModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

// Project Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active', 'bg-[color:var(--primary)]', 'text-white');
      b.classList.add('bg-white/60', 'dark:bg-slate-800/60');
    });
    btn.classList.add('active', 'bg-[color:var(--primary)]', 'text-white');
    btn.classList.remove('bg-white/60', 'dark:bg-slate-800/60');
    
    // Filter projects
    document.querySelectorAll('.project-card').forEach(card => {
      const categories = card.getAttribute('data-category');
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Print optimization
window.addEventListener('beforeprint', () => {
  document.querySelectorAll('.tab-section').forEach(section => {
    section.classList.remove('hidden');
  });
});

window.addEventListener('afterprint', () => {
  document.querySelectorAll('.tab-section:not(#about)').forEach(section => {
    section.classList.add('hidden');
  });
});

console.log('Portfolio loaded successfully! 🚀');
