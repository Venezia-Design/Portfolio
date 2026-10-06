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

// Carrusel horizontal de "Work": rueda del mouse + arrastrar
(function () {
  const track = document.getElementById('workTrack');
  if (!track) return;
 
  // 1) Rueda vertical -> scroll horizontal (solo si todavia hay recorrido;
  //    al llegar al inicio o al final, la pagina sigue scrolleando normal)
  track.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const max = track.scrollWidth - track.clientWidth;
    const goingRight = e.deltaY > 0;
    if ((goingRight && track.scrollLeft >= max - 1) ||
        (!goingRight && track.scrollLeft <= 0)) return;
    e.preventDefault();
    track.scrollLeft += e.deltaY;
  }, { passive: false });
 
  // 2) Arrastrar con el mouse
  let down = false, moved = false, startX = 0, startScroll = 0;
 
  track.addEventListener('mousedown', function (e) {
    down = true; moved = false;
    startX = e.pageX; startScroll = track.scrollLeft;
  });
  window.addEventListener('mousemove', function (e) {
    if (!down) return;
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 5) { moved = true; track.classList.add('is-dragging'); }
    if (moved) track.scrollLeft = startScroll - dx;
  });
  window.addEventListener('mouseup', function () {
    down = false;
    track.classList.remove('is-dragging');
  });
 
  // Si arrastraste, no abrir el proyecto al soltar
  track.addEventListener('click', function (e) {
    if (moved) { e.preventDefault(); moved = false; }
  }, true);
})();
 