/**
 * Main JavaScript for Umesh Air Portfolio
 * Handles navigation, animations, and role cycling
 */

// Register Service Worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('Service worker registered'))
      .catch(err => console.log('Service worker registration failed:', err));
  });
}

// Initialize WOW.js animations
new WOW().init();

// Mobile navigation toggle
$('.hamburger-button').click(function() {
  $(this).toggleClass('close');
  $('.nav').toggleClass('opened');
});

// Role cycling configuration
const roles = [
  { icon: 'fas fa-helicopter', text: 'Drone Engineer' },
  { icon: 'fas fa-microchip', text: 'UAV Developer' },
  { icon: 'fas fa-code', text: 'Software Engineer' },
  { icon: 'fas fa-lightbulb', text: 'Tech Innovator' },
  { icon: 'fas fa-heartbeat', text: 'Healthcare Tech Pioneer' },
  { icon: 'fas fa-mountain', text: 'Nepal Tech Enthusiast' }
];

let roleIndex = 0;

/**
 * Animates text with a pulse effect
 * @param {Object} role - The role object containing icon and text
 * @param {Function} callback - Function to call after animation
 */
function pulseText(role, callback) {
  const $roles = $('#roles');
  const $icon = $('#role-icon');
  const $text = $('#role-text');

  // Set the new content
  $icon.removeClass().addClass(role.icon);
  $text.text(role.text);

  // Animate in
  $roles.css({ opacity: 0, transform: 'scale(0.8)' });
  $roles.animate({ opacity: 1 }, 500, 'swing', function() {
    // Hold for 2 seconds, then animate out
    setTimeout(function() {
      $roles.animate({ opacity: 0 }, 500, 'swing', callback);
    }, 2000);
  });
}

/**
 * Cycles through roles with animation
 */
function updateRole() {
  pulseText(roles[roleIndex], function() {
    roleIndex = (roleIndex + 1) % roles.length;
    updateRole();
  });
}

// Start role cycling
updateRole();

// Smooth scrolling for navigation links
$('.scroll-link').on('click', function(event) {
  event.preventDefault();

  // Toggle mobile nav on click
  $('.nav-list').toggleClass('closed');

  // Smooth scroll to target section
  const target = $(this.hash);
  if (target.length) {
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 750);
  }
});

// ScrollSpy - highlight active navigation item
$(window).on('scroll', function() {
  const scrollPos = $(document).scrollTop();

  $('.nav-link').each(function() {
    const target = $(this.hash);

    if (target.length) {
      const targetTop = target.offset().top - 50;
      const targetBottom = targetTop + target.outerHeight();

      if (scrollPos >= targetTop && scrollPos < targetBottom) {
        $('.nav-item').removeClass('active');
        $(this).closest('.nav-item').addClass('active');
      }
    }
  });
});

// Throttle scroll events for better performance
let scrollTimeout;
$(window).on('scroll', function() {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(function() {
      scrollTimeout = null;
    }, 100);
  }
});
