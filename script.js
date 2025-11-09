var typed=new Typed(".typed-text",{
    strings: ["a Software Developer." , "a Tech Explorer." , "a Creative Storyteller." , "a Volunteer."],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});

window.addEventListener('DOMContentLoaded', () => {
    const heroText = document.querySelector('.hero-text');
    const heroImg = document.querySelector('.hero img');

    heroText.classList.add('slide-in'); 
    heroImg.classList.add('slide-in');  
});

const navLinks = document.querySelectorAll('nav a');

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function scrollSpy() {
  const scrollPos = window.scrollY + 100; 
  const sections = Array.from(navLinks).map(link => 
    document.querySelector(link.getAttribute('href'))
  );


  navLinks.forEach(link => link.classList.remove('active'));


  const activeIndex = sections.findIndex(section => 
    section.offsetTop <= scrollPos && 
    (section.offsetTop + section.offsetHeight) > scrollPos
  );


  if (activeIndex >= 0) {
    navLinks[activeIndex].classList.add('active');
  }


  if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 2)) {
    navLinks.forEach(link => link.classList.remove('active'));
    navLinks[navLinks.length - 1].classList.add('active');
  }
}


window.addEventListener('scroll', debounce(scrollSpy, 100));


window.addEventListener('load', scrollSpy);

window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 0);
});

const observeTimelines = () => {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        const items = entry.target.querySelectorAll('.timeline-item');
        
        const delays = Array.from(items).map((_, index) => index * 100);
        
        items.forEach(item => {
          item.style.willChange = 'opacity, transform';
        });
        
        items.forEach((item, index) => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              item.classList.add('show');
              setTimeout(() => {
                item.style.willChange = 'auto';
              }, 500);
            }, delays[index]);
          });
        });
        
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.2,
    rootMargin: '50px'
  });

  document.querySelectorAll('.timeline').forEach(timeline => {
    timelineObserver.observe(timeline);
  });
};

observeTimelines();

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
    nav.classList.remove('show');
  }
});

nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('show');
  }
});

const scrollUpBtn = document.querySelector('.scroll-up-btn');
if (scrollUpBtn) {
  scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

