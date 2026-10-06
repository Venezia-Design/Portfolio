// Escala dinámica según posición en el carrusel horizontal + drag con mouse
document.addEventListener('DOMContentLoaded', () => {
  const workScroll = document.querySelector('.work-scroll');
  if (!workScroll) return;

  const items = workScroll.querySelectorAll('.work-item');
  const MIN_SCALE = 1;
  const MAX_SCALE = 1.45;

  function updateScale() {
    const containerRect = workScroll.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const distance = Math.abs(itemCenter - containerCenter);
      const maxDistance = containerRect.width / 2;
      const ratio = Math.min(distance / maxDistance, 1);
      const scale = MAX_SCALE - (MAX_SCALE - MIN_SCALE) * ratio;
      item.style.transform = `scale(${scale.toFixed(3)})`;
    });
  }

  workScroll.addEventListener('scroll', () => {
    requestAnimationFrame(updateScale);
  });

  window.addEventListener('resize', updateScale);
  window.addEventListener('load', updateScale);
  updateScale();

  // Drag con mouse
  let isDown = false;
  let startX;
  let scrollLeft;

  workScroll.addEventListener('mousedown', (e) => {
    isDown = true;
    workScroll.style.cursor = 'grabbing';
    startX = e.pageX - workScroll.offsetLeft;
    scrollLeft = workScroll.scrollLeft;
  });

  workScroll.addEventListener('mouseleave', () => {
    isDown = false;
    workScroll.style.cursor = 'grab';
  });

  workScroll.addEventListener('mouseup', () => {
    isDown = false;
    workScroll.style.cursor = 'grab';
  });

  workScroll.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - workScroll.offsetLeft;
    const walk = (x - startX) * 1.5;
    workScroll.scrollLeft = scrollLeft - walk;
    requestAnimationFrame(updateScale);
  });
});
