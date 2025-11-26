/* ====== Basic UI interactions: menu, lightbox, testimonials, form ====== */

document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', () => {
    const shown = mobileMenu.getAttribute('aria-hidden') === 'false';
    mobileMenu.setAttribute('aria-hidden', String(!shown));
    mobileMenu.style.display = shown ? 'none' : 'block';
  });

  // Smooth anchor behavior for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if (href.length>1){
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile menu on link click
        if (mobileMenu.style.display === 'block') { mobileMenu.style.display = 'none'; mobileMenu.setAttribute('aria-hidden','true'); }
      }
    });
  });

  /* ===== Gallery Lightbox ===== */
  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryGrid?.querySelectorAll('.gallery-item img').forEach(img=>{
    img.addEventListener('click', ()=>{
      lightboxImg.src = img.src;
      lightboxCaption.textContent = img.alt || img.closest('figure')?.querySelector('figcaption')?.textContent || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden','false');
    });
  });

  lightboxClose?.addEventListener('click', ()=> {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    lightboxImg.src = '';
  });

  lightbox?.addEventListener('click', (e)=>{
    if (e.target === lightbox) {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden','true');
      lightboxImg.src = '';
    }
  });

  /* ===== Testimonials slider (simple) ===== */
  let currentTest = 0;
  const tests = document.querySelectorAll('.testimonial');
  const prevBtn = document.getElementById('prevTest');
  const nextBtn = document.getElementById('nextTest');

  function showTest(i){
    tests.forEach((t, idx)=> t.classList.toggle('active', idx===i));
  }
  showTest(currentTest);

  prevBtn?.addEventListener('click', ()=> {
    currentTest = (currentTest - 1 + tests.length) % tests.length;
    showTest(currentTest);
  });
  nextBtn?.addEventListener('click', ()=> {
    currentTest = (currentTest + 1) % tests.length;
    showTest(currentTest);
  });

  // auto-rotate testimonials every 6s
  setInterval(()=> {
    currentTest = (currentTest + 1) % tests.length;
    showTest(currentTest);
  }, 6000);

  /* ===== Booking form (simple front-end demo) ===== */
  const bookingForm = document.getElementById('bookingForm');
  const formMessage = document.getElementById('formMessage');

  bookingForm?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = bookingForm.name.value.trim();
    const phone = bookingForm.phone.value.trim();
    if (!name || !phone) {
      formMessage.textContent = 'Please enter name and phone number.';
      formMessage.style.color = 'crimson';
      return;
    }

    // NOTE: replace with actual AJAX call to server / email endpoint
    formMessage.style.color = 'green';
    formMessage.textContent = 'Thank you! Your enquiry has been sent. We will contact you soon.';
    bookingForm.reset();
  });

});
