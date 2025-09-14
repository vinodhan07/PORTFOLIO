// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-links li");

  // Set hero image source dynamically
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navLinksItems.forEach(item => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Typed.js for hero section
  if (document.getElementById('typed-text')) {
    const options = {
      strings: ['Aspiring Software Engineer', 'Computer Science Student', 'Machine Learning Enthusiast', 'Web Developer'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true
      
    };
    
    new Typed('#typed-text', options);
    
  }

  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll('.skill-fill');

  skillBars.forEach(bar => {
    // Store the target width from the inline style
    const targetWidth = bar.style.width;
    // Set initial width to 0 for animation
    bar.style.width = '0';
    // Add transition property
    bar.style.transition = 'width 1s ease';
    // Store the target width in a data attribute for the observer to use
    bar.dataset.targetWidth = targetWidth;
  });

  // Intersection Observer for skill bars
  const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const bar = entry.target;
      if (entry.isIntersecting) {
        // Animate to the target width stored in dataset
        bar.style.width = bar.dataset.targetWidth;
      } else {
        // Reset to 0 when out of view
        bar.style.width = '0';
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => {
    skillBarObserver.observe(bar);
  });
  
  // Removed duplicate observer setup

  const animatedElements = document.querySelectorAll('.project-card, .achievement-card, .team-card, .contact-info-item');
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'; // Fade in effect
        setTimeout(() => {
          entry.target.classList.add('fade-in');
        }, index * 100); // Staggered delay
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    scrollObserver.observe(element);
    element.style.opacity = '0'; // Hide elements initially
  });

  // Add active class to nav links based on scroll position
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  const makeNavActive = () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', makeNavActive);

  // Header scroll effect
  const header = document.querySelector('header');
  const scrollThreshold = 50;
  
  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);

  // Contact form submit with animation
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      // Add loading state
      submitBtn.classList.add('loading');
      
      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        
        // Show success message
        const formElements = contactForm.elements;
        const formData = {};
        
        for (let i = 0; i < formElements.length; i++) {
          if (formElements[i].name) {
            formData[formElements[i].name] = formElements[i].value;
          }
        }
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        alert('Message sent successfully! We will contact you soon.');
        
        console.log('Form submitted with data:', formData);
      }, 2000);
    });
  }
  
  // Add a scroll to top button
  const body = document.querySelector('body');
  const scrollTopBtn = document.createElement('div');
  scrollTopBtn.classList.add('scroll-top');
  scrollTopBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>';
  
  body.appendChild(scrollTopBtn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  // Smooth scroll for internal links
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  // Add a back to top button
  const backToTopBtn = document.createElement('div');
  backToTopBtn.classList.add('back-to-top');
  backToTopBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>';
  body.appendChild(backToTopBtn);
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  // Show back to top button on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

function handleContact() {
  // Scroll or navigate to contact section
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function handlePortfolio() {
  document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
}
  const currentYear = new Date().getFullYear();
  const copyrightText = document.querySelector('.footer-bottom p');
  if (copyrightText) {
    copyrightText.textContent = `© ${currentYear} Vinodhan V A. All rights reserved.`;
  };
  
});
