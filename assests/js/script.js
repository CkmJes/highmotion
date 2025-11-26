// footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');
    menuBtn.addEventListener('click', () => {
      const open = mobileNav.style.display === 'block';
      mobileNav.style.display = open ? 'none' : 'block';
    });

    // smooth scroll for internal anchors
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        const href = a.getAttribute('href');
        if (href.length>1) {
          e.preventDefault();
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
          // close mobile nav
          if (mobileNav.style.display === 'block') mobileNav.style.display = 'none';
        }
      });
    });

    // gallery lightbox
    const galleryImgs = document.querySelectorAll('.gallery-item img');
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg');
    const lbClose = document.getElementById('lbClose');

    galleryImgs.forEach(img=>{
      img.addEventListener('click', ()=>{
        lbImg.src = img.src;
        lb.classList.add('show');
        lb.setAttribute('aria-hidden','false');
      });
    });
    lbClose.addEventListener('click', ()=>{ lb.classList.remove('show'); lb.setAttribute('aria-hidden','true'); lbImg.src='';});
    lb.addEventListener('click', (e)=>{ if (e.target===lb) { lb.classList.remove('show'); lbImg.src=''; lb.setAttribute('aria-hidden','true'); }});

    // simple testimonials rotation
    const tests = document.querySelectorAll('.testi');
    let tIndex = 0;
    setInterval(()=>{
      if (tests.length<=1) return;
      tests.forEach((t,i)=>t.classList.toggle('active', i===tIndex));
      tIndex = (tIndex + 1) % tests.length;
    }, 6000);

    // booking form stub
    const booking = document.getElementById('booking');
    const resp = document.getElementById('formResp');
    booking.addEventListener('submit', (e)=>{
      e.preventDefault();
      // validate simple
      const name = booking.name.value.trim();
      const phone = booking.phone.value.trim();
      if(!name || !phone){ alert('Please enter name and phone'); return; }
      resp.style.display = 'block';
      booking.reset();
    });

    // Pause video on small devices (reduce bandwidth)
    const vid = document.querySelector('.bg-video');
    function adjustVideo() {
      if (window.innerWidth < 700) {
        vid.pause();
      } else {
        vid.play().catch(()=>{/* autoplay restricted */});
      }
    }
    window.addEventListener('load', adjustVideo);
    window.addEventListener('resize', adjustVideo);

