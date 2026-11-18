// MOBILE NAVIGATION

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation' : 'Open navigation'
    );
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}


// ACTIVE NAVIGATION LINK

const pageSections = document.querySelectorAll('main section[id]');

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;

          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${currentId}`
            );
          });
        }
      });
    },
    {
      rootMargin: '-30% 0px -60% 0px'
    }
  );

  pageSections.forEach(section => sectionObserver.observe(section));
}


// PROJECT DETAIL PANELS

const projectButtons = document.querySelectorAll('[data-open-project]');
const projectPanels = document.querySelectorAll('.project-detail');
const closeProjectButtons = document.querySelectorAll('.close-project');

function openProject(projectName) {
  const panel = document.getElementById(`${projectName}-project`);

  if (!panel) return;

  projectPanels.forEach(item => {
    item.classList.remove('open');
    item.setAttribute('aria-hidden', 'true');
  });

  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');

  document.body.classList.add('modal-open');
  panel.scrollTop = 0;
}

function closeProjects() {
  projectPanels.forEach(panel => {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  });

  document.body.classList.remove('modal-open');
}

projectButtons.forEach(button => {
  button.addEventListener('click', () => {
    openProject(button.dataset.openProject);
  });
});

closeProjectButtons.forEach(button => {
  button.addEventListener('click', closeProjects);
});


// IMAGE LIGHTBOX

const lightbox = document.getElementById('image-lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

function openLightbox(image) {
  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';

  if (!document.querySelector('.project-detail.open')) {
    document.body.classList.remove('modal-open');
  }
}

document.querySelectorAll('.zoomable-image').forEach(image => {
  image.addEventListener('click', () => openLightbox(image));
});

lightboxClose?.addEventListener('click', closeLightbox);

lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});


// KEYBOARD CONTROLS

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeLightbox();
    closeProjects();
  }
});


// AUTOMATIC FOOTER YEAR

const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}