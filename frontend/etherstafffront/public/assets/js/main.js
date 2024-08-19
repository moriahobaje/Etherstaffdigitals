
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    
    // Check if the device is desktop based on screen width
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
  
    // Apply scroll behavior only on desktop
    if (isDesktop) {
      if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
      window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    } else {
      // Remove 'scrolled' class on mobile/tablet
      selectBody.classList.remove('scrolled');
    }
  }
  
  // Initial call to toggleScrolled when the page loads
  window.addEventListener('load', toggleScrolled);
  
  // Add scroll event listener conditionally based on device type
  const isDesktop = window.matchMedia('(min-width: 768px)').matches;
  if (isDesktop) {
    document.addEventListener('scroll', toggleScrolled);
  }
  

  /**
   * Mobile nav toggle
   */
  // const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  // function mobileNavToogle() {
  //   document.querySelector('body').classList.toggle('mobile-nav-active');
  //   mobileNavToggleBtn.classList.toggle('bi-list');
  //   mobileNavToggleBtn.classList.toggle('bi-x');
  // }
  // mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  document.addEventListener('DOMContentLoaded', function() {
    // This function will run when the DOM is fully loaded

    // Find the mobileNavToggleBtn element
    // const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    // Check if mobileNavToggleBtn exists before adding an event listener
    // if (mobileNavToggleBtn) {
    //     mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
    // } else {
    //     console.error('mobileNavToggleBtn not found in the document.');
    // }

    // Define your mobileNavToggle function
    // function mobileNavToggle() {
    //     // Add your logic for toggling the mobile navigation here
    //     console.log('Mobile navigation toggle button clicked!');
    // }
});

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.swiper').forEach(function(swiper) {
      let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiper, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

})();