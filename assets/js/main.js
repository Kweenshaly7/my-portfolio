/**
 * Main Interactive Application Logic
 * Mary-Queen Uchechukwu Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect & Active Links
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Drawer Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });

    // Close on link click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
      });
    });
  }

  // 2. Projects Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 3. Testimonials Data Manager (Retained & Easily Expandable)
  // When you have more testimonials to add, simply add new objects to this array!
  window.portfolioTestimonials = [
    {
      name: "Emmanuel Ahman",
      role: "CEO & Lead Software Engineer, NYKON",
      image: "assets/img/testimonials/testimonial-1.jpg",
      quote: "I recommend Mary-Queen for any Cloud engineering position at your business. She has led teams and, along with that, brings an energy and dependability that make her crucial to our joint venture. She did an excellent job of staying up to date on software developments and thus finding new solutions. She had the most extensive and diverse knowledge of software at our venture, and others even sought her out for advice. A reliable and highly capable employee, I can’t recommend her highly enough."
    },
    {
      name: "Daniel Ayeni",
      role: "CEO & Senior Software Engineer, AFRIMENT",
      image: "assets/img/testimonials/testimonial-2.jpg",
      quote: "It’s always a pleasure working with Mary-Queen. Her exceptional organisational skills, coupled with a keen eye for detail, ensure every task is handled with precision. Whether managing communications, streamlining administrative processes, or handling DevOps projects. Mary-Queen consistently delivers above expectations. Her adaptability and professionalism are second to none. I strongly recommend her."
    },
    {
      name: "Chioma Obieze",
      role: "Customer / IT Support Specialist",
      image: "assets/img/testimonials/testimonial-3.jpg",
      quote: "I've had the pleasure of working alongside Mary-Queen and have consistently been impressed by her deep passion for technology and innovation. Whether it's the latest tools, frameworks, or industry trends, Mary-Queen is always ahead of the curve and eager to share insights with the team. Her enthusiasm is contagious and often inspires others to explore new approaches and solutions. Beyond just being a tech enthusiast, she is also a fantastic collaborator, always willing to jump in, solve complex problems, and support team members whenever needed. It's rare to find someone who combines technical curiosity with such a positive, team-first attitude. Any team would be lucky to have Mary Queen on board."
    }
  ];

  // Helper method so the user can programmatically add testimonials if desired
  window.addTestimonial = function(testimonial) {
    window.portfolioTestimonials.push(testimonial);
    renderTestimonials();
  };

  function renderTestimonials() {
    const container = document.getElementById('testimonialsGrid');
    // Render dynamically
    container.innerHTML = window.portfolioTestimonials.map(t => `
      <div class="testimonial-card">
        <div class="quote-icon">“</div>
        <p class="testimonial-text">${escapeHtml(t.quote)}</p>
        <div class="testimonial-author">
          <img src="${t.image}" alt="${escapeHtml(t.name)}" class="author-avatar" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=2CFF05&color=080B10'">
          <div class="author-info">
            <h5>${escapeHtml(t.name)}</h5>
            <span>${escapeHtml(t.role)}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Only render if container is currently empty
  const testimonialsContainer = document.getElementById('testimonialsGrid');
  if (testimonialsContainer && testimonialsContainer.children.length === 0) {
    renderTestimonials();
  }

  // 4. Google Appointment Booking Modal
  const bookingModal = document.getElementById('bookingModal');
  const bookBtns = document.querySelectorAll('.open-booking-modal');
  const modalClose = document.getElementById('modalClose');

  bookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (bookingModal) {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalClose && bookingModal) {
    modalClose.addEventListener('click', () => {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 5. Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value || 'Portfolio Inquiry';
      const message = document.getElementById('message').value;

      const mailtoLink = `mailto:maryqueen.cloud@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message)}`;
      
      if (formStatus) {
        formStatus.innerHTML = `<span class="neon-text">Opening your mail client to send directly to Mary-Queen...</span>`;
      }

      window.location.href = mailtoLink;
    });
  }

  // Copy Email to Clipboard helper
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email') || 'maryqueen.cloud@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const origText = btn.innerHTML;
        btn.innerHTML = `<span class="neon-text">Copied to clipboard! ✓</span>`;
        setTimeout(() => {
          btn.innerHTML = origText;
        }, 2200);
      });
    });
  });

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
});
