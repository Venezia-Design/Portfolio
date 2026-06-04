// Animacion fade-in al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
 
document.querySelectorAll('.fade-in-left, .fade-in-right, .work-link').forEach(el => {
  observer.observe(el);
});