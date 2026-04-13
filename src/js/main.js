/* ============================================
   DESIGN BY PIP — Lightbox + Filtering
   ============================================ */

(function () {
  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImage = lightbox.querySelector('.lightbox-image');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const lbCounter = lightbox.querySelector('.lightbox-counter');
  const lbClose = lightbox.querySelector('.lightbox-close');
  const lbPrev = lightbox.querySelector('.lightbox-prev');
  const lbNext = lightbox.querySelector('.lightbox-next');
  const lbBackdrop = lightbox.querySelector('.lightbox-backdrop');

  let galleryImages = [];
  let currentIndex = 0;

  function openLightbox(trigger) {
    const gallery = trigger.dataset.gallery || 'default';
    galleryImages = Array.from(
      document.querySelectorAll(`.lightbox-trigger[data-gallery="${gallery}"]`)
    );
    currentIndex = galleryImages.indexOf(trigger);
    showImage(currentIndex);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    galleryImages = [];
  }

  function showImage(index) {
    if (index < 0 || index >= galleryImages.length) return;
    currentIndex = index;
    const img = galleryImages[currentIndex];
    lbImage.src = img.src;
    lbImage.alt = img.alt || '';
    lbCaption.textContent = img.dataset.caption || '';
    lbCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
    lbPrev.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
    lbNext.style.visibility = currentIndex < galleryImages.length - 1 ? 'visible' : 'hidden';
  }

  function nextImage() {
    if (currentIndex < galleryImages.length - 1) showImage(currentIndex + 1);
  }

  function prevImage() {
    if (currentIndex > 0) showImage(currentIndex - 1);
  }

  // Event listeners
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('.lightbox-trigger');
    if (trigger) {
      e.preventDefault();
      openLightbox(trigger);
    }
  });

  lbClose.addEventListener('click', closeLightbox);
  lbBackdrop.addEventListener('click', closeLightbox);
  lbNext.addEventListener('click', nextImage);
  lbPrev.addEventListener('click', prevImage);

  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // Touch/swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prevImage();
      else nextImage();
    }
  }, { passive: true });

  // --- Tag Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.dataset.filter;

      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      projectCards.forEach(function (card) {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          const tags = (card.dataset.tags || '').split(',');
          card.classList.toggle('hidden', !tags.includes(filter));
        }
      });
    });
  });
})();
